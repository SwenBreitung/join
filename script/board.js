let currentDraggedElement;
let currentIndex;
let task;
/**
 * Initializes the application by loading data from the backend,
 * local storage, HTML templates, tasks, and setting up event listeners.
 */
async function init() {
    await loadAllDataFromBackend();
    await loadUserDataFromLocalStorage();
    await includeHTML();
    await loadTasks();
    await initializeDraggable();
    renderContacts(contacts);
    await loadHeadImg()
    highlightCurrentPageInHeader('board-sidebar');
    initializeDatePicker();
    initializeSearch();
}


/**
 * Loads tasks from the backend asynchronously and updates the task list
 * for each status (toDo, inProgress, awaitingFeedback, done).
 */
async function loadTasks() {
    updateBoardHTML('toDo');
    updateBoardHTML('inProgress');
    updateBoardHTML('awaitingFeedback');
    updateBoardHTML('done');
}


/**
 * Opens the task detail for the specified task ID.
 *
 * @param {number} i The ID of the task to be opened.
 */
async function openTask(i) {
    let index = tasks.findIndex(task => task.id == i);
    currentIndex = index;
    await renderTaskdetailHTML(index);
}


/**
 * Asynchronously renders the task detail HTML and the corresponding subtasks and
 * assigned contacts for the specified task ID.
 *
 * @param {number} i The ID of the task to be rendered.
 */
async function renderTaskdetailHTML(i) {
    const task = tasks[i];
    const popupContainer = document.getElementById('popup-container');
    popupContainer.classList.remove('d-none');
    popupContainer.innerHTML = renderTaskTemplate(task, i)
    await Promise.all([
        renderSubtasks(i, 'task-detail-subtasks'),
        generateAllPictureTaskdetail(task, i, "AssignedTo", true)
    ]);
}


/**
 * Deletes the task with the specified index from the `tasks` array,
 * updates the local storage, closes the task detail popup,
 * resets task IDs, and reloads the task list.
 *
 * @param {number} i The index of the task to be deleted.
 */
async function deleteTask(i) {
    tasks.splice(i, 1);
    await setItem('tasks', JSON.stringify(tasks));
    closeWindow('popup-container');
    resetId(tasks)
    loadTasks();
}


/**
 * Opens the task detail popup and prepares it for editing the task with
 * the specified index. It fills the form fields with the task's data,
 * sets the focus to the description field, disables the save button,
 * resets the priority select, activates the task's priority,
 * resets the subtasks container, loads the existing subtasks,
 * and updates the header to "Edit Add Task".
 *
 * @param {number} i The index of the task to be edited.
 */
async function editTask(i) {
    closeWindow('popup-container')
    saveAddTaskTorgle = true;
    subtasks = tasks[i].subtasks;
    task = tasks[i];
    const elementsData = {
        'addDescription': task.description,
        'categoryInputV1': task.category,
        'datepicker': task.date,
        'addTitel': task.title,
    };
    fillFormFields(elementsData);
    openDialog('add-task')
    openDialog('add-task-arrow')
    resetPriority()
    activatePriorityForTask(tasks[i].priority)
    resetContainer('subtasks-addet');
    // loadContactsEdit(tasks[i].contacts);
    loadSubtaskEdit();
    checkContactsForTaskObjects(tasks[i].contacts);
    document.getElementById('cancel-btn').classList.add('d-none');
    document.getElementById('header-add-task').innerHTML = /*html*/ `Edit Task`
    document.getElementById('add-task-btn').innerHTML = /*html*/ `Save Task`
}


function loadContactsEdit(contacts) {

}

function loadSubtaskEdit() {
    let newsubTaskHTML = '';
    subtasks.forEach(function(subtask, index) {
        newsubTaskHTML += loadSubTaskTemplate(subtask.name, index, subtask.status);
    });
    document.getElementById('subtasks-addet').innerHTML = newsubTaskHTML;

}
/**
 * Activates the specified priority icon and its corresponding level in the
 * task detail popup based on the task's priority.
 *
 * @param {string} priority The priority of the task to be activated.
 */
