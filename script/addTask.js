let titleAddTask = '';

let descriptionAddTask = '';

let dueDateAddTask = '';

let selectedIndex = null;

let selectedColorIndex = [];

let colorCollection = [
    'background: #006400', 'background: #00008B', 'background: #8B0000',
    'background: #800080', 'background: #808080', 'background: #0000CD',
    'background: #008000', 'background: #FF0000', 'background: #8A2BE2',
    'background: #FFA500', 'background: #2E8B57', 'background: #9932CC',
    'background: #DC143C', 'background: #228B22', 'background: #20B2AA',
    'background: #FF1493', 'background: #D2691E', 'background: #00CED1',
    'background: #008080', 'background: #FF6347'
];

let mainCategorys = [{
    'name': ['Technical Task', 'User Story',],
    'color': ['background: #1FD7C1', 'background: #0038FF',],
}];

let allCategorys = [{
    'name': [],
    'color': [],
}];

let subTaskCollection = [];

let subtasksFinish = [];

let contactCollection = [];

let currentCategorySelected = [{
    'name': '',
    'color': '',
}];

let currentPrioSelected = "";

let currentId = 0;

let taskIdForEdit = '';

let statusEdit = '';

let editTask = '';

load();
//---------------------------------------------------------------------------------//


//edit task//


function loadEditTask(i) {
    toggleVisibilityAddTask('', 'addTaskPop');
    editTask.push(tasks[i]);
    titleAddTask.push(editTask.title);
    descriptionAddTask.push(editTask.description);
    dueDateAddTask.push(editTask.dueDate);
    currentPrioSelected.push(editTask.priority);
    subTaskCollection.push(editTask.subtasksInProgress);
    subtasksFinish.push(editTask.subtaskFinish);
    taskIdForEdit.push(editTask.id);
    contactCollection.nameAbbreviation.push(editTask.contactAbbreviation);
    contactCollection.color.push(editTask.contactColor);
    contactCollection.name.push(editTask.contactName);
    currentCategorySelected[0].color.push(editTask.categoryColor);
    currentCategorySelected[0].name.push(editTask.category);
    statusEdit.push(editTask.status);
    save()
    editTaskWindow();
}


function editTaskWindow() {
    load();
    let assignTo1 = document.getElementById('assignedToInputContainer');
    let assignTo2 = document.getElementById('assignedToContactsInputContainer');
    let categoryBox1 = document.getElementById('categoryAreaV1');
    let categoryBox2 = document.getElementById('categoryAreaV2');
    let prioBox = document.getElementById('prioBox');
    let buttonArea = document.getElementById('buttonAreaAddTask');
    buttonArea.innerHTML = returnButtonAreaEditTask();
    assignTo1.innerHTML = returnAssignToBox1();
    assignTo2.innerHTML = returnAssignToBox2();
    categoryBox1.innerHTML = returnCategoryBox1();
    categoryBox2.innerHTML = returnCategoryBox2();
    prioBox.innerHTML = returnPrioBox();
    borderColorCheck();
    renderCategorys();
    renderAllSelectedContacts();
    renderAllContactsForSearch();
    renderSubTaskCollection();
    createCategoryWindow();
    initializePrioButtons();

}


//Init functions//


async function initAddTask() {
    await initializeStorage('allCategorys', allCategorys);
    await loadTasks();
    await loadAddTaskCurrentId();
    await loadAddTaskAllCategorys();
    markCategory();
    renderAddTaskContent();
}


async function initializeStorage(key, initialValue) {
    try {
        await getItem(key);
    } catch (e) {
        console.info(`Key "${key}" not found in storage. Initializing with default value.`);
        await setItem(key, JSON.stringify(initialValue));
    }
}


