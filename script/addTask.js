let subtasks = [];
let selectedColor;
let contactsTask = [];
let addTasksStatus = 'toDo';
let saveAddTaskTorgle = false;
let currentPriority = 'medium';
const actionMappings = {
    '#assignTo': handleContactDropdownTriggerClick,
    '#contacts-container span': handleDropdownOptionClick,
    // 'input[type="checkbox"][id^="contactCheckbox_"]': handleCheckboxClick,
    '#categoryAreaV1': handleDropdownTriggerClick
};


/**
 * Initializes the application by loading various components and data.
 * Performs a series of asynchronous operations to load necessary data and UI components.
 * 
 * @async
 */
async function loadInit() {
    await includeHTML();
    await loadAllDataFromBackend();
    await loadUserDataFromLocalStorage();
    renderContacts(contacts);
    initializeDatePicker();
    await loadHeadImg()
    highlightCurrentPageInHeader('add-task-sidebar');
    activatePriority('prioMediumIcon', 2)
}


document.body.addEventListener('click', handleGeneralClick);
document.body.addEventListener('click', handleEditSubtaskClick);


/**
 * Saves the modifications made to an existing task.
 * This function captures the current state of the task, updates it in the global tasks array, and then resets all input fields.
 *
 */
function saveOldTask() {
    let task = saveDataTask(tasks[currentIndex].id, tasks[currentIndex].status);
    tasks[currentIndex] = task;
    resetAllInputs();
}


/**
 * Creates and saves a new task.
 * This function captures the current state of a new task, adds it to the global tasks array, and then clears all input fields.
 *
 */
function saveNewTask() {
    let task = saveDataTask(tasks.length + 1, addTasksStatus);
    tasks.push(task);
    resetAllInputs();
};


/**
 * Handles general click events within the document.
 * This function determines the appropriate action based on the clicked element.
 * It checks if the clicked element or its ancestor matches a specific selector,
 * and then executes the corresponding action if a match is found.
 * It also manages the closing of dropdown menus if clicked outside of their elements.
 *
 * @param {Event} event - The click event triggered by the user.
 */
function handleGeneralClick(event) {
    for (const selector in actionMappings) {
        if (event.target.matches('#dropdownMenu span')) {
            handleDropdownOptionClick(event.target);
        }
        if (event.target.matches(selector) || event.target.closest(selector)) {
            const clickedOnDataElement = event.target.closest('[data-index]');
            if (clickedOnDataElement) {
                return;
            }
            actionMappings[selector](event);
            return;
        }
    }
    closeDropdownIfClickedOutside(event);
    closeDropdownIfClickedOutsideContacts(event);
}


/**
 * Handles the click event on a dropdown option.
 * This function delegates the action to `selectOption`, which processes the selection of the option.
 *
 * @param {Element} optionElement - The DOM element of the clicked dropdown option.
 */
function handleDropdownOptionClick(optionElement) {
    selectOption(optionElement);
}


/**
 * Handles the click event for the contact dropdown trigger.
 * This function is responsible for toggling the visibility of the contact dropdown menu.
 * It calls the `toggleContactDropdown` function which handles the actual show/hide logic.
 */
function handleContactDropdownTriggerClick() {
    toggleContactDropdown();
}


/**
 * Toggles the visibility of the dropdown menu.
 * This function retrieves the dropdown menu element and switches its display style
 * between 'flex' and 'none', effectively showing or hiding the dropdown menu.
 */
function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
}


/**
 * Toggles the visibility of the contact dropdown menu.
 * This function accesses the contact dropdown menu element and alternates its display style
 * between 'flex' and 'none'. This change makes the dropdown menu visible or hidden.
 */
function toggleContactDropdown() {
    const dropdownMenu = document.getElementById('contacts-container');
    dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
}


/**
 * Handles the click event on a dropdown option for contact selection.
 * This function captures the event object and passes it to the `selectContactOption` function
 * which handles the specific logic for selecting a contact based on the clicked option.
 *
 * @param {Event} event - The click event object associated with the selection of a dropdown option.
 */
function handleDropdownOptionClick(event) {
    const optionElement = event;
    selectContactOption(optionElement);
}


/**
 * Selects a contact option from the dropdown menu and updates the input field value.
 * This function sets the value of a specified input field to the text content of the 
 * selected option element. It also hides the dropdown menu after the selection.
 *
 * @param {Element} optionElement - The DOM element of the selected option from the dropdown menu.
 */
