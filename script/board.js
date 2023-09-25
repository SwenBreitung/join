let todos = [{
    'id': 0,
    'status': 'done',
    'category': 'Testcategory',
    'categoryColor': '',
    'title': 'Test',
    'description': 'Lorem',
    'dueDate': '12/12/12',
    'priority': 'Urgent',
    'contactName': ['Test'],
    'contactColor': ['#A8A8A8'],
    'contactAbbreviation': ['B'],
    'subtasksInProgress': [],
    'subtasksFinish': [],
}, {
    'id': 1,
    'status': 'in-progress',
    'category': '',
    'categoryColor': '',
    'title': '',
    'description': '',
    'dueDate': '',
    'priority': '',
    'contactName': [],
    'contactColor': [],
    'contactAbbreviation': [],
    'subtasksInProgress': [],
    'subtasksFinish': [],
}];



function init() {
    includeHTML();
    updateHTML();
}


// wenn subtaskfinish = abgehakt img
// wenn subtaskprogress = offen img



// let progressPercent = subtasksFinish.length / subtasksInProgress.length;
// percent = Math.round(percent * 100);


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
    let i = element['id']
    return /*html*/ `<div draggable="true" ondragstart="startDragging(${element['id']})" onclick="openTask(${i})" class="task">
            <div>
                <div class="task-category"> ${element['category']}</div>
                <div class="task-title">${element['title']}</div>
                <div class="task-description"> ${element['description']}</div>
            </div>
            <div class="task-users-prio">
                <div class="task-users">
                    <div class="profile-picture horicontal-and-vertical" style="background-color:${element['contactColor']} ">${element['contactAbbreviation']}</div>
                </div>
                <img src="img/prio${element['priority']}.svg" alt ="${element['priority']}" >
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
function openTask(i) {
    console.log(todos[i]['title'])
    document.getElementById('popup-container').classList.remove('d-none');
    document.getElementById('popup-container').innerHTML = /*html*/ `
    <div class="task-detail">


        <div class="task-detail-content">
            <div class="task-detail-top">
                <div class="task-detail-category"> ${todos[i]['category']}</div>
                <img onclick="closeTask()" src="img/close.svg" alt="close">
            </div>
               

            <div class="task-detail-title"><h1>${todos[i]['title']}</h1></div>
            <div class="task-description"> ${todos[i]['description']}</div>
            <div class="task-detail-font-color">Due date:</div>${todos[i]['dueDate']}
            <div class="task-detail-font-color">Priority:</div>  
                ${todos[i]['priority']}
                <img src = "img/prio${todos[i]['priority']}.svg" alt = "${todos[i]['priority']}">
           
            <div class="task-detail-font-color">Assigned To:</div>${todos[i]['contactName']}

            <div> 
                <div class="task-detail-font-color">Subtasks</div>
                
                <img src="img/done.svg" alt="">
                <img src="img/addTaskBox.svg" alt="">
                ${todos[i]['subtask']}
       
               
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




async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }

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