function renderAddTaskContent() {
    load();
    let assignTo1 = document.getElementById('assignedToInputContainer');
    let assignTo2 = document.getElementById('assignedToContactsInputContainer');
    let categoryBox1 = document.getElementById('categoryAreaV1');
    let categoryBox2 = document.getElementById('categoryAreaV2');
    let prioBox = document.getElementById('prioBox');
    let buttonArea = document.getElementById('buttonAreaAddTask');
    buttonArea.innerHTML = returnButtonAreaAddTask();
    assignTo1.innerHTML = returnAssignToBox1();
    assignTo2.innerHTML = returnAssignToBox2();
    categoryBox1.innerHTML = returnCategoryBox1();
    categoryBox2.innerHTML = returnCategoryBox2();
    prioBox.innerHTML = returnPrioBox();
    borderColorCheck();
    renderAllSelectedContacts();
    renderAllContactsForSearch();
    renderSubTaskCollection();
}
//---------------------------------------------------------------------------------//


//Load & Save//


function save() {
    localStorage.setItem('categoryCollectionAsText', JSON.stringify(currentCategorySelected));
    localStorage.setItem('currentPrioAsText', JSON.stringify(currentPrioSelected));
    localStorage.setItem('subTaskCollectionAsText', JSON.stringify(subTaskCollection));
    localStorage.setItem('contactCollectionAsText', JSON.stringify(contactCollection));
    localStorage.setItem('selectedIndexAsText', JSON.stringify(selectedIndex));
    localStorage.setItem('selectedColorIndexAsText', JSON.stringify(selectedColorIndex));
    localStorage.setItem('titelAsText', JSON.stringify(titleAddTask));
    localStorage.setItem('descriptionAsText', JSON.stringify(descriptionAddTask));
    localStorage.setItem('dueDateAsText', JSON.stringify(dueDateAddTask));
    localStorage.setItem('subTaskFinishAsText', JSON.stringify(subtasksFinish));
    localStorage.setItem('taskIdAsText', JSON.stringify(taskIdForEdit));
    localStorage.setItem('statusAsText', JSON.stringify(statusEdit));
}


function load() {
    let currentCategoryLoad = localStorage.getItem('categoryCollectionAsText');
    let currentPrioLoad = localStorage.getItem('currentPrioAsText');
    let subTaskCollectionLoad = localStorage.getItem('subTaskCollectionAsText');
    let contactCollectionLoad = localStorage.getItem('contactCollectionAsText');
    let selectedIndexLoad = localStorage.getItem('selectedIndexAsText');
    let selectedColorLoad = localStorage.getItem('selectedColorIndexAsText');
    let titelLoad = localStorage.getItem('titelAsText');
    let descriptionLoad = localStorage.getItem('descriptionAsText');
    let dueDateLoad = localStorage.getItem('dueDateAsText');
    let subTaskFinishLoad = localStorage.getItem('subTaskFinishAsText');
    let taskIdLoad = localStorage.getItem('taskIdAsText');
    let statusLoad = localStorage.getItem('statusAsText');
    returnLoad(currentCategoryLoad, currentPrioLoad, subTaskCollectionLoad, contactCollectionLoad, selectedIndexLoad, selectedColorLoad, titelLoad, descriptionLoad, dueDateLoad, subTaskFinishLoad, taskIdLoad, statusLoad);
}


function returnLoad(currentCategoryLoad, currentPrioLoad, subTaskCollectionLoad, contactCollectionLoad, selectedIndexLoad, selectedColorLoad, titelLoad, descriptionLoad, dueDateLoad, subTaskFinishLoad, taskIdLoad, statusLoad) {
    if (currentCategoryLoad && currentPrioLoad && subTaskCollectionLoad && contactCollectionLoad && selectedIndexLoad && selectedColorLoad && titelLoad && descriptionLoad && dueDateLoad && subTaskFinishLoad && taskIdLoad && statusLoad) {
        currentCategorySelected = JSON.parse(currentCategoryLoad);
        currentPrioSelected = JSON.parse(currentPrioLoad);
        subTaskCollection = JSON.parse(subTaskCollectionLoad);
        contactCollection = JSON.parse(contactCollectionLoad);
        selectedIndex = JSON.parse(selectedIndexLoad);
        selectedColorIndex = JSON.parse(selectedColorLoad);
        titleAddTask = JSON.parse(titelLoad);
        descriptionAddTask = JSON.parse(descriptionLoad);
        dueDateAddTask = JSON.parse(dueDateLoad);
        subtasksFinish = JSON.parse(subTaskFinishLoad);
        taskIdForEdit = JSON.parse(taskIdLoad);
        statusEdit = JSON.parse(statusLoad);
    }
}


