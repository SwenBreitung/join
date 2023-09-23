let selectedIndex = null;
let selectedColorIndex = null;
let colorCollection = [
    'background: #FF7A00',
    'background: #FC71FF',
    'background: #1FD7C1',
    'background: #0038FF',
    'background: #FFC701',
    'background: #29ABE2',
    'background: #091931',];

let mainCategorys = [
    {
        'name': ['Technical Task', 'User Story',],
        'color': ['background: #1FD7C1', 'background: #0038FF',],
    }
];

let allCategorys = [
    {
        'name': [],
        'color': [],
    }
];

let allTasks = [];
let subTaskCollection = [];
let contactCollection = [];
let currentCategorySelected = [
    {
        'name': '',
        'color': '',
    }
]
let currentPrioSelected = "";


const titel = document.getElementById('addTitel').value;
const description = document.getElementById('addDescription').value;
const assignedToContact = contactCollection;
const dueDate = document.getElementById('datepicker').value;
const prio = currentPrioSelected;
const category = currentCategorySelected;
const subtask = subTaskCollection;




//SubTaskFunctions//

/**
 * Adds a sub-task to the collection.
 */
function addSubTaskToCollection() {
    let input = document.getElementById('subTaskSelectInput');
    if (input.value === '') {
        return;
    } else {
        subTaskCollection.push(input.value);
        renderSubTaskCollection();
        input.value = '';
    }
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

/**
 * Validates the form and adds a task if the form is valid.
 */
function createTask() {
    var form = document.getElementById('myForm');
    if (form.checkValidity()) {
        addTask();
    }
}


/**
 * Retrieves data from form elements and adds a new task.
*/
function addTask() {

    let task = {
        'id': 0,
        'status': '',
        'category': '',
        'categoryColor': '',
        'title': titel,
        'description': description,
        'dueDate': dueDate,
        'priority': prio,
        'contactName': [],
        'contactColor': [],
        'contactAbbreviation': [],
        'subtasksInProgress': subtask,
        'subtasksFinish': [],
    }
        ;
    allTasks.push(task);
}
//---------------------------------------------------------------------------------//


//Hide and Show functions//

/**
 * Toggles the visibility of two DOM elements.
 * @param {string} id - ID of the first DOM element.
 * @param {string} id2 - ID of the second DOM element.
*/
function toggleVisibility(id, id2) {
    const elementOne = document.getElementById(id);
    const elementTwo = document.getElementById(id2);
    if (id === '') {
        elementTwo.classList.remove('d-none');
    } else {
        if (id2 === '') {
            elementOne.classList.add('d-none');
        } else {
            elementOne.classList.add('d-none');
            elementTwo.classList.remove('d-none');
            renderAllContactsForSearch();
            renderAllSelectedContacts();
        }
    }
    renderCategorys();
    createCategoryWindow();
}
//---------------------------------------------------------------------------------//


//Contact functions//

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



async function renderAllContactsForSearch(filterText = '') {
    await loadContacts();
    let contactZone = document.getElementById('contactsRenderContainer');
    contactZone.innerHTML = '';
    let i = 0;
    for (let key in contactsArray) {
        const contacts = contactsArray[key];

        // Wenn ein Filtertext vorhanden ist und der Kontaktname ihn nicht enthält, überspringen Sie diesen Kontakt
        if (filterText && !contacts.name.toLowerCase().includes(filterText)) {
            continue;
        }

        contactZone.innerHTML += returnRenderAllContactsForSearch(contacts, i, key);
        i++;
    }
}


document.getElementById('assignedToInput').addEventListener('input', function (event) {
    const searchText = event.target.value.toLowerCase();
    renderAllContactsForSearch(searchText);
});


/**
 * Selects or deselects a contact based on its current state.
 * @param {number} i - Index of the contact.
 * @param {string} key - Key of the contact in the `allContacts` collection.
 */
function toggleContactSelection(i, key) {
    const contact = contactsArray[key];
    const el = (suffix) => document.getElementById(`${suffix}${i}`);
    const mainElement = el('assignedContactsBox'), firstSecondary = el('assignedBox'), secondSecondary = el('assignedBoxChecked');

    if (mainElement.classList.contains('assignedContactsBox')) {
        selectContact(mainElement, firstSecondary, secondSecondary);
        if (!contactCollection.includes(contact)) contactCollection.push(contact);
    } else {
        deselectContact(mainElement, firstSecondary, secondSecondary);
        const index = contactCollection.indexOf(contact);
        if (index > -1) contactCollection.splice(index, 1);
    }
}


/**
 * Checks if a contact is in the `contactCollection`.
 * @param {Object} contact - The contact object to check.
 * @returns {boolean} - True if contact is in the collection, false otherwise.
*/
function isContactInCollection(contact) {
    return contactCollection.includes(contact);
}


/**
 * Sets styles to visually select a contact.
 * @param {HTMLElement} mainElement - Main contact DOM element.
 * @param {HTMLElement} firstSecondary - First secondary DOM element.
 * @param {HTMLElement} secondSecondary - Second secondary DOM element.
*/
function selectContact(mainElement, firstSecondary, secondSecondary) {
    mainElement.classList.remove('assignedContactsBox');
    mainElement.classList.add('assignedContactsBoxSelected');
    firstSecondary.classList.add('d-none');
    secondSecondary.classList.remove('d-none');
    return;
}


/**
 * Sets styles to visually deselect a contact.
 * @param {HTMLElement} mainElement - Main contact DOM element.
 * @param {HTMLElement} firstSecondary - First secondary DOM element.
 * @param {HTMLElement} secondSecondary - Second secondary DOM element.
*/
function deselectContact(mainElement, firstSecondary, secondSecondary) {
    mainElement.classList.remove('assignedContactsBoxSelected');
    mainElement.classList.add('assignedContactsBox');
    firstSecondary.classList.remove('d-none');
    secondSecondary.classList.add('d-none');
    return;
}
//---------------------------------------------------------------------------------//
//Category functions//

function renderCategorys() {
    let container = document.getElementById('categoryRenderContainer');
    container.innerHTML = ''; // Leert den Container bevor er neu gerendert wird
    let all = allCategorys[0];
    let main = mainCategorys[0];
    for (let m = 0; m < main.name.length; m++) {
        const mName = main.name[m];
        const mColor = main.color[m];
        container.innerHTML += returnRenderMainCategorys(mName, mColor, m);
        for (let a = 0; a < all.name.length; a++) {
            const aName = all.name[a];
            const aColor = all.color[a];
            container.innerHTML += returnRenderAllCategorys(aName, aColor, a);
        }
    }
}

function createCategoryWindow() {
    let container = document.getElementById('createCategoryContainer');
    container.innerHTML = returnCreateCategoryWindow();
    let colorContainer = document.getElementById('colorSettingBox');
    colorContainer.innerHTML = '';
    for (let index = 0; index < colorCollection.length; index++) {
        const color = colorCollection[index];
        colorContainer.innerHTML += returnCreateCategoryColors(color, index);
    }
}






function selectColor(index) {
    updateSelectedColorIndex(index);
    refreshColorSelection();
}

function updateSelectedColorIndex(index) {
    selectedColorIndex = selectedColorIndex === index ? null : index;
}

function refreshColorSelection() {
    // TODO: Logik, um die ausgewählte Farbe im UI hervorzuheben.
}

function confirmCreateCategory() {
    if (isValidCategoryInput()) {
        addCategory();
        renderCategorys();
    } else {
        alertInvalidInput();
    }
}

function isValidCategoryInput() {
    let inputElem = document.getElementById('createCategoryInput');
    return inputElem.value.length >= 2 && selectedColorIndex !== null;
}

function addCategory() {
    let inputElem = document.getElementById('createCategoryInput');
    allCategorys[0].name.push(inputElem.value);
    allCategorys[0].color.push(colorCollection[selectedColorIndex]);
}

function alertInvalidInput() {
    alert("Bitte geben Sie einen Kategorienamen mit mindestens 2 Buchstaben ein und wählen Sie eine Farbe aus.");
}
function selectCategory(type, index) {
    updateCurrentCategorySelected(type, index);
    updateInputs();
    selectedIndex = index; // Aktualisieren von selectedIndex beim Auswählen einer Kategorie
    highlightSelectedCategory();
}
function updateCurrentCategorySelected(type, index) {
    let categoryData = type === 'main' ? mainCategorys[0] : allCategorys[0];
    currentCategorySelected[0].name = categoryData.name[index];
    currentCategorySelected[0].color = categoryData.color[index];
}

function updateInputs() {
    let inputV1 = document.getElementById('categoryInputV1');
    let inputV2 = document.getElementById('categoryInputV2');
    setInputValueAndColor(inputV1);
    setInputValueAndColor(inputV2);
}

function setInputValueAndColor(inputElem) {
    inputElem.value = currentCategorySelected[0].name;
    inputElem.style.borderColor = getBorderColor();
}

function getBorderColor() {
    return currentCategorySelected[0].color.replace('background:', '').trim();
}

function highlightSelectedCategory() {
    if (selectedIndex !== null) {
        let categoryElement = document.getElementById(`categoryMainList${selectedIndex}`);
        if (categoryElement) categoryElement.classList.add('selected');
    }
}
function deselectCategory() {
    unhighlightSelectedCategory();
    resetCurrentCategorySelected();
    resetInputs();
    selectedIndex = null; // Setzt selectedIndex zurück
}
function resetCurrentCategorySelected() {
    currentCategorySelected[0].name = '';
    currentCategorySelected[0].color = '';
}

function resetInputs() {
    let inputV1 = document.getElementById('categoryInputV1');
    let inputV2 = document.getElementById('categoryInputV2');
    resetInputValueAndColor(inputV1);
    resetInputValueAndColor(inputV2);
}

function resetInputValueAndColor(inputElem) {
    inputElem.value = 'Select task category';
    inputElem.style.borderColor = 'initial';
}

function unhighlightSelectedCategory() {
    if (selectedIndex !== null) {
        let categoryElement = document.getElementById(`categoryMainList${selectedIndex}`);
        if (categoryElement) categoryElement.classList.remove('selected'); // Entfernt die Klasse
    }
}






function returnCreateCategoryWindow() {
    return /*html*/`
    <input id="createCategoryInput" placeholder="Category name..." type="text">
    <img onclick="stopCreateCategory()" class="editAbsolutCross"
    src="img/close.svg">
    <img onclick="confirmCreateCategory()" class="editAbsolutCheck"
    src="img/SubtasksCheck.svg">
    <div class="colorSettingBox" id="colorSettingBox">
    </div>
    `;
}
function returnCreateCategoryColors(color, index) {
    return /*html*/`
        <div onclick='selectColor(${index})' style="${color}" class="colorCircle"></div>
    `;
}

function returnRenderMainCategorys(name, color, i) {
    return /*html*/`
    <div onclick='selectCategory("main", ${i})' id='categoryMainList${i}' class="categoryRow">
    <span>${name}</span>
        <div class="colorCircle" style="${color}"></div>
    </div>
    `;
}
function returnRenderAllCategorys(name, color, i) {
    return /*html*/`
    <div onclick='selectCategory("all", ${i})' id='categoryAllList${i}' class="categoryRow">
    <span>${name}</span>
    <div class='categoryRowLeft'>
        <div class="colorCircle" style="${color}"></div>
        <img src="img/subTaskDelete.svg">
    </div>
    </div>
    `;
}
function stopCreateCategory() {
    input = document.getElementById('createCategoryInput');
    input.value = '';
    toggleVisibility('createCategoryContainer', '');
}
//---------------------------------------------------------------------------------//

//Prio Buttons class-change//

/**
 * Updates visual representation of priority buttons.
 * @param {string} btnId - ID of the priority button.
 * @param {string} iconId - ID of the inactive icon.
 * @param {string} activeIconId - ID of the active icon.
 * @param {string} activeClass - CSS class to apply when active.
 * @param {boolean} resetOther - Determines if other buttons should be reset.
 */
function activateButton(btnId, iconId, activeIconId, activeClass, iconSrc) {
    document.getElementById(btnId).classList.add(activeClass);
    document.getElementById(iconId).classList.add('d-none');
    document.getElementById(activeIconId).classList.remove('d-none');
    currentPrioSelected = iconSrc;
}

function deactivateButton(btnId, iconId, activeIconId, activeClass) {
    document.getElementById(btnId).classList.remove(activeClass);
    document.getElementById(iconId).classList.remove('d-none');
    document.getElementById(activeIconId).classList.add('d-none');
    currentPrioSelected = "";
}

function prioSelectedToggle(btnId, iconId, activeIconId, activeClass, iconSrc, resetOther) {
    if (currentPrioSelected === iconSrc) {
        deactivateButton(btnId, iconId, activeIconId, activeClass);
    } else {
        if (resetOther) resetAll();
        activateButton(btnId, iconId, activeIconId, activeClass, iconSrc);
    }
}/**
 * Resets all priority buttons to their default states.
 */
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
    currentPrioSelected = "";
}
//---------------------------------------------------------------------------------//


