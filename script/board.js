let currentDraggedElement;
let currentIndex;
let task;


/**
 * Initializes the application by loading data from the backend,
 * local storage, HTML templates, tasks, and setting up event listeners.
 */
async function init() {
    await loadAllDataFromBackend();
    console.log(task)
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


document.addEventListener('DOMContentLoaded', initializeSearch);
document.getElementById('searchInput').addEventListener("focus", changeDivColor);
document.getElementById('searchInput').addEventListener("blur", revertDivColor);


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
        generateAllPictureTaskdetail(task, "AssignedTo", true)
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
    await setItem('tasks', tasks);
    // await setItem('tasks', JSON.stringify(tasks));
    closeWindow('popup-container');
    resetId(tasks)
    loadTasks();
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


/**
 * Generates and displays profile pictures (or details) for all contacts associated with a task.
 * This function takes a task element and generates HTML for the contacts associated with it.
 * It uses the `generateAllProfile` function to create the HTML based on the contacts array
 * within the task element. The generated HTML is then inserted into the specified DOM element.
 *
 * @param {Object} element - The task element containing contacts information.
 * @param {string} id - The ID of the DOM element where the contacts HTML will be displayed.
 * @param {boolean} [includeFullName=false] - Flag to determine if full names should be included in the display.
 */
function generateAllPictureTaskdetail(element, id, includeFullName = false) {
    const contactsImg = document.getElementById(id);
    const contacts = element['contacts'];
    let contactsHTML;
    contactsHTML = generateAllProfile(contacts, includeFullName)
    contactsImg.innerHTML = contactsHTML;
}


/**
 * Generates a string of HTML representing the profiles of given contacts.
 * This function maps over an array of contacts, generating HTML for each contact's profile
 * using the `generatePofilePicture` function. It then concatenates these HTML strings into a single string.
 * The inclusion of the full name in the profile can be toggled with the 'includeFullName' parameter.
 *
 * @param {Object[]} contacts - An array of contact objects for which profiles need to be generated.
 * @param {boolean} includeFullName - Determines whether the full name should be included in each profile.
 * @returns {string} A string of concatenated HTML representing the profiles of the contacts.
 */
function generateAllProfile(contacts, includeFullName) {
    return contacts.map(contact => {
        return generatePofilePicture(contact, includeFullName);
    }).join('');
}


/**
 * Generates HTML for a contact's profile picture and optionally their full name.
 * This function creates HTML for a contact's profile, displaying their initials on a colored background.
 * If 'includeFullName' is true, the contact's full name is also included in the HTML.
 * The initials and the background color are extracted from the contact object.
 *
 * @param {Object} contact - The contact object containing the name and color information.
 * @param {boolean} includeFullName - Flag to determine if the contact's full name should be included in the HTML.
 * @returns {string} HTML string representing the contact's profile picture and optionally their full name.
 */
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


/**
 * Adds change event listeners to all checkboxes with a specific class.
 * This function iterates over all elements with the class 'meineCheckbox' and attaches an event listener to each.
 * The event listener responds to changes in the checkbox state. When a checkbox state changes, it extracts the 
 * subtask ID from the checkbox's ID, checks if the checkbox is checked, and then calls functions to update the subtask status 
 * and progress bars based on this new state.
 *
 * @param {number} i - The index or identifier related to the specific task to which these checkboxes belong.
 */
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


/**
 * Updates the status of a specific subtask within a task.
 * This function locates a task by its ID in a global 'tasks' array. If the task and the specified subtask are found,
 * it updates the 'status' property of the subtask based on the 'isChecked' parameter.
 *
 * @param {number} taskId - The unique identifier for the task.
 * @param {number} subtaskId - The index of the subtask within the task's 'subtasks' array.
 * @param {boolean} isChecked - The new status to be set for the subtask (true or false).
 */
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
    container.innerHTML = '';

    for (let element of tasksWithStatus) {
        container.innerHTML += await generateTaskHTML(element, element['id']);
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
 * Toggles the user interface elements for adding a new task. It sets a flag to false and updates the heading
 * of the task addition section. The function name suggests it's intended to 'load' and 'toggle' the add task UI.
 */
function laodAddTasksTorgel() {
    saveAddTaskTorgle = false;
    let heading = document.getElementById('header-add-task')
    heading.innerHTML = /*html*/ `Add Task`
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


/**
 * Updates the status of a specific subtask within a task.
 * This function locates a task by its ID in a global 'tasks' array. If the task and the specified subtask are found,
 * it updates the 'status' property of the subtask based on the 'isChecked' parameter.
 *
 * @param {number} taskId - The unique identifier for the task.
 * @param {number} subtaskId - The index of the subtask within the task's 'subtasks' array.
 * @param {boolean} isChecked - The new status to be set for the subtask (true or false).
 */
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', boardSearch);
    }
}