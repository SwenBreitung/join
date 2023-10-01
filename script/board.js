let currentDraggedElement;


async function initBoard() {
    includeHTML();
    await loadTasks();
    updateBoardHTML();
}

/**
 * This function is used to clear all values of the tasks array
 * 
 */
async function clearArray() {
    tasks.splice(0, tasks.length);
    currentId = ""
    await setItem('tasks', JSON.stringify(tasks));
    await setItem('currentId', JSON.stringify(currentId));
}


/* ---------------------------------------------------------------------------------------------------------------------------------------------- */


/**
 * This function filters the tasks array for title and description  
 * @returns new arrays for every element of the content who matches with the value of the searchInput 
 */
function searchTasks() {
    document.getElementById('contentposition').classList.add('d-none');
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    console.log("searching")
    return tasks.filter(task =>
        task.title.toLowerCase().includes(searchValue) ||
        task.description.toLowerCase().includes(searchValue)
    );
}

/**
 * This function displays the results of the search
 * 
 */
function renderSearchResults() {
    document.getElementById('searchLogo').classList.add('d-none');
    document.getElementById('searchClose').classList.remove('d-none')
    // x d-none weg lupe d-none hin x onclick = reset function to normal board view
    let results = searchTasks();
    console.log(results)
    let resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    results.forEach(task => {
        resultsContainer.innerHTML += generateTaskHTML(task)
    })
}

function clearInput() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
    document.getElementById('searchLogo').classList.remove('d-none');
    document.getElementById('searchClose').classList.add('d-none')
    document.getElementById('contentposition').classList.remove('d-none');
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

/**
 * 
 * @param {string} status 
 */
async function moveTo(status) {
    tasks[currentDraggedElement]['status'] = status;
    await setItem('tasks', JSON.stringify(tasks));
    updateBoardHTML();
    removeHighlight(status);
}


function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


/* ---------------------------------------------------------------------------------------------------------------------------------------------- */


function updateBoardHTML() {

    let todo = tasks.filter(t => t['status'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';
    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];
        document.getElementById('toDo').innerHTML += generateTaskHTML(element);
        // searchUsers(element);
    }

    let inProgress = tasks.filter(t => t['status'] == 'in-progress');
    document.getElementById('in-progress').innerHTML = '';
    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('in-progress').innerHTML += generateTaskHTML(element);
        // searchUsers(element);
    }

    let awaitingFeedback = tasks.filter(t => t['status'] == 'awaiting-feedback');
    document.getElementById('awaiting-feedback').innerHTML = '';
    for (let index = 0; index < awaitingFeedback.length; index++) {
        const element = awaitingFeedback[index];
        document.getElementById('awaiting-feedback').innerHTML += generateTaskHTML(element);
        // searchUsers(element);
    }

    let done = tasks.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';
    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateTaskHTML(element);
        // searchUsers(element);
    }
}


function generateTaskHTML(element) {
    console.log(element);
    let i = element['id']
    let users = element['contactAbbreviation']
    let colors = element['contactColor']
    let assignedUser = '';
    for (let j = 0; j < users.length; j++) {
        let user = users[j];
        let color = colors[j]
        assignedUser += /*html*/ ` 
       <div class="profile-picture horicontal-and-vertical" style="background-color:${color} ">${user}</div>`;
    }

    return /*html*/ `<div draggable="true" ondragstart="startDragging(${element['id']})" onclick="openTask(${i})" class="task">
            <div>
                <div class="task-category"> ${element['category']}</div>
                <div class="task-title">${element['title']}</div>
                <div class="task-description"> ${element['description']}</div>
            </div>
            <div class="task-users-prio">
                <div class="task-users">
                   ${assignedUser}
                </div>
                <img src="${element['priority']}">
            </div>
        </div>
    `;
}


function startDragging(id) {
    console.log("Dragging element with ID:", id);
    let index = tasks.findIndex(task => task.id === id);
    currentDraggedElement = index;
}


