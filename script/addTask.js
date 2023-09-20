const allContacts = {
    'contact1': {
        'name': 'Udo Jürgens',
        'styleColor': 'background-color: red',
        'twoLetter': 'UJ',
    },
    'contact2': {
        'name': 'Anna Müller',
        'styleColor': 'background-color: blue',
        'twoLetter': 'AM',
    },
    'contact3': {
        'name': 'Peter Schmidt',
        'styleColor': 'background-color: green',
        'twoLetter': 'PS',
    },
    'contact4': {
        'name': 'Lena Braun',
        'styleColor': 'background-color: yellow',
        'twoLetter': 'LB',
    },
    'contact5': {
        'name': 'Karl Heinz',
        'styleColor': 'background-color: orange',
        'twoLetter': 'KH',
    }
};
let allTasks = [];
let subTaskCollection = [];
let contactCollection = [];


/**
 * Renders all selected contacts to the DOM.
 */
function renderAllSelectedContacts() {
    let contactZone = document.getElementById('selectedContactsContainer');
    contactZone.innerHTML = '';
    let i = 0;
    for (let key in contactCollection) {
        const contacts = contactCollection[key];
        contactZone.innerHTML += returnRenderAllSelectedContacts(contacts);
        i++;
    }
}


/**
 * Renders all contacts for search and select.
 */
function renderAllContactsForSearch() {
    let contactZone = document.getElementById('contactsRenderContainer');
    contactZone.innerHTML = '';
    let i = 0;
    for (let key in allContacts) {
        const contacts = allContacts[key];
        contactZone.innerHTML += returnRenderAllContactsForSearch(contacts, i, key);
        i++;
    }
}



//SubTaskFunctions//


/**
 * Adds a sub-task to the collection.
 */
function addSubTaskToCollection() {
    let input = document.getElementById('subTaskSelectInput');
    if (input.value = '') {

    }
    subTaskCollection.push(input.value);
    renderSubTaskCollection();
    input.value = '';
}


/**
 * Renders the sub-task collection to the DOM.
 */
function renderSubTaskCollection() {
    let collection = document.getElementById('selectedSubTaskContainer');
    collection.innerHTML = '';
    hideEditContainer();
    for (let i = 0; i < subTaskCollection.length; i++) {
        const subCollection = subTaskCollection[i];
        collection.innerHTML += returnSubTaskCollection(subCollection, i);
    }
}


/**
 * Deletes a sub-task from the collection.
 * @param {number} i - Index of the sub-task.
 */
function deleteSubtaskCollection(i) {
    subTaskCollection.splice(i, 1);
    renderSubTaskCollection();
}


/**
 * Edits a sub-task.
 * @param {number} i - Index of the sub-task.
 */
function editSubtask(i) {
    let editSub = subTaskCollection[i];
    let inputContainer = document.getElementById('editContainer');
    showEditContainer();
    inputContainer.innerHTML = '';
    inputContainer.innerHTML += returnEditContainer(i);
    let input = document.getElementById('editInput');
    input.value = editSub;
}


/**
 * Confirms the editing of a sub-task.
 * @param {number} i - Index of the sub-task.
 */
function confirmSubEdit(i) {
    let editedInput = document.getElementById('editInput');
    if (editedInput.value === '') {
        subTaskCollection.splice(i, 1);
    } else {
        subTaskCollection[i] = editedInput.value;
    }
    renderSubTaskCollection();
}


/**
 * cancel the editing of a sub-task.
 */
function stopSubEdit() {
    let editedInput = document.getElementById('editInput');
    editedInput.value = '';
    hideEditContainer();
}


/**
 * show edit window.
 */
function showEditContainer() {
    let inputContainer = document.getElementById('editContainer');
    inputContainer.classList.remove('d-none');
}


/**
 * hide edit window.
 */
function hideEditContainer() {
    let inputContainer = document.getElementById('editContainer');
    inputContainer.classList.add('d-none');
}
//---------------------------------------------------------------------------------//


//AddTask//
function createTask() {
    var form = document.getElementById('myForm');
    if (form.checkValidity()) {
        addTask();
    }
}


function addTask() {
    // Werte aus den Formularelementen abrufen
    const titel = document.getElementById('addTitel').value;
    const description = document.getElementById('addDescription').value;
    const assignedToContact = contactCollection;//---------------------------//
    const dueDate = document.getElementById('datepicker').value;
    const prio = document.getElementById('prio').value;
    const category = document.getElementById('category').value;
    const subtask = subTaskCollection;

    let task = {
        'task': {
            'titel': titel,
            'description': description,
            'assignedTo': assignedToContact,
            'dueDate': dueDate,
            'prio': prio,
            'category': category,
            'subtask': subtask,
        }
    };
    allTasks.push(task);
    console.log(allTasks);
}
//---------------------------------------------------------------------------------//


//Hide and Show functions//
function toggleVisibility(id, id2) {
    const elementOne = document.getElementById(id);
    const elementTwo = document.getElementById(id2);

    elementOne.classList.add('d-none');
    elementTwo.classList.remove('d-none');
    renderAllContactsForSearch();
    renderAllSelectedContacts();
}


