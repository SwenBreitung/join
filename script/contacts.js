/**
 * This Array is used to save the contact infos
 * 
 */
let contactsArray = [];

/**
 * This function is to load functions at start
 * 
 */
async function initContacts() {
    closePopup();
    await loadContacts();
    renderContacts();
}

async function loadContacts() {
    try {
        contactsArray = JSON.parse(await getItem('contactsArray'));
    } catch (e) {
        console.info('Could not load contacts');
    }
}

/**
 * This function us used to ...
 * ... pull the users JSON Array (names/emails)
 * ... pull the first letter from every user
 * ... sort alphabetically
 */
function renderContacts() {
    let userContent = document.getElementById('contactsId');
    userContent.innerHTML = '';
    let previousFirstLetter = '';
    contactsArray.sort((a, b) => a.name.localeCompare(b.name, 'de', { sensitivity: 'base' }));

    for (let i = 0; i < contactsArray.length; i++) {
        const contact = contactsArray[i];
        const firstLetter = contact.name.charAt(0).toUpperCase();

        if (firstLetter !== previousFirstLetter) {
            userContent.innerHTML += /* html */
                `<div class="firstLetterOverContact horicontal">
                ${firstLetter}
            </div>
            <div class="partingLine">
            </div>
            `;
            previousFirstLetter = firstLetter;
        }

        userContent.innerHTML += loadContactInfos(contact, firstLetter, i);
    }
}

/**
 * This function us used to display the contact infos 
 * 
 * 
 */
function loadContactInfos(contact, firstLetter, i) {
    return /* html */ `
    <div class="horicontal contactsInfo pointer" onclick="openContactBigInfo(contactsArray[${i}])">
        <div class="profilePicture horicontalAndVertical" style="background-color: ${getRandomColor()}">
            ${firstLetter}
        </div>
        <div>
            <h5>${contact['name']}</h5>
            <h6>${contact['email']}</h6>
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

/**
 * This function is to save the input in the contact array
 * 
 */
async function createContact() {
    const contactName = document.getElementById('inputNameId').value;
    const contactEmail = document.getElementById('inputEmailId').value;
    const contactPhone = document.getElementById('inputPhoneId').value;

    const newContact = {
        "name": contactName,
        "email": contactEmail,
        "phone": contactPhone
    };

    contactsArray.push(newContact);
    await setItem('contactsArray', JSON.stringify(contactsArray));
    closePopup();
    renderContacts();
}

/**
 * This function is used to ...
 * ... display the contact info in a big container
 * ... create a animation
 */
function openContactBigInfo(contact) {
    toggleVisibility('contactInfoBigId', true);
    document.getElementById('contactInfoBigId').classList.remove('slide-in');
    setTimeout(function () {
        document.getElementById('contactInfoBigId').classList.add('slide-in');
        document.getElementById('nameId').innerHTML = /* html */ `${contact['name']}`;
        document.getElementById('emailId').innerHTML = /* html */ `${contact['email']}`;
        document.getElementById('phoneId').innerHTML = /* html */ `${contact['phone']}`;
    }, 1);
}


/**
 * This function is used to close the popup window
 * 
 */
function closePopup() {
    toggleVisibility('addContactId', false);
    toggleVisibility('contactInfoBigId', false);
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

function filter(letter) {
    insertConent(letter);
}