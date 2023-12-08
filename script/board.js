let currentDraggedElement;


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
        let user = contacts[j].name;
        let color = contacts[j].color;
        contactsImg.innerHTML += /*html*/ ` 
    <div class="profile-picture horicontal-and-vertical" style="background-color:${color} ">${user}</div>`;
    }
}


async function generateTaskHTML(element, i) {
    console.log(element);
    // draggable="true" ondragstart="startDragging(${element['id']})"

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


// function startDragging(id) {
//     console.log("Dragging element with ID:", id);
//     let index = tasks.findIndex(task => task.id == id);
//     currentDraggedElement = index;
// }


async function openTask(i) {
    let index = tasks.findIndex(task => task.id == i);
    renderTaskdetailHTML(index)
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
                    <div>
                        <div  class="margin-bottom10 task-detail-font-color ">
                            <span>Assigned To:</span>
                            <div id="AssignedTo" class="d-flex"></div>
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
                            <div id="progressBarContainer" style="width: 100%; background-color: #ddd;">
                                <div id="progressBar" class="progress-bar"></div>     
                            </div>
                            <div id="progressStatus" class="d-flex"></div>
                       </div>
                    </div> 
                </div>         
            </div>
            <div class="task-detail-bottom">
                <img onclick="deleteTask(${i})" src="img/subTaskDelete.svg" alt="">
                <img src="img/PenAddTask 1=edit.svg" alt="">
            </div>
        </div>
        
    `;


    await renderSubtasks(i)
    await loadContacts(tasks[i], i, "AssignedTo");
}


async function renderSubtasks(i) {
    for (let j = 0; j < tasks[i]['subtasks'].length; j++) {
        const taskDetailSubtasks = document.getElementById('task-detail-subtasks');
        const element = tasks[i]['subtasks'][j];
        console.log(element);
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'meineCheckbox';
        checkbox.id = 'checkbox-' + j; // eindeutige ID für jede Checkbox
        checkbox.classList.add('meineCheckbox');
        if (element.status) {
            checkbox.checked = true;
        }
        label.appendChild(checkbox);

        const div = document.createElement('div');
        div.textContent = element.name;
        label.appendChild(div);
        taskDetailSubtasks.appendChild(label);

    }
    loadprogressbar();
}

function loadprogressbar() {
    const checkboxes = document.querySelectorAll('.meineCheckbox');
    const totalCheckboxes = checkboxes.length;
    const checkedCount = document.querySelectorAll('.meineCheckbox:checked').length;
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = (checkedCount / totalCheckboxes) * 100;
    progressBar.style.width = progressPercentage + '%';
    let progressStatus = document.getElementById('progressStatus');
    // const checkboxes = document.querySelectorAll('.meineCheckbox');
    // const progressBar = document.getElementById('progressBar');
    // const totalCheckboxes = checkboxes.length;
    progressStatus.innerHTML = /*html*/ `
    <div>${totalCheckboxes}</div>
    <div>/</div>
    <div>${checkedCount}</div>
`
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedCount = document.querySelectorAll('.meineCheckbox:checked').length;
            const progressPercentage = (checkedCount / totalCheckboxes) * 100;
            progressBar.style.width = progressPercentage + '%';
            progressStatus.innerHTML = /*html*/ `
            <div>${totalCheckboxes}</div>
            <div>/</div>
            <div>${checkedCount}</div>
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


function loadAddTaskProgress() {
    addTasksStatus = 'inProgress';
    addTask()
}

function loadAddTaskdone() {
    addTasksStatus = 'done';
    addTask()
}

function loadAddTaskToDo() {
    addTasksStatus = 'toDo';
    addTask()
}

function loadAddTaskAwaitFeedback() {
    addTasksStatus = 'awaitingFeedback';
    addTask()
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
    // clearPokemonContainer();
    for (let i = 0; i < tasks.length; i++) {
        let statusName = tasks[i].status;
        let text = tasks[i].text;
        let title = tasks[i].title;
        document.getElementById(statusName).innerHTML = '';
        if (text.toLowerCase().includes(searchInput) || title.toLowerCase().includes(searchInput)) {
            const element = tasks[i];
            document.getElementById(statusName).innerHTML += await generateTaskHTML(element, element['id']);
            await loadLittleProgressbar(element['id'])
            await loadPrioImg(element['priority'], element['id'])
            await loadContacts(element, element['id'], `task-users${element['id']}`);

        }
    }
}