function toggleContactSelection(i, key) {
    const contact = allContacts[key];
    const mainElement = document.getElementById(`assignedContactsBox${i}`);
    const firstSecondary = document.getElementById(`assignedBox${i}`);
    const secondSecondary = document.getElementById(`assignedBoxChecked${i}`);

    if (mainElement.classList.contains('assignedContactsBox')) {
        selectContact(mainElement, firstSecondary, secondSecondary);
        if (!contactCollection.includes(contact)) {
            contactCollection.push(contact);
        }
    } else {
        deselectContact(mainElement, firstSecondary, secondSecondary);
        const index = contactCollection.indexOf(contact);
        if (index > -1) {
            contactCollection.splice(index, 1);
        }
    }
}

function isContactInCollection(contact) {
    return contactCollection.includes(contact);
}

function selectContact(mainElement, firstSecondary, secondSecondary) {
    mainElement.classList.remove('assignedContactsBox');
    mainElement.classList.add('assignedContactsBoxSelected');
    firstSecondary.classList.add('d-none');
    secondSecondary.classList.remove('d-none');
    return;
}

function deselectContact(mainElement, firstSecondary, secondSecondary) {
    mainElement.classList.remove('assignedContactsBoxSelected');
    mainElement.classList.add('assignedContactsBox');
    firstSecondary.classList.remove('d-none');
    secondSecondary.classList.add('d-none');
    return;
}
//---------------------------------------------------------------------------------//


//Prio Buttons class-change//
function prioSelected(btnId, iconId, activeIconId, activeClass, resetOther) {
    if (resetOther) {
        resetAll();
    }
    document.getElementById(btnId).classList.add(activeClass);
    document.getElementById(iconId).classList.add('d-none');
    document.getElementById(activeIconId).classList.remove('d-none');
}


function resetAll() {
    const buttons = ['prioUrgentBtn', 'prioMediumBtn', 'prioLowBtn'];
    const icons = ['prioUrgentIcon', 'prioMediumIcon', 'prioLowIcon'];
    const activeIcons = ['prioUrgentIconActiv', 'prioMediumIconActiv', 'prioLowIconActiv'];
    const activeClasses = ['prioBtnActivUrgent', 'prioBtnActivMedium', 'prioBtnActivLow'];

    for (let i = 0; i < buttons.length; i++) {
        document.getElementById(buttons[i]).classList.remove(activeClasses[i]);
        document.getElementById(icons[i]).classList.remove('d-none');
        document.getElementById(activeIcons[i]).classList.add('d-none');
    }
}
//---------------------------------------------------------------------------------//


//return render Contacts(all and selected)//
function returnRenderAllSelectedContacts(contacts) {
    return /*html*/`
    <div style="${contacts.styleColor}" class="assignedToContactImg">${contacts.twoLetter}</div>
    `;
}


function returnRenderAllContactsForSearch(contacts, i, key) {
    const isSelected = isContactInCollection(contacts);

    // Klassen- und Style-Anpassungen basierend auf der isSelected-Logik
    let mainClass = isSelected ? 'assignedContactsBoxSelected' : 'assignedContactsBox';
    let firstSecondaryClass = isSelected ? 'd-none' : '';
    let secondSecondaryClass = isSelected ? '' : 'd-none';

    return /*html*/`
        <div class="${mainClass}" id="assignedContactsBox${i}" onclick="toggleContactSelection(${i}, '${key}')">
            <div class="contactBoxLeft">
                <div style="${contacts.styleColor}" class="assignedToContactImg">
                    ${contacts.twoLetter}
                </div>
                <span>${contacts.name}</span>
            </div>
            <img src="img/addTaskBox.svg" id="assignedBox${i}" class="${firstSecondaryClass}">
            <img src="img/addTaskCheckBox.svg" class="${secondSecondaryClass}" id="assignedBoxChecked${i}">
        </div>`;
}
//---------------------------------------------------------------------------------//


//return Hide and Show//
function returnSettingsMain(mainElement) {
    if (mainElement.classList.contains('assignedContactsBox')) {
        mainElement.classList.remove('assignedContactsBox');
        mainElement.classList.add('assignedContactsBoxSelected');
    } else {
        mainElement.classList.remove('assignedContactsBoxSelected');
        mainElement.classList.add('assignedContactsBox');
    }
    return
}


function returnSettingsFirst(firstSecondary) {
    if (firstSecondary.classList.contains('d-none')) {
        firstSecondary.classList.remove('d-none');
    } else {
        firstSecondary.classList.add('d-none');
    }
    return
}


function returnSettingsSecond(secondSecondary) {
    if (secondSecondary.classList.contains('d-none')) {
        secondSecondary.classList.remove('d-none');
    } else {
        secondSecondary.classList.add('d-none');
    }
    return
}
//---------------------------------------------------------------------------------//


//return Subtask//
function returnEditContainer(i) {
    return /*html*/`<input id="editInput" type="text">
        <img onclick="stopSubEdit()" class="editAbsolutCross" src="img/close.svg">
        <img onclick="confirmSubEdit(${i})" class="editAbsolutCheck" src="img/SubtasksCheck.svg">
        `;
}


function returnSubTaskCollection(subCollection, i) {
    return /*html*/`
        <ul class="dFlex spaceBtw">
            <li>${subCollection}</li>
            <div>
                <img onclick="editSubtask(${i})" src="img/PenAddTask 1=edit.svg">
                <img onclick="deleteSubtaskCollection(${i})" src="img/subTaskDelete.svg">
            </div>
        </ul>`;
}
//---------------------------------------------------------------------------------//
