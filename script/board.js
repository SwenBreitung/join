let currentDraggedElement;
let editArryIndex;
let currentIndex
async function init() {
    await loadAllDataFromBackend();
    await loadUserDataFromLocalStorage();
    await includeHTML();
    await loadTasks();
    await initializeDraggable();
    renderContacts();
    await loadHeadImg()
    highlightCurrentPageInHeader('board-sidebar');
}

async function clearArray() {
    tasks.splice(0, tasks.length);
    currentId = ""
    updateBoardHTML
    await setItem('tasks', JSON.stringify(tasks));
    await setItem('currentId', JSON.stringify(currentId));
}

async function loadTasks() {
    updateBoardHTML('toDo');
    updateBoardHTML('inProgress');
    updateBoardHTML('awaitingFeedback');
    updateBoardHTML('done');
}

/* ---------------------------------------------------------------------------------------------------------------------------------------------- */


//listens for focus on textbox
document.getElementById('searchInput').addEventListener("focus", changeDivColor);
//this is fired when the textbox is focused
function changeDivColor() {
    document.getElementById('fake-searchbar').style.borderColor = "#29ABE2";
}

//listens for blur on textbox
document.getElementById('searchInput').addEventListener("blur", revertDivColor);

//this is fired when the textbox is no longer focused
function revertDivColor() {
    document.getElementById('fake-searchbar').style.borderColor = "#A8A8A8";
}




/* ---------------------------------------------------------------------------------------------------------------------------------------------- */


async function updateBoardHTML(statusName) {

    let task = tasks.filter(t => t['status'] == statusName);
    if (task.length > 0) {
        document.getElementById(statusName).innerHTML = '';
        for (let index = 0; index < task.length; index++) {
            // document.getElementById(statusName).classList.remove('dont-taks');
            const element = task[index];
            document.getElementById(statusName).innerHTML += await generateTaskHTML(element, element['id']);
            await loadLittleProgressbar(element['id'])
            await loadPrioImg(element['priority'], element['id'])
            await loadContacts(element, element['id'], `task-users${element['id']}`);
        }
    } else {
        // document.getElementById(statusName).classList.add('dont-taks');
        document.getElementById(statusName).innerHTML = `<div class="dont-taks">No Task ${statusName}</div>`;
    }

}


async function loadPrioImg(prio, i) {
    if (prio == 'urgent') {
        document.getElementById(`prio-img${i}`).innerHTML = /*html*/ `
        <img src="img/prioUrgent.svg" alt="">
        `

    } else if (prio == 'medium') {
        document.getElementById(`prio-img${i}`).innerHTML = /*html*/ `
            <img src="img/prioMedium.svg" alt="">
            `
    } else if (prio == 'low') {
        document.getElementById(`prio-img${i}`).innerHTML = /*html*/ `
        <img src="./img/prioLow.svg" alt="">
     `
    }
}


async function loadContacts(element, i, id) {

    let contactsImg = document.getElementById(id);
    let contacts = element['contacts']
        // let colors = element['contactColor']
    console.log(`task-users${i}`);
    // contactsImg.innerHTML = '';
    for (let j = 0; j < contacts.length; j++) {
        let user = extractInitials(contacts[j].name);
        let color = contacts[j].color;
        contactsImg.innerHTML += /*html*/ ` 
    <div class="profile-picture horicontal-and-vertical" style="background-color:${color} ">${user}</div>`;
    }
}


async function generateTaskHTML(element, i) {
    console.log(element);
    return /*html*/ `
        <div  onclick="openTask(${i})" id="${i}" class="task draggable">
            <div>
                <div class="task-category"> ${element['category']}</div>
                <div class="task-title">${element['title']}</div>
                <div class="task-description"> ${element['text']}</div>
            </div>
            <!-- <div id="progressBarContainer" style="width: 100%; background-color: #ddd;">
                <div id="progressBar${i}" class="progress-bar" style="width: 0%; height: 20px; "></div>
                <div id="progressStatus${i}"></div>
            </div > -->
            <div id="task-detail-subtasks" >  
                        <div class="d-flex">
                            <div id="progressBarContainer" style="width: 100%; background-color: #ddd;    border-radius: 10px;">
                                <div id="progressBar${i}" class="progress-bar"></div>     
                            </div>
                            <div id="progressStatus${i}" class="d-flex"></div>
                       </div>
                    </div> 

                <div class="d-flex align-items-center">
                <div id="prio-img${i}"></div>
                  <div class="task-users-prio" id="task-users${i}"></div>
                </div> 
        </div>
    `;
}


async function openTask(i) {

    let index = tasks.findIndex(task => task.id == i);
    currentIndex = index;
    await renderTaskdetailHTML(index);
}