//return render Contacts(all and selected)//

/**
 * Returns an HTML string representing a selected contact.
 * @param {Object} contacts - The contact object to render.
 * @returns {string} - HTML string for the rendered contact.
 */
function returnRenderAllSelectedContacts(contacts) {
    return /*html*/`
    <div style="background-color:${contacts.color}" class="assignedToContactImg">${contacts.nameAbbreviation}</div>
    `;
}


/**
 * Returns an HTML string for the contact search functionality.
 * @param {Object} contacts - The contact object to render.
 * @param {number} i - Index of the contact.
 * @param {string} key - Key of the contact in the `allContacts` collection.
 * @returns {string} - HTML string for the rendered contact.
 */
function returnRenderAllContactsForSearch(contacts, i, key) {
    const isSelected = isContactInCollection(contacts);
    let mainClass = isSelected ? 'assignedContactsBoxSelected' : 'assignedContactsBox';
    let firstSecondaryClass = isSelected ? 'd-none' : '';
    let secondSecondaryClass = isSelected ? '' : 'd-none';
    return /*html*/`
        <div class="${mainClass}" id="assignedContactsBox${i}" onclick="toggleContactSelection(${i}, '${key}')">
            <div class="contactBoxLeft">
                <div style="background-color:${contacts.color}" class="assignedToContactImg">
                    ${contacts.nameAbbreviation}
                </div>
                <span>${contacts.name}</span>
            </div>
            <img src="img/addTaskBox.svg" id="assignedBox${i}" class="${firstSecondaryClass}">
            <img src="img/addTaskCheckBox.svg" class="${secondSecondaryClass}" id="assignedBoxChecked${i}">
        </div>`;
}


