/**
 * Adds a new subtask to the subtasks list.
 * This function captures the content from the subtask input field, creates a subtask object, and adds it to the global subtasks array.
 * After adding, it resets the subtask input container and reloads the subtask display.
 *
 */
function addSubTask() {
    let taskContent = document.getElementById('subTaskSelectInput').value.trim();
    if (taskContent) {
        let subtaskObj = generateSubtaskObj(taskContent, false)
        subtasks.push(subtaskObj);
        resetContainer('subtasks-addet');
        loadSubTask();
        clearInput('subTaskSelectInput');
        document.getElementById('input-subtask-border').classList.remove('red');
    } else {
        document.getElementById('input-subtask-border').classList.add('red');
    }
}

function generateSubtaskObj(name, boolian) {
    return {
        name: name,
        status: boolian
    };
}

/**
 * Deletes a subtask based on the clicked element's data-target attribute.
 * Identifies the subtask to be deleted using the data-target attribute of the clicked element,
 * removes it from the global subtasks array, and reloads the subtask display.
 *
 * @param {Event} event - The click event object from the event listener.
 */
function deleteSubtaskContainer(event) {
    let target = event.target.getAttribute('data-target');
    let index = parseInt(target.replace('subtask-container', ''));
    subtasks.splice(index, 1);
    loadSubTask();
}


/**
 * Loads and displays all subtasks in the subtasks array.
 * Iterates through each subtask in the global subtasks array, creates HTML content using a template function, 
 * and updates the inner HTML of the 'subtasks-addet' element with the new content.
 *
 */
function loadSubTask(withStatus = false) {
    let newSubTaskHTML = '';
    subtasks.forEach(function(subtask, index) {
        let status = Array.isArray(withStatus) ? withStatus[index] : withStatus;
        newSubTaskHTML += loadSubTaskTemplate(subtask.name, index, status);
    });
    document.getElementById('subtasks-addet').innerHTML = newSubTaskHTML;
}


/**
 * Saves a new subtask and updates the display with the newly added item.
 * This function captures subtask text and color from input fields, validates the subtask text, 
 * creates new subtask HTML using a template function, and then updates the display. 
 * It also clears the input field and closes the dialog window after saving the subtask.
 *
 */
function saveSubtask() {
    const subtaskText = document.getElementById('subtask-input').value;
    if (!subtaskText) {
        alert('Please provide subtask text');
        return;
    }

    const selectedColor = document.getElementById('subtask-color-input').value;
    const newItemHTML = newItemTemplate(selectedColor, subtaskText);
    document.getElementById('itemsContainer').insertAdjacentHTML('beforeend', newItemHTML);
    document.getElementById('subtask-input').value = '';
    document.getElementById('dialog-window').classList.add('d-none');
}


/**
 * Constructs and returns a new task object based on input field values.
 * This function compiles data from various input fields to create a new task object, 
 * including title, description, date, category, priority, subtasks, contacts, and status.
 * 
 * @returns {Object} A new task object with properties set from the input fields.
 */
function saveDataTask(taskID, status) {
    let getValue = id => {
        const element = document.getElementById(id);
        return element ? element.value : "";
    };
    let [title, description, date, category] = ['addTitel', 'addDescription', 'datepicker', 'categoryInputV1'].map(getValue);
    let priority = getPriorityLabel(currentPriority);
    let contacts = contactsTask;
    let newTask = {
        id: taskID,
        category,
        title,
        description,
        time: "",
        date,
        priority,
        subtasks,
        contacts,
        status: status
    };
    return newTask;
}


/**
 * Handles the click event on the 'Add Task' button, saving either a new or an existing task.
 * Depending on the state of 'saveAddTaskToggle', this function either creates a new task or updates an existing one.
 * After saving, it either redirects to the 'board.html' page or stays on the current page.
 *
 * @async

 */
async function handleAddTaskButtonClick() {
    if (!saveAddTaskTorgle && validateForm()) {
        saveNewTask();
        await savetasksDataToBakcend();
        window.location.href = 'board.html';
    } else if (saveAddTaskTorgle && validateForm()) {
        saveOldTask();
        savetasksDataToBakcend();
        await loadTasks();
        closeWindow('add-task')
    }

}


function validateForm() {
    const categoryInput = document.getElementById('categoryInputV1');
    if (categoryInput.value === 'Select task category' || categoryInput.value.trim() === '') {
        document.getElementById('categoryAreaV1').classList.add('red-border');
        return false;
    }
    return true;
}


/**
 * Updates the background color of priority buttons based on the current priority.
 * This function iterates over each priority button and changes its background color if its corresponding priority is active.
 * If the priority is not active, it resets the button's background color.
 *
 */
function updateButtonColors() {
    const colorMap = { 1: 'red', 2: 'orange', 3: 'green' };
    ['prioUrgentBtn', 'prioMediumBtn', 'prioLowBtn'].forEach((btnId, index) => {
        const btn = document.getElementById(btnId);
        btn.style.backgroundColor = currentPriority === index + 1 ? colorMap[index + 1] : '';
    });
}


/**
 * Updates the source images of priority icons based on a predefined mapping.
 * Iterates over each priority icon and updates its source attribute to the corresponding image in the imgMap.
 */
