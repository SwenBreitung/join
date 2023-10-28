let currentDraggedElement;


async function init() {
    await loadTasksFromBackend();
    includeHTML();
    loadTasks();
}

async function clearArray() {
    tasks.splice(0, tasks.length);
    currentId = ""
    await setItem('tasks', JSON.stringify(tasks));
    await setItem('currentId', JSON.stringify(currentId));
}

function loadTasks() {
    updateBoardHTML('toDo');
    updateBoardHTML('in-progress');
    updateBoardHTML('awaiting-feedback');
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


function allowDrop(ev) {
    ev.preventDefault();
}


// want to move the todo with the id which is saved in currentDragElement 
// and change the status
async function moveTo(status) {
    tasks[currentDraggedElement]['status'] = status;
    await setItem('tasks', JSON.stringify(tasks));
    loadTasks();
    // updateBoardHTML();
    // loadTasks();
    // loadPrioImg(element['priority'], element['id'])
    removeHighlight(status);
}


function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
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
            await loadPrioImg(element['priority'], element['id'])
            await loadContacts(element, element['id']);
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


async function loadContacts(element, i) {

    let contactsImg = document.getElementById(`task-users${i}`);
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


    return /*html*/ `
        <div draggable="true" ondragstart="startDragging(${element['id']})" onclick="openTask(${i})" class="task">
            <div>
                <div class="task-category"> ${element['category']}</div>
                <div class="task-title">${element['title']}</div>
                <div class="task-description"> ${element['text']}</div>
            </div>
            
            
            <div >
                <div class="d-flex align-items-center">
                <div id="prio-img${i}"></div>
                  <div class="task-users-prio" id="task-users${i}"></div>
                  
                </div> 
        </div>
    `;
}


function startDragging(id) {
    console.log("Dragging element with ID:", id);
    let index = tasks.findIndex(task => task.id == id);
    currentDraggedElement = index;
}


async function openTask(i) {
    let index = tasks.findIndex(task => task.id == i);
    renderTaskdetailHTML(index)
}


function renderTaskdetailHTML(i) {
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
                        <div class="margin-bottom10 task-detail-font-color">Assigned To:</div>
                        <div class="task-detail-users">
                            
                        <!-- ${assignedUser} -->

                        </div>
                    </div>
                    <div class="task-detail-subtasks">
                        
                
                    </div>
                </div>
            </div>
            <div class="task-detail-bottom">
                <img onclick="deleteTask(${i})" src="img/subTaskDelete.svg" alt="">
                <img src="img/PenAddTask 1=edit.svg" alt="">
            </div>
        </div>
    `;

    // <!-- ${subtaskHeadline}
    // ${inProgress}
    // ${finished} -->

}


async function switchSubtaskStatusToFinished(i, k) {
    let splicedSubtask = tasks[i]['subtasksInProgress'].splice(k, 1)
    tasks[i]['subtasksFinish'].push(splicedSubtask)
    await setItem('tasks', JSON.stringify(tasks));
    renderTaskdetailHTML(i);
}


async function switchSubtaskStatusToUndone(i, l) {
    let splicedSubtask = tasks[i]['subtasksFinish'].splice(l, 1)
    tasks[i]['subtasksInProgress'].push(splicedSubtask)
    await setItem('tasks', JSON.stringify(tasks));
    renderTaskdetailHTML(i);
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