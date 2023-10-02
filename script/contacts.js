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
    desktopViewSmall();
    mobileView();
    markCategory();
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
        <spline class="fontSize20">${maxLetters(contact['name'], 19)}</spline>
            <spline class="fontSize16 emailScrollMenu">${maxLetters(contact['email'], 25)}</spline>
    </div>
</div>
    `
}

/**
 * This function is to limit the output letters
 * 
 */
function maxLetters(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + "...";
    } else {
        return text;
    }
}

/**
 * This function is used to display the adding screen for new contacts
 * 
 */
function addContact() {
    resetFunctionImageText();

    showNotOnMobileView('cancelBtnMobileId');
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

    toggleVisibility('mobileBackArrowId', false);
    toggleVisibility('mobileVisibilityId', true);

    closePopup();
    renderContacts();
    changesSaved();
    hoverNewContact(newContact);
}

function hoverNewContact(newContact) {
    const newIndex = contactsArray.findIndex(contact => contact.name === newContact.name);
    openContactBigInfo(newContact, newIndex, newContact['nameAbbreviation']);
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
function openContactBigInfo(contact, i, nameAbbreviation) {
    slide('contactInfoBigId');
    showArrowMobileView();
    changeFunction(i);
    highlightContact(i);

    document.getElementById('profilePictureBigId').innerHTML = contactImage(contact, nameAbbreviation);
    contactDescription(contact);

    changeImage();
    document.getElementById('editMobileButtonId').innerHTML = editContactMobile(i);
    deleteEditContactAtIndex(i);
}

/**
 * This function is used to show the back button on the mobile view
 * 
 */
function showArrowMobileView() {
    showOnMobileView('mobileBackArrowId');
    document.getElementById('mobileVisibilityId').classList.add('mobileContactOverview');

    toggleVisibility('mobileVisibilityId', true);
}

/**
 * This function is used to show the color image on the contact detail view
 * 
 */
function contactImage(contact, nameAbbreviation) {
    return /*html*/ `
<div class="profilePictureBig horicontalAndVertical fontSize47" style="background-color: ${contact.color}" id="nameAbbreviationId">
${nameAbbreviation}
</div>
`;
}

/**
 * This function is used to show the contact description on the detail view
 * 
 */
function contactDescription(contact) {
    document.getElementById('nameId').innerHTML = /*html*/ `${contact['name']}`;
    document.getElementById('emailId').innerHTML = /*html*/ `<a href="mailto:${contact['email']}">${contact['email']}</a>`;
    document.getElementById('phoneId').innerHTML = /*html*/ `<a class="phoneNumber" href="tel:${contact['phone']}">${contact['phone']}</a>`;
}

/**
 * This function is used to display the Edit Button on the mobile view
 * 
 */
function editContactMobile(i) {
    showOnMobileView('cancelBtnMobileId');
    return /* html */ `
<div class="mobileEdit gap8 d-flex padding8 pointer colorOnHover" onclick="editContact(${i})">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <mask id="mask0_89141_3992" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
        width="24" height="24">
        <rect width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_89141_3992)">
        <path
            d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
            fill="#2A3647" />
    </g>
</svg>
<spline class="fontSize16 mobileEditText">Edit</spline>
</div>
`
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
 * This function is used to create a slide in animation
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
}

function closePopupMobile() {
    toggleVisibility('mobileEditDeleteBoxId', false);
    toggleVisibility('mobileBackArrowId', false);
    toggleVisibility('mobileVisibilityId', false);
    resetFunctionImageText();
    let highlightContact = document.querySelectorAll('.contactsInfo');
    highlightContact.forEach((highlightContactElement) => {
        highlightContactElement.style.backgroundColor = '';
        highlightContactElement.style.color = '';
    });
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
    <div class="colorOnHover">
    <div class="editDeleteContact pointer horicontal" onclick="editContact(${i})">

    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <mask id="mask0_87783_3876" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_87783_3876)">
    <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
    </g>
    </svg>

        Edit
    </div>
</div>
<div class="colorOnHover">
    <div class="editDeleteContact pointer horicontal" onclick="deleteContact(${i})">
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <mask id="mask0_87783_4140" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_87783_4140)">
    <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
    </g>
    </svg>
        Delete
    </div>
</div>
    `
}

/**
 * This function is used to delete a contact
 * 
 * 
 */
async function deleteContact(i) {
    changesSaved();
    resetFunctionImageText();
    toggleVisibility('mobileEditDeleteBoxId', false);
    contactsArray.splice(i, 1);
    await setItem('contactsArray', JSON.stringify(contactsArray));
    toggleVisibility('mobileBackArrowId', false);
    toggleVisibility('contactInfoBigId', false);
    toggleVisibility('contactsTitleId', true);
    showNotOnMobileView('mobileVisibilityId');
    toggleVisibility('mobileVisibilityId', false);
    changeButtonTextToDeleted();
    renderContacts();
}

/**
 * This function is used to edit a contact
 * 
 */