function updatePriorityImages() {
    const imgMap = { 1: './img/prioLow.svg', 2: './img/prioMedium.svg', 3: './img/prioUrgent.svg' };
    ['prioLowIcon', 'prioMediumIcon', 'prioUrgentIcon'].forEach((iconId, index) => {
        const icon = document.getElementById(iconId);
        icon.src = imgMap[index + 1];
    });
}


/**
 * Updates the source of an image element to a new URL.
 * This function finds an image element by its ID and sets its source attribute to a new image URL provided.
 *
 * @param {string} id - The ID of the image element to be updated.
 * @param {string} newImgSrc - The new source URL for the image.
 */
function updateImage(id, newImgSrc) {
    let imageElement = document.getElementById(id);
    imageElement.src = newImgSrc;
}


/**
 * Toggles the visibility of a dropdown menu.
 * This function checks the current display state of the dropdown menu and toggles it between visible ('flex') and hidden ('none').
 *
 */
function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
}


/**
 * Handles the click event on the dropdown trigger.
 * When the dropdown trigger is clicked, this function calls another function to toggle the visibility of the dropdown menu.
 *
 */
function handleDropdownTriggerClick() {
    toggleDropdown();
}


/**
 * Handles the click event on a dropdown menu option.
 * This function is called when a dropdown menu option is clicked. It delegates the task of handling the selection to the `selectOption` function.
 *
 * @param {Element} optionElement - The DOM element of the clicked dropdown option.
 */
// function handleDropdownOptionClick(optionElement) {
//     selectOption(optionElement);
// }


/**
 * Closes the dropdown menu if a click occurs outside of it.
 * This function checks if the dropdown menu is currently displayed and if the click event target is not within the dropdown menu.
 * If both conditions are met, it calls `toggleDropdown` to close the menu.
 *
 * @param {Event} event - The click event object from the event listener.
 */
// function closeDropdownIfClickedOutside(event) {
//     const dropdownMenu = document.getElementById('dropdownMenu');
//     if (dropdownMenu.style.display === 'flex' && !event.target.closest('#dropdownMenu')) {
//         toggleDropdown();
//     }
// }


/**
 * Sets the selected option's text to the value of a specified input field and closes the dropdown menu.
 * This function updates the value of the 'categoryInputV1' input field to the text content of the clicked option 
 * and then hides the dropdown menu.
 *
 * @param {Element} optionElement - The DOM element of the selected dropdown option.
 * - 'categoryInputV1': The ID of the input field where the selected option's text is displayed.
 */
// function selectOption(optionElement) {
//     document.getElementById('categoryInputV1').value = optionElement.textContent;
//     dropdownMenu.style.display = 'none';
// }


/**
 * Initializes a Pikaday date picker for the specified input element.
 *
 * @param {Element} dateInput The input element where the date picker should be displayed.
 */
function initializeDatePicker() {
    var dateInput = document.getElementById('datepicker');
    if (!dateInput) return; // Sicherstellen, dass das Element existiert

    var picker = new Pikaday({
        field: dateInput,
        position: 'top right',
        format: 'DD/MM/YYYY',
        minDate: new Date(),
        onSelect: function(date) {
            const formattedDate = [
                date.getDate().toString().padStart(2, '0'),
                (date.getMonth() + 1).toString().padStart(2, '0'),
                date.getFullYear()
            ].join('/');
            dateInput.value = formattedDate;
        }
    });

    dateInput.addEventListener('focus', function() {
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
}


/**
 * Creates and appends color divs to the container element based on the provided array of colors.
 *
 * @param {Element} container The element where the color divs should be appended.
 * @param {Array<string>} colorArray The array of colors.
 */
function createColorDivs() {
    const container = document.getElementById('color-container');
    container.innerHTML = ""
    colorArray.forEach((color, index) => {
        const div = document.createElement('div');
        div.style.backgroundColor = color;
        div.className = "color-box";
        div.id = `color-${index}`;
        div.addEventListener('click', colorSelectionHandler);
        container.appendChild(div);
    })
};


/**
 * Closes the dialog window with the specified ID and toggles the visibility of the dropdown menu.
 *
 * @param {string} id The ID of the dialog window to be closed.
 */
function closeDialogAndToggleDropdown(id) {
    if (!event.target.closest('#dialog')) {
        closeDialogWindow(id);
    }
}


/**
 * Resets the borders of all color divs to their default styles.
 */
function resetBorders() {
    for (let i = 0; i < 20; i++) {
        const colorDiv = document.getElementById(`color-${i}`);
        if (colorDiv) {
            colorDiv.style.border = '';
        }
    }
}


/**
 * Renders the list of contacts based on the provided contact data.
 *
 * @param {Element} contactsElement The element where the contact list should be rendered.
 * @param {Array<Object>} contacts The array of contacts data.
 */
async function renderContacts(contacts) {
    const contactsElement = document.getElementById('contactsId');

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let initalien = extractInitials(contact.name)
        let contactName = contact.name;
        let contactColor = contact.color;
        contactsElement.innerHTML += loadContactHTML(initalien, contactName, contactColor, i)
    }
}