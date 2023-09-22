/**
 * This Array is used to save the contact infos
 * 
 */
let contactsArray = [];

const colorArray = [
    "#00008B", "#006400", "#8B0000", "#800080", "#808080",
    "#0000CD", "#008000", "#FF0000", "#8A2BE2", "#FFA500",
    "#2E8B57", "#9932CC", "#DC143C", "#228B22", "#20B2AA"
];

let colorIndex = 0;
/**
 * This function is to load functions at start
 * 
 */
async function initContacts() {
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
    <div class="horicontal contactsInfo pointer" onclick="openContactBigInfo(contactsArray[${i}], ${i}, '${firstLetter}')">
        <div class="profilePicture horicontalAndVertical" style="background-color: ${contact.color}">
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
function getColor() {
    const color = colorArray[colorIndex];
    colorIndex = (colorIndex + 1) % colorArray.length; // Zirkulieren Sie durch die vordefinierten Farben
    return color;
}

function addContact() {
    unloadScrollBars();
    toggleVisibility('addContactId', true);
    slide('swipeContactPopupId');
    setTimeout(function () {
        reloadScrollBars();
    }, 500);
}



function reloadScrollBars() {
    document.documentElement.style.overflow = 'auto';
    document.body.scroll = "yes";
}

function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
}

/**
 * This function is to save the input in the contact array
 * 
 */
async function createContact() {
    const newContact = {
        "name": document.getElementById('inputNameId').value,
        "email": document.getElementById('inputEmailId').value,
        "phone": document.getElementById('inputPhoneId').value,
        "color": getColor()
    }

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
//
function openContactBigInfo(contact, i, firstLetter) {

    slide('contactInfoBigId');

    // setTimeout(function () {
    //     reloadScrollBars();
    // }, 500)

    document.getElementById('profilePictureBigId').innerHTML = /* html */ `
    <div class="profilePictureBig horicontalAndVertical" style="background-color: ${contact.color}">
    ${firstLetter}
    </div>
    `;
    document.getElementById('nameId').innerHTML = /* html */ `<b>${contact['name']}</b>`;
    document.getElementById('emailId').innerHTML = /* html */ `${contact['email']}`;
    document.getElementById('phoneId').innerHTML = /* html */ `${contact['phone']}`;

    deleteEditContactAtIndex(i);
}


/**
 * This function is used to create a slide animation
 * 
 */
function slide(id) {
    toggleVisibility(id, true);
    document.getElementById(id).classList.remove('slide-in');
    document.getElementById(id).offsetHeight;
    document.getElementById(id).classList.add('slide-in');
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


/**
 * This function is used to pull the index from the contact and give it to the onclicked person
 * 
 * 
 */
function deleteEditContactAtIndex(i) {
    let deleteContact = document.getElementById('deleteEditId');
    deleteContact.innerHTML = /* html */ `
    <div class="editDeleteContact pointer">
        <img src="./img/PenAddTask 1=edit.svg">
        Edit
    </div>
    <div class="editDeleteContact pointer" onclick="deleteContact(${i})">
        <img src="./img/subTaskDelete.svg">
        Delete
    </div>
    `
}

/**
 * This function is used to delete a contact
 * 
 * 
 */
async function deleteContact(position) {
    contactsArray.splice(position, 1);
    await setItem('contactsArray', JSON.stringify(contactsArray));
    toggleVisibility('contactInfoBigId', false);
    renderContacts();
}