async function renderTaskdetailHTML(i) {
    console.log('tasks in open Task', tasks[i])
    let userNames = tasks[i]['contactName'];
    let users = tasks[i]['contactAbbreviation'];
    let colors = tasks[i]['contactColor'];
    let assignedUser = '';

    document.getElementById('popup-container').classList.remove('d-none');
    document.getElementById('popup-container').innerHTML = /*html*/ `
    <div class="task-detail">
            <div class="task-detail-content-container">
                <div class="task-detail-top">
                    <div class="task-detail-category"> ${tasks[i]['category']}</div>
                    <img onclick="closeTask()" src="img/close.svg" alt="close">
                </div>
                <div class="task-detail-content">
                    <div class="task-detail-title">
                        <h1>${tasks[i]['title']}</h1>
                    </div>
                    <div class="task-description">
                        ${tasks[i]['text']}
                    </div>
                    <div class="task-detail-flex">
                        <div class="task-detail-font-color">Due date:</div>
                        <div> ${tasks[i]['date']}</div>
                    </div>
                    <div class="task-detail-flex">
                        <div class="task-detail-font-color">Priority:</div>
                        <div >
                        <div> ${tasks[i]['priority']}</div>
                        </div>
                    </div>
                    <div class="width-100P">
                        <div  class="margin-bottom10 task-detail-font-color width-100P">
                            <span>Assigned To:</span>
                            <div id="AssignedTo" class="width-100P"></div>
                        </div>

                        <div class="task-detail-users">       
                        <!-- ${assignedUser} -->    
                        </div>
                    </div>
                    <div>
                        <span>Subtasks</span>
                        <div id="subtask-checking">
                        </div>
                    </div>
                    <div id="task-detail-subtasks">  
                        <div class="d-flex">
                            <div id="progressBarContainer" style="width: 100%; background-color: #ddd; border-radius: 10px;";>
                                <div id="progressBar" class="progress-bar"></div>     
                            </div>
                            <div id="progressStatus" class="d-flex"></div>
                       </div>
                    </div> 
                </div>         
            </div>
            <div class="task-detail-bottom ">
                <div onclick="deleteTask(${i})" class="d-flex cursor-pointer">
                     <img  src="img/subTaskDelete.svg" alt="">
                    <span>Delete</span>
                </div>

            <div onclick="editTask(${i})" class="d-flex cursor-pointer"> 
                 <img  src="img/PenAddTask 1=edit.svg" alt="">
                <span>Edit</span>      
            </div>     
            </div>
        </div>   
    `;


    await renderSubtasks(i)
    await loadContactsInfoTamplate(tasks[i], i, "AssignedTo")
}
async function loadContactsInfoTamplate(element, i, id) {

    let contactsImg = document.getElementById(id);
    let contacts = element['contacts']
    console.log(`task-users${i}`);
    for (let j = 0; j < contacts.length; j++) {
        let userInitals = extractInitials(contacts[j].name);
        let user = contacts[j].name;
        let color = contacts[j].color;
        contactsImg.innerHTML += /*html*/ ` 
        <div class="contact-container">
            <div class="profile-picture horicontal-and-vertical" style="background-color:${color} ">${userInitals}</div>
            <div>${user}</div>
        </div>
    `;
    }
}


async function renderSubtasks(i) {
    const taskDetailSubtasks = document.getElementById('task-detail-subtasks');
    let subtasksHTML = '';

    for (let j = 0; j < tasks[i]['subtasks'].length; j++) {
        const element = tasks[i]['subtasks'][j];
        const checkedAttribute = element.status ? 'checked' : '';

        subtasksHTML += /*html*/ `

            <label style="display: flex;width: 50px;gap: 10px;">
                <input type="checkbox" name="meineCheckbox" id="checkbox-${j}" class="meineCheckbox" ${checkedAttribute}>
                <div>${element.name}</div>
            </label>
        `;
    }

    taskDetailSubtasks.innerHTML += subtasksHTML;
    loadprogressbar();
}


function loadprogressbar() {
    const checkboxes = document.querySelectorAll('.meineCheckbox');
    const totalCheckboxes = checkboxes.length;
    const checkedCount = document.querySelectorAll('.meineCheckbox:checked').length;
    const progressBarContainer = document.getElementById('progressBarContainer');
    const progressPercentage = (checkedCount / totalCheckboxes) * 100;
    progressBarContainer.innerHTML = `      
                <div id="progressBar" class="progress-bar" style="width:${progressPercentage}%;"></div>      
        `;

    progressStatus.innerHTML += /*html*/ `
    <div>${totalCheckboxes}</div>
    <div>/</div>
    <div>${checkedCount}</div>
`
    checkboxes.forEach(checkbox => {
        let progressBar = document.getElementById('progressBar');
        let progressStatusTask = document.getElementById(`progressStatus${currentIndex}`);
        const progressBarTask = document.getElementById(`progressBar${currentIndex}`);

        checkbox.addEventListener('change', function() {
            const checkedCount = document.querySelectorAll('.meineCheckbox:checked').length;
            const progressPercentage = (checkedCount / totalCheckboxes) * 100;
            progressBar.style.width = progressPercentage + '%';
            progressBarTask.style.width = progressPercentage + '%';

            progressStatus.innerHTML = /*html*/ `
                <div>${checkedCount}</div>
                <div>/</div>
                <div>${totalCheckboxes}</div>
            `
            progressStatusTask.innerHTML = /*html*/ `
              <div>${checkedCount}</div>
              <div>/</div>
              <div>${totalCheckboxes}</div>
          `
        });
    });

}