function activatePriorityForTask(priority) {
    const priorityMappings = {
        "urgent": { icon: 'prioUrgentIcon', level: 1 },
        "medium": { icon: 'prioMediumIcon', level: 2 },
        "low": { icon: 'prioLowIcon', level: 3 }
    };

    const prioritySetting = priorityMappings[priority];
    if (prioritySetting) {
        activatePriority(prioritySetting.icon, prioritySetting.level);
    }
}


/**
 * Changes the border color of the specified element with the ID 'fake-searchbar'
 * to the color #29ABE2.
 */
function changeDivColor() {
    document.getElementById('fake-searchbar').style.borderColor = "#29ABE2";
}


/**
 * Reverts the border color of the element with the ID 'fake-searchbar'
 * back to its original color #A8A8A8.
 */
function revertDivColor() {
    document.getElementById('fake-searchbar').style.borderColor = "#A8A8A8";
}


/**
 * Fills the form fields with the provided data object.
 *
 * @param {Object} elementsData The data object containing element IDs and their corresponding values.
 */
function fillFormFields(elementsData) {
    for (const [elementId, value] of Object.entries(elementsData)) {
        const element = document.getElementById(elementId);
        if (element) {
            element.value = value;
        }
    }
}


/**
 * Loads and displays a priority image based on the given priority level.
 * @param {string} prio - The priority level of the image. Accepted values: 'urgent', 'medium', 'low'.
 * @param {number} i - An index used to identify the HTML element where the image will be displayed.
 */
async function loadPrioImg(prio, i) {
    const prioImages = {
        'urgent': "./img/prioUrgent.svg",
        'medium': "./img/prioMedium.svg",
        'low': "./img/prioLow.svg"
    };

    const imgSrc = prioImages[prio];
    if (imgSrc) {
        document.getElementById(`prio-img${i}`).innerHTML = `<img src="${imgSrc}" alt="">`;
    }
}


/**
 * Loads and displays contact information in a specified HTML element.
 * @param {Object} element - An object containing contact details.
 * @param {number} i - An index, not used in the current implementation, but could be used for future enhancements.
 * @param {string} id - The ID of the HTML element where the contact information will be displayed.
 * @param {boolean} [includeFullName=false] - A flag to determine whether to include the full name of the contact. Defaults to false.
 */
async function loadContacts(element, i, id, includeFullName = false) {
    const contactsImg = document.getElementById(id);
    const contacts = element['contacts'];

    let contactsHTML;
    if (contacts.length > 4) {
        contactsHTML = contacts.slice(0, 4).map(contact => {
            return generatePofilePicture(contact, includeFullName);
        }).join('');
        contactsHTML += `<div class="contact-container">
                            <div class="profile-picture horicontal-and-vertical" style="background-color:red">
                                <span>+${contacts.length - 4}</span>
                            </div>
                        </div>`;
    } else {
        contactsHTML = generateAllProfile(contacts, includeFullName);
    }
    contactsImg.innerHTML = contactsHTML;
}

function generateAllPictureTaskdetail(element, i, id, includeFullName = false) {
    const contactsImg = document.getElementById(id);
    const contacts = element['contacts'];
    let contactsHTML;
    contactsHTML = generateAllProfile(contacts, includeFullName)
    contactsImg.innerHTML = contactsHTML;
}

function generateAllProfile(contacts, includeFullName) {
    return contacts.map(contact => {
        return generatePofilePicture(contact, includeFullName);
    }).join('');
}

function generatePofilePicture(contact, includeFullName) {
    const userInitials = extractInitials(contact.name);
    const color = contact.color;
    let contactHTML = `<div class="profile-picture horicontal-and-vertical" style="background-color:${color}">${userInitials}</div>`;
    if (includeFullName) {
        contactHTML += `<div>${contact.name}</div>`;
    }
    return `<div class="contact-container">${contactHTML}</div>`;
}

/**
 * Renders subtasks for a specific task in an HTML element.
 * @param {number} i - The index of the task in the 'tasks' array. It identifies which task's subtasks are to be rendered.
 */