/**
 * Toggles classes for the main settings element.
 * @param {HTMLElement} mainElement - Main settings DOM element.
 */
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


/**
 * Toggles visibility for the first settings element.
 * @param {HTMLElement} firstSecondary - First settings DOM element.
 */
function returnSettingsFirst(firstSecondary) {
    if (firstSecondary.classList.contains('d-none')) {
        firstSecondary.classList.remove('d-none');
    } else {
        firstSecondary.classList.add('d-none');
    }
    return
}


/**
 * Toggles visibility for the second settings element.
 * @param {HTMLElement} secondSecondary - Second settings DOM element.
 */
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

/**
 * Returns an HTML string representing the subtask editing container.
 * @param {number} i - Index of the subtask.
 * @returns {string} - HTML string for the subtask edit container.
 */
function returnEditContainer(i) {
    return /*html*/`<input id="editInput" type="text">
        <img onclick="stopSubEdit()" class="editAbsolutCross" src="img/close.svg">
        <img onclick="confirmSubEdit(${i})" class="editAbsolutCheck" src="img/SubtasksCheck.svg">
        `;
}


/**
 * Returns an HTML string representing a collection of subtasks.
 * @param {Object} subCollection - The subtask collection to render.
 * @param {number} i - Index of the subtask in the collection.
 * @returns {string} - HTML string for the rendered subtask collection.
 */
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