async function editContact(i) {
    slide('swipeContactPopupId');
    toggleVisibility('cancelBtnMobileId', true);
    toggleVisibility('addContactId', true);
    toggleVisibility('mobileEditDeleteBoxId', false);

    document.getElementById('inputNameId').value = contactsArray[i]['name'];
    document.getElementById('inputEmailId').value = contactsArray[i]['email'];
    document.getElementById('inputPhoneId').value = contactsArray[i]['phone'];

    changeText();
    changeFunction(i);

    await setItem('contactsArray', JSON.stringify(contactsArray));
    renderContacts();
    highlightContact(i);
}

/**
 * This function is used to save the changes by editing a contact
 * 
 */
function saveContact(i) {
    contactsArray[i].name = document.getElementById('inputNameId').value;
    contactsArray[i].email = document.getElementById('inputEmailId').value;
    contactsArray[i].phone = document.getElementById('inputPhoneId').value;

    contactsArray[i].nameAbbreviation = document.getElementById('nameAbbreviationId').innerHTML;

    setItem('contactsArray', JSON.stringify(contactsArray));

    document.getElementById('nameId').innerHTML = contactsArray[i].name;
    document.getElementById('emailId').innerHTML = contactsArray[i].email;
    document.getElementById('phoneId').innerHTML = contactsArray[i].phone;

    toggleVisibility('contactInfoBigId', false);
    changesSaved();

    resetFunctionImageText();
    changeText();
    toggleVisibility('mobileBackArrowId', false);
    toggleVisibility('contactInfoBigId', false);
    toggleVisibility('contactsTitleId', true);
    toggleVisibility('mobileVisibilityId', false);

    closePopup();
    highlightContact(i);
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
    document.querySelector('#successfullyCreatedId').textContent = "Contact successfully saved";
}

function changeButtonTextToDeleted() {
    document.querySelector('#successfullyCreatedId').textContent = "Contact successfully deleted";
}

/**
 * This function is used to change a function
 * 
 */
function changeFunction(id) {
    const editContactForm = document.getElementById('editContactFormId');
    editContactForm.onsubmit = function () {
        saveContact(id);
        return false;
    };

    const editCancelButton = document.getElementById('editCancelButtonId');
    editCancelButton.onclick = function () {
        deleteContact(id);
    };

    const editAddContactButton = document.getElementById('mobileAddContactId');
    editAddContactButton.onclick = function () {
        openMobileEditMenu(id);
    };
}

/**
 * This function is to change the image on mobile view
 * 
 */
function changeImage() {
    let newImage = './img/more_vert.svg';
    let switchImage = document.querySelector('#mobileAddContactId img');
    switchImage.src = newImage;
}

/**
 * This function is to reset the changeText()
 * 
 */
function originalText() {
    document.querySelector('#editCancelButtonId').textContent = "Cancel";
    document.querySelector('#textChangeToEditContactId').textContent = "Add contact";
    document.querySelector('#textChangeToSaveId').textContent = "Add contact";
    document.querySelector('#successfullyCreatedId').textContent = "Contact successfully created";
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

    const editAddContactButton = document.getElementById('mobileAddContactId');
    editAddContactButton.onclick = function () {
        addContact();
    };
}

/**
 * This function is to reset the changeImage()
 * 
 */
function originalImage() {
    let newImage = './img/person_add.svg';
    let switchImage = document.querySelector('#mobileAddContactId img');
    switchImage.src = newImage;
}

/**
 * This function is used to the edit and delete menu on the mobile view
 * 
 */
function changesSaved() {
    let changesSaved = document.getElementById('successfullyCreatedId');
    changesSaved.classList.remove('d-none');
    slide('successfullyCreatedId');
    setTimeout(function () {
        changesSaved.classList.add('d-none');
    }, 2500);
}

function resetFunctionImageText() {
    originalImage();
    originalText();
    originalFunction();
}

/**
 * This function is used to disable and enable some id's on the mobile view
 * 
 */
function mobileView() {
    const isMobile = window.innerWidth <= 768;

    toggleVisibility('mobileVisibilityId', !isMobile);
    toggleVisibility('btnBackgroundId', !isMobile);
    toggleVisibility('joinLogoAddContactId', !isMobile);
    toggleVisibility('mobileAddContactId', isMobile);
    toggleVisibility('blueLineId', isMobile);
    toggleVisibility('deleteEditId', !isMobile);

    document.getElementById('contactsTitleId').classList.toggle('horicontal', !isMobile);
    document.getElementById('mobileVisibilityId').classList.toggle('mobileEditDeleteBoxId', isMobile);
}

/**
 * This function is used to disable and enable some id's on the mobile view
 * 
 */
function desktopViewSmall() {
    const is1345px = window.innerWidth <= 1345;
    toggleVisibility('blueLineId', is1345px);
}

/**
 * This function is used to show an animation on the menu on the mobile view
 * 
 */
function openMobileEditMenu() {
    slide('mobileEditDeleteBoxId');
}

/**
 * This function is to toggle the visibility (mobile view = yes)
 * 
 */
function showNotOnMobileView(id) {
    if (window.innerWidth <= 700) {
        toggleVisibility(id, false);
    } else {
        toggleVisibility(id, true);
    }
}

/**
 * This function is to toggle the visibility (mobile view = no)
 * 
 */
function showOnMobileView(id) {
    if (window.innerWidth <= 700) {
        toggleVisibility(id, true);
    } else {
        toggleVisibility(id, false);
    }
}