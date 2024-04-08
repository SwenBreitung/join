/**
 * Opens a dialog window and creates color divs within it.
 * This function first triggers the opening of a dialog window and then calls another function to create color divs inside the dialog.
 *
 */
function openDialogAndCreateColors() {
    openDialog('dialog-window')
    createColorDivs();
}


/**
 * Handles color selection from a set of color options.
 * When a color is selected, this function sets the `selectedColor` variable to the background color of the clicked element,
 * resets the borders of all color options, and then highlights the selected color by setting its border.
 *
 * @param {Event} event - The click event object from the event listener.
 */
function colorSelectionHandler(event) {
    selectedColor = event.target.style.backgroundColor;
    resetBorders();
    event.target.style.border = '1px solid black';
}


/**
 * Handles color selection from a set of color options.
 * When a color is selected, this function sets the `selectedColor` variable to the background color of the clicked element,
 * resets the borders of all color options, and then highlights the selected color by setting its border.
 *
 * @param {Event} event - The click event object from the event listener.
 */
function closeDialogWindow(id) {
    closeWindow(id)
    toggleDropdown()
}


/**
 * Resets all input fields and related elements to their default states.
 * This function clears the values of various input fields and resets the content of certain elements.
 * It also calls functions to reset all checkboxes and reset priority settings.
 *
 */
function resetAllInputs() {
    ['addTitel', 'addDescription', 'datepicker', 'categoryInputV1', 'subTaskSelectInput'].forEach(id => {
        document.getElementById(id).value = "";
    });
    document.getElementById('categoryInputV1').value = `Select task category`;
    document.getElementById('add-contacts-add-tasks').innerHTML = "";
    document.getElementById('subtasks-addet').innerHTML = "";
    resetAllCheckboxes();
    resetPriority()
}


/**
 * Toggles the priority status of a task based on the provided priority number.
 * If the current priority is different from the provided priority number, it activates the new priority.
 * Otherwise, it resets the priority to its default state.
 *
 * @param {string} id - The ID of the priority element to be toggled.
 * @param {number} priorityNumber - The priority number to set or reset.
 */
function togglePriority(id, priorityNumber) {
    if (currentPriority !== priorityNumber) {
        activatePriority(id, priorityNumber);
    } else {
        resetPriority();
    }
}


/**
 * Activates a specified priority level for a task.
 * Sets the current priority to the specified level, updates priority images and button colors, 
 * and changes the image of the selected priority to reflect the new status.
 *
 * @param {string} id - The ID of the priority element being activated.
 * @param {number} priorityNumber - The priority level to be activated.
 */
function activatePriority(id, priorityNumber) {
    currentPriority = priorityNumber;
    updatePriorityImages();
    updateButtonColors();
    updateImage(id, getPriorityImage(priorityNumber));
}


/**
 * Resets the current task's priority to its default state.
 * This function clears the current priority setting and updates the visual representation of priority in the UI.
 *
 */
function resetPriority() {
    currentPriority = null;
    updatePriorityImages();
    updateButtonColors();
}


/**
 * Retrieves the file path of the priority image based on the provided priority number.
 * This function maps a priority number to its corresponding image file path.
 *
 * @param {number} priorityNumber - The priority level for which the image path is needed.
 * @returns {string} The file path of the image associated with the given priority level.

 */
function getPriorityImage(priorityNumber) {
    const imgMap = { 1: './img/PrioUrgentWhite.svg', 2: './img/PrioMediumWhite.svg', 3: './img/PrioLowWhite.svg' };
    return imgMap[priorityNumber];
}


/**
 * Retrieves the textual label for a given priority number.
 * Maps a priority number to its corresponding textual label like 'urgent', 'medium', or 'low'.
 *
 * @param {number} priorityNumber - The priority level for which the label is needed.
 * @returns {string} The textual label of the given priority level, or an empty string if not found.
 */
function getPriorityLabel(priorityNumber) {
    const priorityMap = { 1: "urgent", 2: "medium", 3: "low" };
    return priorityMap[priorityNumber] || "";
}