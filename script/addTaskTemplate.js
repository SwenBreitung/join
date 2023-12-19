/**
 * Creates a template for a new subtask item in the dropdown menu.
 *
 * @param {string} selectedColor The selected color for the subtask item.
 * @param {string} subtaskText The text of the subtask item.
 * @returns {string} The HTML template for the subtask item.
 */
function newItemTemplate(selectedColor, subtaskText) {
    `
      <div class="dropdown-item cursor-pointer">
        <span class="dropdown-text cursor-pointer" data-color="${selectedColor}" style="color: white">${subtaskText}</span>
        <div class="color-box " style="background-color:${selectedColor};"></div>
      </div>
    `
}


/**
 * Loads the HTML for a single contact item.
 *
 * @param {string} initalien The initials of the contact.
 * @param {string} contactName The full name of the contact.
 * @param {string} contactColor The color of the contact's profile box.
 * @param {number} i The index of the contact in the array.
 * @returns {string} The HTML for the contact item.
 */
function loadContactHTML(initalien, contactName, contactColor, i) {
    return /*html*/ `
    <div class="d-flex align-items-center justify-content-between" data-index="${i}">
        <div class="d-flex" >
            <div class="profilbuild" style="background-color: ${contactColor}">${initalien}</div>
            <div class="d-flex align-items-center justify-content-between">${contactName}</div>
        </div>
        <div class="d-flex align-items-center justify-content-between">
            <input type="checkbox" id="contactCheckbox_${i}" name="contactCheckbox_${contactName}" />
            <label for="contactCheckbox_${i}"></label>
        </div>
    </div>
`
}


/**
 * Loads the HTML template for a subtask item in the task list.
 *
 * @param {string} subtask The text of the subtask.
 * @param {number} i The index of the subtask in the array.
 * @returns {string} The HTML template for the subtask item.
 */
function loadSubTaskTemplate(subtask, i, checkedAttribute) {
    return /*html*/ `  
    <li style="width: 100%;" id="subtask-container${i}">
        <div class="subtask-list">
                 <div id="subTask${i}"  class="subtask-container">${subtask} </div>    
                <div class="subtask-listImg" >
                   <img src="img/PenAddTask 1=edit.svg" alt="" data-target="subTask${i}" id="edit-subtask">
                   <img src="img/subTaskDelete.svg" alt="" data-target="subtask-container${i}" id="delete-subtask" onclick="deleteSubtaskContainer(event)">
                </div>
            </div>
         </div>
    </li>
    `;
}


/**
 * Loads the HTML template for a contact item in the "Add Contacts" / "Add Task" section.
 *
 * @param {string} initalien The initials of the contact.
 * @param {number} i The index of the contact in the array.
 * @param {string} contactColor The color of the contact's profile box.
 */
function loadContactAddTasksTamplate(initalien, i, contactColor) {
    let contact = document.getElementById('add-contacts-add-tasks')
    contact.innerHTML += /*html*/ `
      <div class="profilbuild" data-index="${i}" style="background-color: ${contactColor}">${initalien}</div>
`
}