async function loadAddTaskCurrentId() {
    try {
        currentId = JSON.parse(await getItem('currentId'));
    } catch (e) {
        console.info('Could not load currentId');
    }
}


async function loadAddTaskAllCategorys() {
    try {
        allCategorys = JSON.parse(await getItem('allCategorys'));
    } catch (e) {
        console.info('Could not load categorys');
    }
}
//---------------------------------------------------------------------------------//


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
        save();
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
    save()
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
    save();
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
        titleAddTask = document.getElementById('addTitel').value;
        descriptionAddTask = document.getElementById('addDescription').value;
        dueDateAddTask = document.getElementById('datepicker').value;
        save();
        addTask();
        document.getElementById('createTaskButton').classList.remove('d-none');
        document.getElementById('editTaskButton').classList.add('d-none');
    }
}


/**
 * Retrieves data from form elements and adds a new task.
 */
async function addTask() {
    contactNames = contactCollection.map(contact => contact.name);
    contactColors = contactCollection.map(contact => contact.color);
    contactNamesAbbreviation = contactCollection.map(contact => contact.nameAbbreviation);
    let task = {
        'id': currentId,
        'status': 'toDo',
        'category': currentCategorySelected[0].name,
        'categoryColor': currentCategorySelected[0].color,
        'title': titleAddTask,
        'description': descriptionAddTask,
        'dueDate': dueDateAddTask,
        'priority': currentPrioSelected,
        'contactName': contactNames,
        'contactColor': contactColors,
        'contactAbbreviation': contactNamesAbbreviation,
        'subtasksInProgress': subTaskCollection,
        'subtasksFinish': subtasksFinish,
    }
    tasks.push(task);
    currentId++;
    await setItem('tasks', JSON.stringify(tasks));
    await setItem('currentId', JSON.stringify(currentId));
    resetAllAddTaskElements();
}


function clearButton() {
    resetAllAddTaskElements();
    window.location.reload();

}


function resetAllAddTaskElements() {
    titleAddTask = '';
    descriptionAddTask = '';
    dueDateAddTask = '';
    currentCategorySelected = [{
        'name': '',
        'color': '',
    }];
    subtasksFinish = [];
    subTaskCollection = [];
    selectedIndex = null;
    selectedColorIndex = [];
    currentPrioSelected = "";
    contactCollection = [];
    taskIdForEdit = '';
    statusEdit = '';
    clearAddTaskInputs();
    resetInputs();
    save();
    window.location.href = './board.html';
}


function clearAddTaskInputs() {
    titleAddTask = document.getElementById('addTitel').value;
    descriptionAddTask = document.getElementById('addDescription').value;
    dueDateAddTask = document.getElementById('datepicker').value;
    titleAddTask = '';
    descriptionAddTask = '';
    dueDateAddTask = '';
}
//---------------------------------------------------------------------------------//


//Hide and Show functions//


/**
 * Toggles the visibility of two DOM elements.
 * @param {string} id - ID of the first DOM element.
 * @param {string} id2 - ID of the second DOM element.
 */
function toggleVisibilityAddTask(id, id2) {
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
        }
    }
    renderAllSelectedContacts();
    renderCategorys();
    createCategoryWindow();
    borderColorCheck();
}
//---------------------------------------------------------------------------------//


//Contact functions//


/**
 * Renders all selected contacts to the DOM.
 */
