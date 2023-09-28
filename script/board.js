function init() {
    includeHTML();
}

// wenn subtaskfinish = abgehakt img
// wenn subtaskprogress = offen img



// let progressPercent = subtasksFinish.length / subtasksInProgress.length;
// percent = Math.round(percent * 100);



let currentDraggedElement;

async function clearArray() {
    tasks.splice(0, tasks.length);
    currentId = ""
    await setItem('tasks', JSON.stringify(tasks));
    await setItem('currentId', JSON.stringify(currentId));
}


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

function startDragging(id) {
    currentDraggedElement = id;
}





function generateTaskHTML(element) {
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


function allowDrop(ev) {
    ev.preventDefault();
}

// want to move the todo with the id which is saved in currentDragElement 
// and change the status
function moveTo(status) {
    tasks[currentDraggedElement]['status'] = status;
    setItem('tasks', JSON.stringify(tasks));
    updateBoardHTML();
    removeHighlight(status);
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

/* --------------------------------------- */




async function openTask(i) {
    renderTaskdetailHTML(i)
}



function renderTaskdetailHTML(i) {

    console.log('tasks in open Task', tasks[i])

    let userNames = tasks[i]['contactName']
    let users = tasks[i]['contactAbbreviation']
    let colors = tasks[i]['contactColor']
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
    let subtasksInProgress = tasks[i]['subtasksInProgress'];
    let subtaskHeadline ='';


    for (let k = 0; k < subtasksInProgress.length; k++) {
        let subtaskInProgress = subtasksInProgress[k];

        subtaskHeadline = /*html*/ `
        <div class="task-detail-font-color margin-bottom10">
            Subtasks
        </div>`
        inProgress += /*html*/ ` 
        <div class="task-detail-flex margin-bottom10">
            <img class="task-box" src="img/addTaskBox.svg" alt="">
            ${subtaskInProgress}
        </div>
        `;
    }

    // let subtasksFinished = tasks[i]['subtasksFinish']
    // for (let l = 0; l < subtasksFinished.length; l++) {
    //     let subtaskFinished = subtasksFinished[l];

    //     console.log(subtaskFinished.length)
    //     // assignedUser += /*html*/ ` 
    //     //  <img src="img/done.svg" alt="">
    //     // `;
    // }

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

                    </div>
                </div>
            </div>
            <div class="task-detail-bottom">
                <img src="img/subTaskDelete.svg" alt="">
                <img src="img/PenAddTask 1=edit.svg" alt="">
            </div>
        </div>

    `;
}



function closeTask() {
    document.getElementById('popup-container').classList.add('d-none');
}

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




// async function includeHTML() {
//     let includeElements = document.querySelectorAll('[w3-include-html]');
//     for (let i = 0; i < includeElements.length; i++) {
//         const element = includeElements[i];
//         file = element.getAttribute("w3-include-html"); // "includes/header.html"
//         let resp = await fetch(file);
//         if (resp.ok) {
//             element.innerHTML = await resp.text();
//         } else {
//             element.innerHTML = 'Page not found';
//         }
//     }

// }

//drag and drop END=============================================================================

//loop for User IMG------------------------------------------------------------------------

// function loadUserImgLoop() {
//     for (let i = 0; i <= 3; i++) {
//         loadUserImg(i);
//     }
// }

//img from card-user-img--------------------------------------------------
// function loadUserImg(i) {
//     let initials;
//     if (i <= 2) {
//         initials = generateInitials()
//         document.getElementById('card-user-img[i]').innerHTML = `${initials[0]} ${initials[1]}`
//     } else if (Array.length == 3) {
//         initials = generateInitials()
//         document.getElementById('card-user-img[i]').innerHTML = `${initials[0]} ${initials[1]}`
//     } else if (Array.length >= 3) {
//         document.getElementById('card-user-img[i]').innerHTML = `+`
//     }
// }

// function generateInitials() {
//     let jsonString = '{"text": " hallo Welt"}';

// JSON-String in ein JavaScript-Objekt umwandeln
// let data = JSON.parse(jsonString);

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