async function renderSubtasks(i, containerID) {
    const taskDetailSubtasks = document.getElementById(containerID);
    let subtasksHTML = '';

    for (let j = 0; j < tasks[i]['subtasks'].length; j++) {
        const element = tasks[i]['subtasks'][j];
        const checkedAttribute = element.status ? 'checked' : '';

        subtasksHTML += /*html*/ `
            <label style="display: flex;width: 100%;gap: 10px;">
                <input type="checkbox" name="meineCheckbox" id="checkbox-${j}" class="meineCheckbox" ${checkedAttribute}>
                <div>${element.name}</div>
            </label>
        `;
    }

    taskDetailSubtasks.innerHTML += subtasksHTML;
    addCheckboxListeners(i);
    updateProgressBar();
}

function addCheckboxListeners(i) {
    const checkboxes = document.querySelectorAll('.meineCheckbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const subtaskIdString = event.target.id.split('-')[1];
            const subtaskId = parseInt(subtaskIdString, 10);
            const isChecked = event.target.checked;
            updateSubtaskStatus(i, subtaskId, isChecked);
            updateGeneralProgressBar();
            updateSpecificTaskProgressBar(i);
        });
    });
}

function updateSubtaskStatus(taskId, subtaskId, isChecked) {
    const task = tasks.find(task => task.id === taskId);
    if (task && task.subtasks && task.subtasks[subtaskId]) {
        task.subtasks[subtaskId].status = isChecked;
    }
}

/**
 * Updates the progress bar. If a specific task ID is provided, it updates the progress bar for that task.
 * Otherwise, it updates a general progress bar.
 * @param {number|string} [taskId=undefined] - The ID of the task for which the progress bar needs to be updated.
 * If not provided, a general progress bar update is performed.
 */
async function updateProgressBar(taskId) {

    if (taskId !== undefined) {
        await updateSpecificTaskProgressBar(taskId);
    } else {
        updateGeneralProgressBar();
    }
}


/**
 * Updates the progress bar for a specific task based on the completion status of its subtasks.
 * @param {number|string} taskId - The ID of the task for which the progress bar needs to be updated.
 */
async function updateSpecificTaskProgressBar(taskId) {
    const progressStatus = document.getElementById(`progressStatus${taskId}`);
    const totalCheckboxes = tasks[taskId]['subtasks'].length;
    const checkedCount = tasks[taskId]['subtasks'].filter(subtask => subtask.status).length;
    const progressPercentage = (checkedCount / totalCheckboxes) * 100;
    const progressBar = document.getElementById(`progressBar${taskId}`);
    if (totalCheckboxes == 0) {

        return;
    }
    if (progressBar && progressStatus) {
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.style.height = '100%';
        progressStatus.innerHTML = `<div>${checkedCount}</div><div>/</div><div>${totalCheckboxes}</div>`;
    }
}


/**
 * Updates a general progress bar based on the status of all tasks represented by checkboxes in the document.
 * This function calculates the overall progress by counting all checkboxes and those that are checked,
 * and then updates the progress bar and status display accordingly.
 */
function updateGeneralProgressBar() {
    const checkboxes = document.querySelectorAll('.meineCheckbox');
    const totalCheckboxes = checkboxes.length;
    const checkedCount = document.querySelectorAll('.meineCheckbox:checked').length;
    const progressBarContainer = document.getElementById('progressBarContainer');
    const progressPercentage = (checkedCount / totalCheckboxes) * 100;
    if (totalCheckboxes == 0) {
        document.getElementById('subtaskText').classList.add('d-none');
        return;
    }
    if (progressBarContainer) {
        progressBarContainer.innerHTML = `<div id="progressBar" class="progress-bar" style="width:${progressPercentage}%;"></div>`;
    }
    const progressStatus = document.getElementById('progressStatus');
    if (progressStatus) {
        progressStatus.innerHTML = `<div>${checkedCount}</div><div>/</div><div>${totalCheckboxes}</div>`;
    }
}