function renderAllSelectedContacts() {
    let contactZone = document.getElementById('selectedContactsContainer');
    contactZone.innerHTML = '';
    for (let index = 0; index < contactCollection.length; index++) {
        contactColors = contactCollection[index].color;
        contactNamesAbbreviation = contactCollection[index].nameAbbreviation;
        contactZone.innerHTML += returnRenderAllSelectedContacts(contactColors, contactNamesAbbreviation);
    }
}


async function renderAllContactsForSearch(filterText = '') {
    await loadContacts();
    let contactZone = document.getElementById('contactsRenderContainer');
    contactZone.innerHTML = '';
    for (let index = 0; index < contactsArray.length; index++) {
        contactColors = contactsArray[index].color;
        contactNamesAbbreviation = contactsArray[index].nameAbbreviation;
        contactNames = contactsArray[index].name;

        if (filterText && !contacts.name.toLowerCase().includes(filterText)) {
            continue;
        }
        contactZone.innerHTML += returnRenderAllContactsForSearch(contactColors, contactNamesAbbreviation, contactNames, index);
    }
}


/**
 * Selects or deselects a contact based on its current state.
 * @param {number} i - Index of the contact.
 * @param {string} key - Key of the contact in the `allContacts` collection.
 */
async function toggleContactSelection(i) {
    await loadContacts();
    const contact = contactsArray[i];
    const el = (suffix) => document.getElementById(`${suffix}${i}`);
    const mainElement = el('assignedContactsBox'),
        firstSecondary = el('assignedBox'),
        secondSecondary = el('assignedBoxChecked');

    if (mainElement.classList.contains('assignedContactsBox')) {
        selectContact(mainElement, firstSecondary, secondSecondary);
        if (!contactCollection.some(c => c.name === contact.name && c.color === contact.color)) contactCollection.push(contact);
    } else {
        deselectContact(mainElement, firstSecondary, secondSecondary);
        const index = contactCollection.findIndex(c => c.name === contact.name && c.color === contact.color);
        if (index > -1) contactCollection.splice(index, 1);
    }
    save();
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

async function createContactByPopup() {
    let newContact = {
        "name": document.getElementById('inputNameId').value,
        "nameAbbreviation": '',
        "email": document.getElementById('inputEmailId').value,
        "phone": document.getElementById('inputPhoneId').value,
        "color": getColor()
    }
    contactsArray.push(newContact);
    await setItem('contactsArray', JSON.stringify(contactsArray));
    document.getElementById('inputNameId').value = '';
    document.getElementById('inputEmailId').value = '';
    document.getElementById('inputPhoneId').value = '';
    toggleVisibilityAddTask('contactPopupByAddTask', '');
    renderAllContactsForSearch();
}


function clearContactPopup() {
    document.getElementById('inputNameId').value = '';
    document.getElementById('inputEmailId').value = '';
    document.getElementById('inputPhoneId').value = '';
    toggleVisibilityAddTask('contactPopupByAddTask', '')
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
    }
    for (let a = 0; a < all.name.length; a++) {
        const aName = all.name[a];
        const aColor = all.color[a];
        container.innerHTML += returnRenderAllCategorys(aName, aColor, a);
    }
}


async function deleteCategory(i) {
    let allCategory = allCategorys[0];
    allCategory.name.splice(i, 1);
    allCategory.color.splice(i, 1);
    await setItem('allCategorys', JSON.stringify(allCategorys));
    save()
}


function selectCategory(type, index) {
    let mainCategory = mainCategorys[0];
    let allCategory = allCategorys[0];
    if (type === 'main') {
        currentCategorySelected[0].name = mainCategory.name[index];
        currentCategorySelected[0].color = mainCategory.color[index];
    }
    if (type === 'all') {
        currentCategorySelected[0].name = allCategory.name[index];
        currentCategorySelected[0].color = allCategory.color[index];
    }
    renderCategorys();
    save();
    borderColorCheck();
}