function selectContactOption(optionElement) {
    const dropdownMenu = document.getElementById('contacts-container');
    document.getElementById('categoryInputV1').value = optionElement.textContent;
    dropdownMenu.style.display = 'none';
}



function handleCheckboxClick(event) {

}



function closeDropdownIfClickedOutside(event) {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu && dropdownMenu.style.display === 'flex' && !event.target.closest('#dropdownMenu') && !event.target.closest('#itemsContainer')) {
        toggleDropdown();
    }
}

function closeDropdownIfClickedOutsideContacts(event) {
    const contactsMenu = document.getElementById('contacts-container');
    const clickedOnDataIndex = event.target.closest('[data-index]');

    if (contactsMenu && contactsMenu.style.display === 'flex' &&
        !event.target.closest('#contacts-container') && !clickedOnDataIndex) {
        toggleContactDropdown();
    }
}


/**
 * Resets the state of all checkbox inputs to unchecked.
 * This function selects all input elements of type checkbox on the page and sets their 'checked' property to false.
 *
 */
function resetAllCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

//Event Handling


document.body.addEventListener('click', handleCheckboxClickOnBody);


/**
 * Handles click events on checkboxes within the body of the page, specifically for 'contactCheckbox_' IDs.
 * This function manages the state of checkboxes related to contacts. When a checkbox is checked, it adds the contact 
 * to the contactsTask array and loads a template for the added task. If unchecked, it removes the contact from the display 
 * and the contactsTask array.
 *
 * @param {Event} event - The click event object from the event listener.
 */
function handleCheckboxClickOnBody(event) {
    let targetCheckbox = event.target.closest('input[type="checkbox"]');

    if (!targetCheckbox || !targetCheckbox.id.startsWith('contactCheckbox_')) {
        return;
    }

    if (targetCheckbox.checked) {
        addContact(targetCheckbox);
    } else {
        removeContact(targetCheckbox);
    }
}

function addContact(checkbox) {
    const parentDiv = checkbox.closest('.d-flex[data-index]');
    const index = parentDiv.getAttribute('data-index');
    const contactColor = contacts[index].color;
    let initials = extractInitials(contacts[index].name)
    contactsTask.push({
        name: contacts[index].name,
        color: contactColor,
    });
    loadContactAddTasksTamplate(initials, index, contactColor);
}

function removeContact(checkbox) {
    const dataIndex = checkbox.id.replace('contactCheckbox_', '');
    const contactIndex = parseInt(dataIndex, 10);
    const clickedContact = contacts[contactIndex];
    for (let i = 0; i < contactsTask.length; i++) {
        if (contactsTask[i].name === clickedContact.name) {
            contactsTask.splice(i, 1);
            break;
        }
    }
    const elementToRemove = document.querySelector(`.profilbuild[data-index="${dataIndex}"]`);
    if (elementToRemove) elementToRemove.remove();
}




/**
 * Handles click events for editing subtasks identified by the 'edit-subtask' ID.
 * This function enables content editing on the target subtask element when clicked. It sets the element to
 * 'contenteditable', adds focus styling, and focuses the element for immediate editing.
 *
 * @param {Event} event - The click event object from the event listener.
 */
function handleEditSubtaskClick(event) {
    let targetElement = event.target.closest('#edit-subtask');
    if (targetElement) {
        let targetId = targetElement.getAttribute('data-target');
        let targetDiv = document.getElementById(targetId);
        if (targetDiv) {
            // Prüfen, ob das Element bereits bearbeitet wird
            if (targetDiv.isContentEditable) {

                targetDiv.setAttribute('contenteditable', 'false');
                targetDiv.classList.remove('focus');
            } else {
                targetDiv.setAttribute('contenteditable', 'true');
                targetDiv.classList.add('focus');
                targetDiv.focus();
            }
        }
    }
}



/**
 * Collects the inner text of all elements with the class '.add-contacts-add-tasks' and stores it in an array.
 * This function queries all elements that are involved in adding contacts to tasks and compiles their text content into an array.
 *
 * @returns {string[]} An array containing the text content of each '.add-contacts-add-tasks' element.
 */
function loadContactsArry() {
    let contact = document.querySelectorAll('.add-contacts-add-tasks');
    let contacts = [];

    contact.forEach(contact => {
        contacts.push(contact.innerText);
    });
    return contacts;
}