async function openTask(i) {
    let index = tasks.findIndex(task => task.id === i);
    renderTaskdetailHTML(index)
}


function renderTaskdetailHTML(i) {

    console.log('tasks in open Task', tasks[i])

    let userNames = tasks[i]['contactName'];
    let users = tasks[i]['contactAbbreviation'];
    let colors = tasks[i]['contactColor'];
    let assignedUser = '';
    for (let j = 0; j < users.length; j++) {
        let user = users[j];
        let userName = userNames[j]
        let color = colors[j]
        assignedUser += /*html*/ ` 
        <div class="user-details">
            <div class="profile-picture horicontal-and-vertical" style="background-color:${color}">
                ${user}
            </div>
            <div class="user-name">
                ${userName}
            </div>   
        </div>
        `;
    }

    let inProgress = '';
    let subtasksProgress = tasks[i]['subtasksInProgress'];
    let subtaskHeadline = '';

    for (let k = 0; k < subtasksProgress.length; k++) {
        let subtaskProgress = subtasksProgress[k];

        subtaskHeadline = /*html*/ `
        <div class="task-detail-font-color margin-bottom10">
            Subtasks
        </div>`

        inProgress += /*html*/ ` 
        <div class="task-detail-flex margin-bottom10">
            <img onclick="switchSubtaskStatusToFinished(${i}, ${k})" class="task-box" src="img/addTaskBox.svg" alt="">
            ${subtaskProgress}
        </div>
        `;
    }

    let finished = '';
    let subtasksDone = tasks[i]['subtasksFinish']

    for (let l = 0; l < subtasksDone.length; l++) {
        let subtaskDone = subtasksDone[l];

        // let subtaskHeadline ='';
        subtaskHeadline = /*html*/ `
        <div class="task-detail-font-color margin-bottom10 text-decoration-none">
            Subtasks
        </div>`

        finished += /*html*/ ` 
       <div class="task-detail-flex margin-bottom10 text-line-through">
           <img onclick="switchSubtaskStatusToUndone(${i},${l})" class="task-box" src="img/done.svg" alt="">
           ${subtaskDone}
       </div>`
    }

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
                        ${tasks[i]['description']}
                    </div>
                    <div class="task-detail-flex">
                        <div class="task-detail-font-color">Due date:</div>
                        <div> ${tasks[i]['dueDate']}</div>
                    </div>
                    <div class="task-detail-flex">
                        <div class="task-detail-font-color">Priority:</div>
                        <div>
                            <img src="${tasks[i]['priority']}">
                        </div>
                    </div>
                    <div>
                        <div class="margin-bottom10 task-detail-font-color">Assigned To:</div>
                        <div class="task-detail-users">
                            
                        ${assignedUser}

                        </div>
                    </div>
                    <div class="task-detail-subtasks">
                        
                        ${subtaskHeadline}
                        ${inProgress}
                        ${finished}

                    </div>
                </div>
            </div>
            <div class="task-detail-bottom">
                <img onclick="deleteTask(${i})" src="img/subTaskDelete.svg" alt="">
                <img src="img/PenAddTask 1=edit.svg" alt="">
            </div>
        </div>
    `;
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




// Textfeld aus dem JSON-Objekt extrahieren
// let text = data.text.trim();

// Leerzeichen finden und den ersten Buchstaben sowie den Buchstaben danach extrahieren
//     let index = text.indexOf(' ');
//     if (index !== -1 && index < text.length - 1) {
//         let firstLetter = text.charAt(0).toUpperCase();
//         let letterAfterSpace = text.charAt(index + 1).toUpperCase();

//         console.log(firstLetter + letterAfterSpace);
//         return (firstLetter, letterAfterSpace)
//     } else {
//         console.log('Kein Leerzeichen gefunden oder kein Buchstabe danach.');
//     }
// }