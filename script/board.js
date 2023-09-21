let todos = [{
    'id': 0,
    'title': 'This is the task',
    'status': 'to-do',
    'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita dolores quisquam rerum commodi deserunt nihil obcaecati minima excepturi minus mollitia at doloremque necessitatibus veniam rem doloribus aperiam laudantium, provident error.',
    'category': 'Technical Task',
    'priority': 'Low'
}, {
    'id': 1,
    'title': 'HTML Base Template Creation System bla bla bla',
    'status': 'in-progress',
    'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita dolores quisquam rerum commodi deserunt',
    'category': 'User Story',
    'priority': 'Medium'

}, {
    'id': 2,
    'title': 'This is one task',
    'status': 'awaiting-feedback',
    'description': 'This is the description',
    'category': 'Technical Task',
    'priority': 'Urgent'
}, {
    'id': 3,
    'title': 'This is the only task',
    'status': 'awaiting-feedback',
    'description': 'This is the description',
    'category': 'User Story',
    'priority': 'Low'
}];


function init() {
    includeHTML();
    updateHTML();
}

let currentDraggedElement;

function updateHTML() {
    let todo = todos.filter(t => t['status'] == 'to-do');
    document.getElementById('to-do').innerHTML = '';
    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];
        document.getElementById('to-do').innerHTML += generateTaskHTML(element);
    }

    let inProgress = todos.filter(t => t['status'] == 'in-progress');
    document.getElementById('in-progress').innerHTML = '';
    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('in-progress').innerHTML += generateTaskHTML(element);
    }

    let awaitingFeedback = todos.filter(t => t['status'] == 'awaiting-feedback');
    document.getElementById('awaiting-feedback').innerHTML = '';
    for (let index = 0; index < awaitingFeedback.length; index++) {
        const element = awaitingFeedback[index];
        document.getElementById('awaiting-feedback').innerHTML += generateTaskHTML(element);
    }

    let done = todos.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';
    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateTaskHTML(element);
    }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTaskHTML(element) {
    return /*html*/ `<div draggable="true" ondragstart="startDragging(${element['id']})" onclick="openTask()" class="task">
            <div>
                <div class="task-category"> ${element['category']}</div>
                <div class="task-title">${element['title']}</div>
                <div class="task-description"> ${element['description']}</div>
            </div>
            <div class="task-users-prio">
                <div class="task-users">
                    <div class="profile-picture horicontal-and-vertical">A</div>
                </div>
                <img src = "img/prio${element['priority']}.svg" alt = "${element['priority']}" >
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
    todos[currentDraggedElement]['status'] = status;
    updateHTML();
    removeHighlight(status);
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

/* --------------------------------------- */
function openTask() {
    document.getElementById('popup-container').classList.remove('d-none');
    document.getElementById('popup-container').innerHTML = `
    <div class="task-detail"></div>
    `;
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