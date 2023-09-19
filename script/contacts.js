let contactsArray = [{
    "name": contactName,
    "email": contacEmail,
    "phone": contacPhone,
}]


/**
 * This function is to load functions at start
 * 
 */
async function initContacts() {
    closePopup();
    await loadUsers();
    renderContacts();
}

/**
 * This function us used to:
 * Pull the users JSON Array (names/emails)
 * Pull the first letter from every user
 */
function renderContacts() {
    let userContent = document.getElementById('contactsId');
    users.sort((a, b) => a.name.localeCompare(b.name));
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const firstLetter = user.name.charAt(0).toUpperCase();
        userContent.innerHTML += loadContactInfos(user, firstLetter);
    }
}

/**
 * This function us used to display the contact infos 
 * 
 * 
 */
function loadContactInfos(user, firstLetter) {
    return /* html */ `
    <div class="horicontal contactsInfo pointer">
        <div class="profilePicture horicontalAndVertical" style="background-color: ${getRandomColor()}">
            ${firstLetter}
        </div>
        <div>
            <h5>${user['name']}</h5>
            <h6>${user['email']}</h6>
        </div>
    </div>
    `
}

/**
 * This function is used to create some random colors for the profile image background
 * 
 */
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function addContact() {
    toggleVisibility('addContactId', true);
}

function createContact() {

}


/**
 * This function is used to close the popup window
 * 
 */
function closePopup() {
    toggleVisibility('addContactId', false);
}


/**
 * This function is used to prevent the popup from closing when clicked.
 * 
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * This function is used to make div-container unvisible or visible
 *
 *
 */
function toggleVisibility(id, show) {
    const showHide = document.getElementById(id);
    showHide.classList.toggle('d-none', !show);
}