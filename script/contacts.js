/**
 * This Array is used to save the contact infos
 * 
 */
let contactsArray = [];
let nameAbbreviationArray = [];

/**
 * This Array is used to color the profile images
 * 
 */
const colorArray = [
    "#006400", "#00008B", "#8B0000", "#800080", "#808080",
    "#0000CD", "#008000", "#FF0000", "#8A2BE2", "#FFA500",
    "#2E8B57", "#9932CC", "#DC143C", "#228B22", "#20B2AA",
    "#FF1493", "#D2691E", "#00CED1", "#008080", "#FF6347"
];

let colorIndex = 0;
let nextColorIndex = 0;

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
        nextColorIndex = JSON.parse(await getItem('nextColorIndex'));
    } catch (e) {
        console.info('Could not load contacts');
    }
}

/**
 * This function us used to render the contact informations and sort it
 * 
 *
 */
function renderContacts() {
    let userContent = document.getElementById('contactsId');
    userContent.innerHTML = '';
    let previousFirstLetter = '';
    contactsArray.sort((a, b) => a.name.localeCompare(b.name, 'de', { sensitivity: 'base' }));
    nameAbbreviationArray = [];
    pullNameAbbreviation(userContent, previousFirstLetter);
}

/**
 * This function is to create the name abbreviation
 *
 *
 */
function pullNameAbbreviation(userContent, previousFirstLetter) {
    for (let i = 0; i < contactsArray.length; i++) {
        let contact = contactsArray[i];
        // split first and last name
        let nameParts = contact.name.split(' ');
        let firstName = nameParts[0];
        let lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
        // first letter of first name for the category split
        let firstLetter = contact.name.charAt(0).toUpperCase();
        // first letter of first and last name combined
        let nameAbbreviation = `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
        nameAbbreviationArray.push(nameAbbreviation);

        if (firstLetter !== previousFirstLetter) {
            userContent.innerHTML += /* html */
                `<div class="firstLetterOverContact horicontal fontSize20">
                ${firstLetter}
            </div>
            <div class="partingLine">
            </div>
            `;
            previousFirstLetter = firstLetter;
        }

        userContent.innerHTML += loadContactInfos(contact, nameAbbreviation, i);
        addNameAbbreviationInContactsArray();
    }
}

/**
 * This function is used to save the name abbreviation in the contacts array
 * 
 */
function addNameAbbreviationInContactsArray() {
    for (let i = 0; i < contactsArray.length; i++) {
        contactsArray[i].nameAbbreviation = nameAbbreviationArray[i];
    }
}

/**
 * This function us used to display the contact infos 
 * 
 * 
 */
function loadContactInfos(contact, nameAbbreviation, i) {
    return /* html */ `
    <div class="horicontal contactsInfo pointer"
        onclick="openContactBigInfo(contactsArray[${i}], ${i}, '${nameAbbreviation}')">
        <div class="profilePicture horicontalAndVertical" style="background-color: ${contact.color}">
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
 * This function is used to display the adding screen for new contacts
 * 
 */
function addContact() {
    originalFunction();
    originalText();
    document.getElementById('inputNameId').value = '';
    document.getElementById('inputEmailId').value = '';
    document.getElementById('inputPhoneId').value = '';
    toggleVisibility('addContactId', true);
    slide('swipeContactPopupId');
}

/**
 * This function is to save the input in the contact array
 * 
 */
async function createContact() {
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

    closePopup();
    renderContacts();
}

/**
 * This function is used to create the profile image color
 * 
 */
function getColor() {
    if (nextColorIndex >= colorArray.length) {
        nextColorIndex = 0;
    }

    let color = colorArray[nextColorIndex];
    nextColorIndex++;
    setItem('nextColorIndex', JSON.stringify(nextColorIndex));
    return color;
}

/**
 * This function is used to display the contact info in a big container
 * 
 */
//
function openContactBigInfo(contact, i, nameAbbreviation) {
    slide('contactInfoBigId');

    highlightContact(i)

    document.getElementById('profilePictureBigId').innerHTML = /*html*/ `
    <div class="profilePictureBig horicontalAndVertical fontSize47" style="background-color: ${contact.color}">
    ${nameAbbreviation}
    </div>
    `;
    document.getElementById('nameId').innerHTML = /*html*/ `${contact['name']}`;
    document.getElementById('emailId').innerHTML = /*html*/ `<a href="mailto:${contact['email']}">${contact['email']}</a>`;
    document.getElementById('phoneId').innerHTML = /*html*/ `<a class="phoneNumber" href="tel:${contact['phone']}">${contact['phone']}</a>`;

    deleteEditContactAtIndex(i);
}

/**
 * This function is used to highlight the contact which is onclicked
 * 
 */
function highlightContact(i) {
    let highlightContact = document.querySelectorAll('.contactsInfo');
    highlightContact.forEach((highlightContactElement) => {
        highlightContactElement.style.backgroundColor = '';
        highlightContactElement.style.color = '';
    });

    highlightContact[i].style.backgroundColor = '#2A3647';
    highlightContact[i].style.color = 'white';
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
    <div class="editDeleteContact pointer" onclick="editContact(${i})">
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

/**
 * This function is used to edit a contact
 * 
 */
async function editContact(i) {
    slide('swipeContactPopupId');
    toggleVisibility('addContactId', true);

    document.getElementById('inputNameId').value = contactsArray[i]['name'];
    document.getElementById('inputEmailId').value = contactsArray[i]['email'];
    document.getElementById('inputPhoneId').value = contactsArray[i]['phone'];

    changeText();
    changeFunction(i);

    await setItem('contactsArray', JSON.stringify(contactsArray));
    renderContacts();
}

/**
 * This function is used to save the changes by editing a contact
 * 
 */
function saveContact(i) {
    contactsArray[i].name = document.getElementById('inputNameId').value;
    contactsArray[i].email = document.getElementById('inputEmailId').value;
    contactsArray[i].phone = document.getElementById('inputPhoneId').value;

    setItem('contactsArray', JSON.stringify(contactsArray));

    closePopup();
    renderContacts();
}

/**
 * This function is used to change the text in a container
 * 
 */
function changeText() {
    document.querySelector('#editCancelButtonId').textContent = "Delete";
    document.querySelector('#textChangeToEditContactId').textContent = "Edit contact";
    document.querySelector('#textChangeToSaveId').textContent = "Save";
}

/**
 * This function is used to change a function
 * 
 */
function changeFunction(i) {
    const editContactForm = document.getElementById('editContactFormId');
    editContactForm.onsubmit = function () {
        saveContact(i);
        return false;
    };

    const editCancelButton = document.getElementById('editCancelButtonId');
    editCancelButton.onclick = function () {
        deleteContact(i);
    };
}

/**
 * This function is to reset the changeText()
 * 
 */
function originalText() {
    document.querySelector('#editCancelButtonId').textContent = "Cancel";
    document.querySelector('#textChangeToEditContactId').textContent = "Add contact";
    document.querySelector('#textChangeToSaveId').textContent = "Add contact";
}

/**
 * This function is to reset the changeFunction(i)
 * 
 */
function originalFunction() {
    const editContactForm = document.getElementById('editContactFormId');
    editContactForm.onsubmit = function () {
        createContact();
        return false;
    };

    const editCancelButton = document.getElementById('editCancelButtonId');
    editCancelButton.onclick = function () {
        closePopup();
    };
}