function borderColorCheck() {
    load();
    if (currentCategorySelected[0].name) {
        updateInputs();
    } else {
        resetInputs();
    }
}


function updateInputs() {
    let inputV1 = document.getElementById('categoryInputV1');
    let inputV2 = document.getElementById('categoryInputV2');
    setInputValueAndColor(inputV1);
    setInputValueAndColor(inputV2);
}


function setInputValueAndColor(inputElem) {
    inputElem.value = currentCategorySelected[0].name;
}


function resetInputs() {
    let inputV1 = document.getElementById('categoryInputV1');
    let inputV2 = document.getElementById('categoryInputV2');
    resetInputValueAndColor(inputV1);
    resetInputValueAndColor(inputV2);
}


function resetInputValueAndColor(inputElem) {
    inputElem.value = 'Select task category';
    inputElem.style.borderColor = '#D1D1D1';
}
//---------------------------------------------------------------------------------//


//create category//


function createCategoryWindow() {
    createCategoryColors();
}


function createCategoryColors() {
    let colorContainer = document.getElementById('colorSettingBox');
    colorContainer.innerHTML = '';

    for (let index = 0; index < colorCollection.length; index++) {
        const color = colorCollection[index];
        colorContainer.innerHTML += returnCreateCategoryColors(color, index);
    }
}


function selectColor(color) {
    updateSelectedColorIndex(color);
    createCategoryColors();
}


async function addCategory() {
    let inputElem = document.getElementById('createCategoryInput');
    allCategorys[0].name.push(inputElem.value);
    allCategorys[0].color.push(selectedColorIndex);
    await setItem('allCategorys', JSON.stringify(allCategorys));
    toggleVisibilityAddTask('createCategoryPopupByAddTask', '')
}


function updateSelectedColorIndex(index) {
    selectedColorIndex = selectedColorIndex === index ? null : index;
    save();
}


function confirmCreateCategory() {
    if (isValidCategoryInput()) {
        addCategory();
        renderCategorys();
    } else {
        alertInvalidInput();
    }
    clearCreateWindow();
}


function clearCreateWindow() {
    let input = document.getElementById('createCategoryInput');
    input.value = '';
    selectedColorIndex = null;
}


function alertInvalidInput() {
    alert("Bitte geben Sie einen Kategorienamen mit mindestens 2 Buchstaben ein und wählen Sie eine Farbe aus.");
}


function isValidCategoryInput() {
    let inputElem = document.getElementById('createCategoryInput');
    return inputElem.value.length >= 2 && selectedColorIndex !== null;
}


function stopCreateCategory() {
    clearCreateWindow();
    toggleVisibilityAddTask('createCategoryPopupByAddTask', '')
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
    save();
}


function deactivateButton(btnId, iconId, activeIconId, activeClass) {
    document.getElementById(btnId).classList.remove(activeClass);
    document.getElementById(iconId).classList.remove('d-none');
    document.getElementById(activeIconId).classList.add('d-none');
    currentPrioSelected = "";
    save();
}


function prioSelectedToggle(btnId, iconId, activeIconId, activeClass, iconSrc, resetOther) {
    if (currentPrioSelected === iconSrc) {
        deactivateButton(btnId, iconId, activeIconId, activeClass);
    } else {
        if (resetOther) resetAll();
        activateButton(btnId, iconId, activeIconId, activeClass, iconSrc);
    }
}


function initializePrioButtons() {
    if (!currentPrioSelected) return; // Wenn nichts ausgewählt ist, tue nichts.

    let btnId, iconId, activeIconId, activeClass;

    switch (currentPrioSelected) {
        case './img/prioUrgent.svg':
            btnId = 'prioUrgentBtn';
            iconId = 'prioUrgentIcon';
            activeIconId = 'prioUrgentIconActiv';
            activeClass = 'prioBtnActivUrgent';
            break;
        case './img/prioMedium.svg':
            btnId = 'prioMediumBtn';
            iconId = 'prioMediumIcon';
            activeIconId = 'prioMediumIconActiv';
            activeClass = 'prioBtnActivMedium';
            break;
        case './img/prioLow.svg':
            btnId = 'prioLowBtn';
            iconId = 'prioLowIcon';
            activeIconId = 'prioLowIconActiv';
            activeClass = 'prioBtnActivLow';
            break;
        default:
            console.error('Unbekanntes Icon in currentPrioSelected:', currentPrioSelected);
            return;
    }

    activateButton(btnId, iconId, activeIconId, activeClass, currentPrioSelected);
}

