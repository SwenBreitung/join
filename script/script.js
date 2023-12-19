// let tasks = [];
//  import { Draggable } from '@shopify/draggable';
let userData = [];
let userId;
let moduloColor = 0;
openMenu = false;


/**
 * Loads the user's header image in the application's header.
 * This function sets the initials and background color of the user's header image.
 */
function loadHeadImg() {
    let img = document.getElementById('header-user-img');
    initials = extractInitials(userData['name'])
    img.innerHTML = initials;
    img.style.backgroundColor = userData.color;
}


/**
 * Toggles the visibility of the header menu by adding or removing the 'd-none' class.
 * This function is used to open or close the header menu when called.
 */
function openHeaderMenu() {
    openMenu = !openMenu;
    let headerMenu = document.getElementById('menu-header-container');
    openMenu ? headerMenu.classList.remove('d-none') : headerMenu.classList.add('d-none');
}


/**
 * Generates a random background color from a predefined color array.
 *
 * @returns {string} - A randomly selected background color in hexadecimal format.
 */
function generateBackgroundColor() {
    let i = Math.floor(Math.random() * colorArray.length);
    moduloColor++;
    return colorArray[i];
}


/**
 * Closes a dialog by adding the 'd-none' class to hide it.
 */
function closeDialog() {
    document.getElementById('dialog-full').classList.add('d-none');
}


/**
 * Extracts initials from a given text, typically a user's name.
 *
 * @param {string} text - The text from which to extract initials.
 * @returns {string} - The extracted initials, formatted in uppercase.
 */
function extractInitials(text) {
    text = text.trim();
    let index = text.indexOf(' ');
    if (index !== -1 && index < text.length - 1) {
        let firstLetter = text.charAt(0).toUpperCase();
        let letterAfterSpace = text.charAt(index + 1).toUpperCase();
        return firstLetter + letterAfterSpace;
    } else if (text.length > 1) { // Check if there are at least two characters in the name
        return text.charAt(0).toUpperCase() + text.charAt(1).toUpperCase();
    } else if (text.length === 1) {
        return text.charAt(0).toUpperCase();
    } else {
        console.log('Empty text provided.');
        return '';
    }
}


/**
 * This function is to create the name abbreviation
 *
 *
 */
function renderContactsAndInitials(userContent, previousFirstLetter) {
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let nameAbbreviation = extractInitials(contact.name);
        let firstLetter = contact.name.charAt(0).toUpperCase();

        if (firstLetter !== previousFirstLetter) {
            userContent.innerHTML += /* html */
                `<div class="first-letter ">
                ${firstLetter}
            </div>
            <div class="partingLine">
            </div>
            `;
            previousFirstLetter = firstLetter;
        }
        userContent.innerHTML += loadContactData(contact, nameAbbreviation, i);
        // addNameAbbreviationInContactsArray();
    }
}


/**
 * This function us used to display the contact infos 
 * 
 * 
 */
function loadContactData(contact, nameAbbreviation, i) {
    return /* html */ `
    <div class="contactsInfo" onclick="loadContactInfos(contacts[${i}], ${i}, '${nameAbbreviation}')">
    <div class="profile-picture-list" style="background-color: ${contact.color}">
        <spline class="fontSize12">
            ${nameAbbreviation}
        </spline>
    </div>
    <div class="column">
        <spline class="fontSize20">${contact['name']}</spline>    
        <spline class="fontSize16 emailScrollMenu">${contact['email']}</spline>
    </div>
</div>
    `
}


/**
 * Resets all backend users by clearing the 'users' data in local storage.
 * This function loads the backend users, clears the users array, and updates local storage.
 */
async function resetAllBackendUser() {
    await loadBackendUsers();
    users.splice(0, users.length);
    await setItem('users', JSON.stringify(users));
}


/**
 * Resets all backend tasks by clearing the 'tasks' data in local storage.
 * This function loads the backend tasks, clears the tasks array, and updates local storage.
 */
async function resetAllBackendTasks() {
    await loadTasksFromBackend();
    tasks.splice(0, tasks.length);
    await setItem('tasks', JSON.stringify(tasks));
}


/**
 * Saves tasks data to the backend by uploading it using the 'uploadBackendDatas' function.
 * This function uploads the 'tasks' data to the backend for storage.
 */
async function savetasksDataToBakcend() {
    await uploadBackendDatas('tasks', tasks);
}


/**
 * Saves contacts data to the backend by uploading it using the 'uploadBackendDatas' function.
 * This function uploads the 'contacts' data to the backend for storage.
 */
async function saveContactsDataToBakcend() {
    uploadBackendDatas('contacts', contacts)
}


/**
 * Closes a window by adding the 'd-none' class to hide it.
 *
 * @param {string} id - The ID of the window element to be closed.
 */
function closeWindow(id) {
    document.getElementById(id).classList.add('d-none');
}


/**
 * Clears the content of a container element by setting its inner HTML to an empty string.
 *
 * @param {string} id - The ID of the container element to be cleared.
 */
function resetContainer(id) {
    document.getElementById(id).innerHTML = "";
}

/**
 * Opens a dialog by removing the 'd-none' class to display it.
 *
 * @param {string} id - The ID of the dialog element to be opened.
 */
function openDialog(id) {
    document.getElementById(id).classList.remove('d-none');
}

function clearInput(inputId) {
    var inputElement = document.getElementById(inputId);
    inputElement.value = '';
}