async function loadLittleProgressbar(i) {
    let progressStatus = document.getElementById(`progressStatus${i}`);
    let totalCheckboxes = tasks[i]['subtasks'].length;
    let counter = 0;

    tasks[i]['subtasks'].forEach(subtask => {
        if (subtask.status === true) {
            counter++;
        }
    });

    const progressPercentage = (counter / totalCheckboxes) * 100;
    const progressBar = document.getElementById(`progressBar${i}`); // Stellen Sie sicher, dass Sie das richtige Element ansteuern
    progressBar.style.width = progressPercentage + '%';
    progressBar.style.height = '100%';
    progressStatus.innerHTML = /*html*/ `
    <div>${counter}</div>
    <div>/</div>
    <div>${totalCheckboxes}</div>
`
}



function closeTask() {
    document.getElementById('popup-container').classList.add('d-none');
}


async function deleteTask(i) {
    tasks.splice(i, 1);
    await setItem('tasks', JSON.stringify(tasks));
    closeTask();
    window.location.reload();
}

async function editTask(i) {
    document.getElementById('popup-container').classList.add('d-none');
    editArryIndex = i
    saveAddTaskTorgle = true;

    let contacts = tasks[i].contacts;
    let priority = tasks[i].priority;
    let subtasks = tasks[i].subtasks;

    const elementsData = {
        'addDescription': tasks[i].text,
        'categorySection': tasks[i].category,
        'datepicker': tasks[i].date,
        'addTitel': tasks[i].title,

    };


    for (const [elementId, value] of Object.entries(elementsData)) {
        const element = document.getElementById(elementId);
        if (element) {
            element.value = value;
        }
    }

    document.getElementById('add-task-arrow').classList.remove('d-none')

    if (priority == "urgent") {
        priButtonActivated('prioUrgentIcon', 1)
    } else if (priority == "medium") {
        priButtonActivated('prioMediumIcon', 2)
    } else if (priority == "low") {
        priButtonActivated('prioLowIcon', 3)
    }

    let subtasksElement = document.getElementById('subtasks-addet');
    document.getElementById('subtasks-addet').textContent = "";
    subtaskArry = subtasks
    loadSubTask();

    let editContainer = document.getElementById('add-task')

    editContainer.classList.remove('d-none')
    let heading = document.getElementById('header-add-task')

    heading.innerHTML = /*html*/ `Edit Add Task`

}

function closeEditDialog() {
    let editContainer = document.getElementById('edit-container')
    saveAddTaskTorgle = false;
    editContainer.classList.add('d-none')
}

function loadAddTaskProgress() {
    addTasksStatus = 'inProgress';
    laodAddTasksTorgel()
    addTask()
}

function loadAddTaskdone() {
    addTasksStatus = 'done';
    laodAddTasksTorgel()
    addTask()
}

function loadAddTaskToDo() {
    addTasksStatus = 'toDo';
    laodAddTasksTorgel()
    addTask()
}

function loadAddTaskAwaitFeedback() {
    addTasksStatus = 'awaitingFeedback';
    laodAddTasksTorgel()
    addTask()
}

function laodAddTasksTorgel() {
    saveAddTaskTorgle = false;
    let heading = document.getElementById('header-add-task')
    heading.innerHTML = /*html*/ `
   Add Task
    `
}

function addTask() {
    document.getElementById('add-task').classList.remove('d-none');
    document.getElementById('add-task-arrow').classList.remove('d-none')
}

function closeAddTask() {
    if (!event.target.closest('#dialog')) {
        document.getElementById('add-task').classList.add('d-none');
    }
}


//--- searchbar----

async function boardSearch() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
    let statusToFind = ['awaitingFeedback', "inProgress", "done", "toDo"];

    for (let y = 0; y < statusToFind.length; y++) {
        let statusTasks = tasks.filter(task => task.status === statusToFind[y]);
        document.getElementById(statusToFind[y]).innerHTML = '';
        let statusContainer = document.getElementById(statusToFind[y]);
        if (statusTasks == 0) {
            statusContainer.innerHTML = `<div class="dont-taks">No Task ${statusToFind[y]}</div>`;
        }
        for (let i = 0; i < statusTasks.length; i++) {
            let task = statusTasks[i];
            let text = task.text.toLowerCase();
            let title = task.title.toLowerCase();


            if (text.includes(searchInput) || title.includes(searchInput)) {
                document.getElementById(task.status).innerHTML += await generateTaskHTML(task, task['id']);
                await loadLittleProgressbar(task['id']);
                await loadPrioImg(task['priority'], task['id']);
                await loadContacts(task, task['id'], `task-users${task['id']}`);
            } else {
                statusContainer.innerHTML = `<div class="dont-taks">No Task ${statusToFind[y]}</div>`;
            }

        }
    }
}