// Diese Funktion aufrufen, wenn die Seite geladen ist.


/**
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
    save();
}


//---------------------------------------------------------------------------------//


//only for date-input by addTask.html/ Due date//


document.addEventListener('DOMContentLoaded', function () {
    var dateInput = document.getElementById('datepicker');

    var picker = new Pikaday({
        field: dateInput,
        position: 'top right',
        format: 'DD/MM/YYYY',
        minDate: new Date(), // Das stellt sicher, dass kein Datum vor dem heutigen Datum ausgewählt werden kann.
        onSelect: function (date) {
            const formattedDate = [
                date.getDate().toString().padStart(2, '0'),
                (date.getMonth() + 1).toString().padStart(2, '0'),
                date.getFullYear()
            ].join('/');
            dateInput.value = formattedDate;
        }
    });


    dateInput.addEventListener('focus', function () {
        if (!this.value) {
            const today = new Date();
            const formattedDate = [
                today.getDate().toString().padStart(2, '0'),
                (today.getMonth() + 1).toString().padStart(2, '0'),
                today.getFullYear()
            ].join('/');
            this.value = formattedDate;
            picker.show();
        }
    });
});
//---------------------------------------------------------------------------------//


//category container add d-none by body-click//


document.body.addEventListener('click', function () {
    toggleVisibilityAddTask('categoryAreaV2', 'categoryAreaV1')
});
document.getElementById('categorySection').addEventListener('click', function (event) {
    event.stopPropagation();
});
//---------------------------------------------------------------------------------//


//contact container add d-none by body-click//


document.body.addEventListener('click', function () {
    toggleVisibilityAddTask('assignedToContactsInputContainer', 'assignedToInputContainer')
});
document.getElementById('assignTo').addEventListener('click', function (event) {
    event.stopPropagation();
});
//---------------------------------------------------------------------------------//


//categoryReturn//


function returnCreateCategoryColors(color, index) {
    if (color === selectedColorIndex) {
        return /*html*/ `
        <div onclick='selectColor("${color}")' style="${color}" id='colorCircle${index}' class="colorCircle selectedColor"></div>
        `;
    } else {
        return /*html*/ `
        <div onclick='selectColor("${color}")' style="${color}" id='colorCircle${index}' class="colorCircle"></div>
        `;
    }
}


function returnRenderMainCategorys(name, color, i) {
    if (currentCategorySelected[0].name === name &&
        currentCategorySelected[0].color === color) {
        return /*html*/ `
        <div onclick='selectCategory("main", ${i})' id='categoryMainList${i}' class="categoryRow selected">
            <span>${name}</span>
            <div class="colorCircle" style="${color}"></div>
        </div>
        `;
    } else {
        return /*html*/ `
        <div onclick='selectCategory("main", ${i})' id='categoryMainList${i}' class="categoryRow">
            <span>${name}</span>
            <div class="colorCircle" style="${color}"></div>
        </div>
        `;
    }
}


function returnRenderAllCategorys(name, color, i) {
    if (currentCategorySelected[0].name === name &&
        currentCategorySelected[0].color === color) {
        return /*html*/ `
        <div onclick='selectCategory("all", ${i})' id='categoryAllList${i}' class="categoryRow selected">
            <span>${name}</span>
            <div class='categoryRowLeft'>
                <div class="colorCircle" style="${color}"></div>
            </div>
        </div>
        `;
    } else {
        return /*html*/ `
        <div onclick='selectCategory("all", ${i})' id='categoryAllList${i}' class="categoryRow">
            <span>${name}</span>
            <div class='categoryRowLeft'>
                <img onclick='deleteCategory(${i})' src="img/subTaskDelete.svg">
                <div class="colorCircle" style="${color}"></div>
            </div>
        </div>
        `;
    }
}
//---------------------------------------------------------------------------------//


