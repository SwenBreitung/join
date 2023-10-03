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

/**
 * This functions clears the searchinput and switchs the x symbol of it back to searchsymbol
 * 
 */
function clearInput() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
    document.getElementById('searchLogo').classList.remove('d-none');
    document.getElementById('searchClose').classList.add('d-none')
    document.getElementById('contentposition').classList.remove('d-none');
}
/* ---------------------------------------------------------------------------------------------------------------------------------------------- */

/** 
 * This eventlistener is fired when the textbox is focused
 *  
*/
document.getElementById('searchInput').addEventListener("focus", changeDivColor);


/**
 * This function changes the bordercolor of the searchbar
 * 
 */
function changeDivColor() {
    document.getElementById('fake-searchbar').style.borderColor = "#29ABE2";
}


/**
 * This eventlistener removes the focus of the searchbar
 * 
 */
document.getElementById('searchInput').addEventListener("blur", revertDivColor);


/**
 * This function changes the bordercolor of the searchbar back to default
 * 
 */
function revertDivColor() {
    document.getElementById('fake-searchbar').style.borderColor = "#A8A8A8";
}


/* ---------------------------------------------------------------------------------------------------------------------------------------------- */

/**
 * It prevents the default behavior of the browser (which blocks dragging by default)
 * 
 * @param {DragEvent} ev - the drag event object
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * This function sets the new status of the element when it's dropped and updates the BoardHtml
 * 
 * @param {string} status - the status of the selected element
 */
async function moveTo(status) {
    tasks[currentDraggedElement]['status'] = status;
    await setItem('tasks', JSON.stringify(tasks));
    updateBoardHTML();
    removeHighlight(status);
}

/**
 * This function highlights the area which the selected element is dragged at or over
 * 
 * 
 * @param {string} id - the id of the element to be highlighted
 */
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
                <div class="task-description show-scrollbar"> ${element['description']}</div>
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
                        <h2>${tasks[i]['title']}</h2>
                    </div>
                    <div class="task-description show-scrollbar">
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
                <img onclick="editTaskNew(${i})"   src="img/PenAddTask 1=edit.svg" alt="">
            </div>
        </div>
    `;
}


async function editTaskNew(i) {
    document.getElementById('addTaskPop').classList.remove('d-none');
    closeTask();
    let taskToEdit = tasks[i];
    console.log(taskToEdit)
    editTaskWindow();
    document.getElementById("addTitel").value = taskToEdit.title;
    document.getElementById("addDescription").value = taskToEdit.description;
    document.getElementById("datepicker").value = taskToEdit.dueDate;
    for (let contactNumber = 0; contactNumber < taskToEdit.contactName.length; contactNumber++) {
        const cName = taskToEdit.contactName[contactNumber];
        const cColor = taskToEdit.contactColor[contactNumber];
        const cAbbreviation = taskToEdit.contactAbbreviation[contactNumber];

        contactCollection[contactNumber] = {
            'nameAbbreviation': cAbbreviation,
            'color': cColor,
            'name': cName,
        }
    }
    currentCategorySelected[0].color = taskToEdit.categoryColor;
    currentCategorySelected[0].name = taskToEdit.category;
    statusEdit = taskToEdit.status;
    currentPrioSelected = taskToEdit.priority;
    subTaskCollection = taskToEdit.subtasksInProgress;
    subtasksFinish = taskToEdit.subtasksFinish;
    taskIdForEdit = taskToEdit.id;
    save();
    editTaskWindow();
}


async function addEditTask() {
    contactNames = contactCollection.map(contact => contact.name);
    contactColors = contactCollection.map(contact => contact.color);
    contactNamesAbbreviation = contactCollection.map(contact => contact.nameAbbreviation);
    let taskEdit = {
        'id': taskIdForEdit,
        'status': statusEdit,
        'category': currentCategorySelected[0].name,
        'categoryColor': currentCategorySelected[0].color,
        'title': document.getElementById("addTitel").value,
        'description': document.getElementById("addDescription").value,
        'dueDate': document.getElementById("datepicker").value,
        'priority': currentPrioSelected,
        'contactName': contactNames,
        'contactColor': contactColors,
        'contactAbbreviation': contactNamesAbbreviation,
        'subtasksInProgress': subTaskCollection,
        'subtasksFinish': subtasksFinish,
    }
    let index = tasks.findIndex(task => task.id === taskIdForEdit);

    tasks[index] = taskEdit;
    await setItem('tasks', JSON.stringify(tasks));
    resetAllAddTaskElements();
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