/**
 * Updates the HTML of a board with tasks that match a given status. 
 * It filters tasks based on the status, clears the container, and then populates it with task HTML.
 * Additionally, it updates the progress bar, loads priority images, and loads contact information for each task.
 * @param {string} statusName - The name of the status used to filter tasks.
 */
async function updateBoardHTML(statusName) {
    let tasksWithStatus = tasks.filter(t => t['status'] === statusName);
    const container = document.getElementById(statusName);
    container.innerHTML = ''; // Zuerst das Container-Element leeren

    for (let element of tasksWithStatus) {
        container.innerHTML += await generateTaskHTML(element, element['id']); // HTML direkt ins DOM einfügen

        await Promise.all([
            updateProgressBar(element['id']),
            loadPrioImg(element['priority'], element['id']),
            loadContacts(element, element['id'], `task-users${element['id']}`)
        ]);
    }
    if (tasksWithStatus.length === 0) {
        container.innerHTML = `<div class="dont-taks">No Task ${statusName}</div>`;
    }
}


/**
 * Prepares the addition of a new task by setting the task's status and triggering functions related to task addition.
 * @param {string} status - The status to be assigned to the new task.
 */
function loadAddTask(status) {
    addTasksStatus = status;
    laodAddTasksTorgel();
    addTask();
}


/**
 * Toggles the user interface elements for adding a new task. It sets a flag to false and updates the heading
 * of the task addition section. The function name suggests it's intended to 'load' and 'toggle' the add task UI.
 */
function laodAddTasksTorgel() {
    saveAddTaskTorgle = false;
    let heading = document.getElementById('header-add-task')
    heading.innerHTML = /*html*/ `
   Add Task
    `
}


/**
 * Displays the elements related to adding a new task in the user interface. 
 * It removes the 'd-none' class from these elements, which is commonly used to hide elements via CSS.
 */
function addTask() {
    document.getElementById('add-task').classList.remove('d-none');
    document.getElementById('add-task-arrow').classList.remove('d-none')
}



//--- searchbar----

/**
 * Filters and displays tasks based on a search input across different task statuses.
 * It searches through tasks' descriptions and titles, updating each status container with relevant tasks.
 */
async function boardSearch() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
    let statusToFind = ['awaitingFeedback', "inProgress", "done", "toDo"];

    statusToFind.forEach(async(status) => {
        let statusTasks = tasks.filter(task => task.status === status &&
            (task.description.toLowerCase().includes(searchInput) || task.title.toLowerCase().includes(searchInput)));

        let statusContainer = document.getElementById(status);
        statusContainer.innerHTML = statusTasks.length > 0 ? '' : `<div class="dont-taks">No Task ${status}</div>`;

        for (let task of statusTasks) {
            statusContainer.innerHTML += await generateTaskHTML(task, task['id']);
            await updateProgressBar(task['id']);
            await loadPrioImg(task['priority'], task['id']);
            await loadContacts(task, task['id'], `task-users${task['id']}`);
        }
    });
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', boardSearch);
    }
}


async function checkContactsForTaskObjects(taskObjects) {
    await renderContacts(contacts);
    resetAllCheckboxes()
    contactsTask = [];
    document.getElementById('add-contacts-add-tasks').innerHTML = "";
    let taskContactsNames = [];
    taskObjects.forEach(contact => {
        taskContactsNames.push(contact.name);
    });

    taskContactsNames.forEach(contactName => {
        contacts.forEach(contact => {
            if (contact.name === contactName) {
                let checkbox = document.querySelector(`#contactCheckbox_${contact.id}`);

                if (checkbox) {
                    checkbox.click();
                } else {
                    // Hier könnten Sie Fehlermeldungen ausgeben oder weitere Maßnahmen ergreifen
                    console.error(`Checkbox mit der ID contactCheckbox_${contact.id} nicht gefunden.`);
                }

            }
        });
    });
}


document.addEventListener('DOMContentLoaded', initializeSearch);


//listens for focus on textbox
document.getElementById('searchInput').addEventListener("focus", changeDivColor);

//listens for blur on textbox
document.getElementById('searchInput').addEventListener("blur", revertDivColor);