//return render Contacts(all and selected)//


/**
 * Returns an HTML string representing a selected contact.
 * @param {Object} contacts - The contact object to render.
 * @returns {string} - HTML string for the rendered contact.
 */
function returnRenderAllSelectedContacts(contactColors, contactNamesAbbreviation) {
    return /*html*/ `
    <div style="background-color:${contactColors}" class="assignedToContactImg">${contactNamesAbbreviation}</div>
    `;
}


/**
 * Returns an HTML string for the contact search functionality.
 * @param {Object} contacts - The contact object to render.
 * @param {number} i - Index of the contact.
 * @param {string} key - Key of the contact in the `allContacts` collection.
 * @returns {string} - HTML string for the rendered contact.
 */
function returnRenderAllContactsForSearch(contactColor, contactNamesAbbreviation, contactNames, index) {
    let isSelected = '';
    if (contactCollection.some(contact => contact.name === contactNames && contact.color === contactColor)) {
        isSelected = true;
    } else {
        isSelected = false;
    }
    let mainClass = isSelected ? 'assignedContactsBoxSelected' : 'assignedContactsBox';
    let firstSecondaryClass = isSelected ? 'd-none' : '';
    let secondSecondaryClass = isSelected ? '' : 'd-none';
    return /*html*/ `
    <div class="${mainClass}" id="assignedContactsBox${index}" onclick="toggleContactSelection(${index}, '${contactNames}')">
        <div class="contactBoxLeft">
            <div style="background-color:${contactColor}" class="assignedToContactImg">
                ${contactNamesAbbreviation}
            </div>
            <span>${contactNames}</span>
        </div>
        <img src="img/addTaskBox.svg" id="assignedBox${index}" class="${firstSecondaryClass}">
        <img src="img/addTaskCheckBox.svg" class="${secondSecondaryClass}" id="assignedBoxChecked${index}">
    </div>
    `;
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
    return /*html*/ `
    <input id="editInput" type="text">
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
    return /*html*/ `
    <ul class="dFlex spaceBtw">
        <li>${subCollection}</li>
        <div>
            <img onclick="editSubtask(${i})" src="img/PenAddTask 1=edit.svg">
            <img onclick="deleteSubtaskCollection(${i})" src="img/subTaskDelete.svg">
        </div>
    </ul>
    `;
}
//---------------------------------------------------------------------------------//


//return render functions//


function returnButtonAreaAddTask() {
    return /*html*/ `
    <button onclick="clearButton()" class="clearBtn">Clear<img class="clearImg"
            src="./img/crossAddTask.svg" alt=""></button>
    <button id="createTaskButton" onclick="createTask()" class="createBtn blueBtn">Create Task<img class="createImg"
            src="./img/check.svg"></button>
    <button id="editTaskButton" onclick="createTask()" class="createBtn blueBtn d-none">Edit Task<img class="createImg"
            src="./img/check.svg"></button>
    `;
}


function returnButtonAreaEditTask() {
    return /*html*/`
    <button onclick="addEditTask()" class="createBtn blueBtn">Edit task<img class="createImg"
            src="./img/check.svg"></button>
    `;
}


function returnCategoryBox1() {
    return /*html*/ `
    <input onclick="toggleVisibilityAddTask('categoryAreaV1', 'categoryAreaV2')"
        class="click" id="categoryInputV1" type="text" readonly
        value="Select task category">
    <img onclick="toggleVisibilityAddTask('categoryAreaV1', 'categoryAreaV2')"
        class="inputAbsolut" src="img/arrow_drop_downaa.svg">
    `;
}


function returnCategoryBox2() {
    return /*html*/ `
    <input onclick="toggleVisibilityAddTask('categoryAreaV2', 'categoryAreaV1')"
        class="click" id="categoryInputV2" type="text" readonly
        value="Select task category">
    <img onclick="toggleVisibilityAddTask('categoryAreaV2', 'categoryAreaV1')"
        class="inputAbsolut" src="img/arrow_drop_up.svg">
    <div class="selectContactsPositionContainer" id="categoryContainer">
        <div class="categoryRenderContainer show-scrollbar"
            id="categoryRenderContainer">
        </div>
        <div id="createCategoryContainer" class="d-none custom-select">
        </div>
        <div onclick="toggleVisibilityAddTask('', 'createCategoryPopupByAddTask')"
            class="addNewContactBtn blueBtn">
            <span>Add new category</span>
            <img class="addNewContactBtnIcon" src="img/addTaskCategory.svg">
        </div>
    </div>
    `;
}


function returnPrioBox() {
    return /*html*/ `
    <div onclick="prioSelectedToggle('prioUrgentBtn', 'prioUrgentIcon', 'prioUrgentIconActiv', 'prioBtnActivUrgent', './img/prioUrgent.svg', true)"
        id="prioUrgentBtn" class="prioBtn">Urgent
        <img id="prioUrgentIcon" class="prioBtnIcons" src="./img/prioUrgent.svg">
        <img id="prioUrgentIconActiv" class="prioBtnIcons d-none"
            src="./img/PrioUrgentWhite.svg">
    </div>
    <div onclick="prioSelectedToggle('prioMediumBtn', 'prioMediumIcon', 'prioMediumIconActiv', 'prioBtnActivMedium', './img/prioMedium.svg', true)"
        id="prioMediumBtn" class="prioBtn">Medium
        <img id="prioMediumIcon" class="prioBtnIcons" src="./img/prioMedium.svg">
        <img id="prioMediumIconActiv" class="prioBtnIcons d-none"
            src="./img/PrioMediumWhite.svg">
    </div>
    <div onclick="prioSelectedToggle('prioLowBtn', 'prioLowIcon', 'prioLowIconActiv', 'prioBtnActivLow', './img/prioLow.svg', true)"
        id="prioLowBtn" class="prioBtn">Low
        <img id="prioLowIcon" class="prioBtnIcons" src="./img/prioLow.svg">
        <img id="prioLowIconActiv" class="prioBtnIcons d-none"
            src="./img/PrioLowWhite.svg">
    </div>
    `;
}


function returnAssignToBox1() {
    return /*html*/ `
        <input class="click" id="assignedToInputCover"
            onclick="toggleVisibilityAddTask('assignedToInputContainer', 'assignedToContactsInputContainer')"
            type="text" readonly value="Select contacts to assign">
        <img onclick="toggleVisibilityAddTask('assignedToInputContainer', 'assignedToContactsInputContainer')"
            class="inputAbsolut" src="img/arrow_drop_downaa.svg">
        <div id="selectedContactsContainer">
        </div>
        `;
}


function returnAssignToBox2() {
    return /*html*/ `
    <input class="click" id="assignedToInput" type="text" placeholder="An:">
    <img class="inputAbsolut"
    onclick="toggleVisibilityAddTask('assignedToContactsInputContainer', 'assignedToInputContainer')"
    src="img/arrow_drop_up.svg">
    <div class="selectContactsPositionContainer">
        <div class="ContactsRenderContainer show-scrollbar"
            id="contactsRenderContainer">
        </div>
        <div onclick="toggleVisibilityAddTask('', 'contactPopupByAddTask')" class="addNewContactBtn blueBtn">
            <span>Add new contact</span>
            <img class="addNewContactBtnIcon" src="img/addTaskperson_add.svg">
        </div>
    </div>
    `;
}
//---------------------------------------------------------------------------------//