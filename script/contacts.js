let contactsArray = [];
let colorIndex = 0;
let nextColorIndex = 0;

/**
 * This function is to load functions at start
 * 
 */
async function initContacts() {
    await loadContactsFromBackend();
    renderContacts();
    await includeHTML();
    await loadUserDataFromLocalStorage();
    await loadHeadImg()
    highlightCurrentPageInHeader('contacts-sidebar');
}


/**
 * Loads SVG templates for specific UI elements. 
 * This function calls other functions responsible for loading individual SVG templates.
 */
function loadSvgS() {
    loadPenSvgTamplate();
    loadTaskDeleteTamplate();
}


/**
 * Loads the pen SVG template into a specific HTML element. 
 * It sets the innerHTML of the element with the ID 'pen-svg' to the content returned by `loadPenSvgBlack()`.
 */
function loadPenSvgTamplate() {
    document.getElementById('pen-svg').innerHTML = loadPenSvgBlack();
}


/**
 * Loads the task delete SVG template into a specific HTML element.
 * This function sets the innerHTML of the element with the ID 'delete-svg' to the content returned by `loadTaskDelete()`.
 */
function loadTaskDeleteTamplate() {
    document.getElementById('delete-svg').innerHTML = loadTaskDelete()
}


/**
 * This function us used to render the contact informations and sort it
 * 
 *
 */
async function renderContacts() {
    let userContent = document.getElementById('contactsId');
    userContent.innerHTML = '';
    let previousFirstLetter = '';
    contacts.sort((a, b) => a.name.localeCompare(b.name, 'de', { sensitivity: 'base' }));
    resetId(contacts)
    renderContactsAndInitials(userContent, previousFirstLetter);
}


/*
 * This function us used to display the contact infos 
 * 
 * 
 */
function loadContactData(contact, nameAbbreviation, i) {
    return /* html */ `
    <div class="contactsInfo" id="contact${i}" onclick="loadContactInfos(contacts[${i}], ${i}, '${nameAbbreviation}')">
    <div class="profile-picture-list" style="background-color: ${contact.color}">
        <span class="fontSize12">
            ${nameAbbreviation}
        </span>
    </div>
    <div class="column">
        <span class="fontSize20">${contact['name']}</span>    
        <a href="#" class="fontSize16 emailScrollMenu">${contact['email']}</a>
    </div>
</div>
    `
}


/**
 * Toggles the visibility of contact information in the user interface.
 * This is achieved by adding or removing the 'active' class from the element with the class 'contact-info'.
 */
function toggleContactInfo() {
    var contactInfo = document.querySelector('.contact-info');
    contactInfo.classList.toggle('active');
}

// animation----------------------------
/**
 * This function us used to display the contact infos 
 */
function loadContactInfos(contact, id, initials) {
    resetHighlight();
    let currentContactName = document.getElementById('contact-name');

    if (currentContactName && currentContactName.textContent !== contact['name']) {
        changeContactInfo(contact, id, initials);
        contactsColor(id)
    } else if (!currentContactName) {
        displayNewContactInfo(contact, id, initials);
        contactsColor(id)
    } else {
        toggleContactInfoAnimation(id);
    }
}

function resetHighlight() {
    for (let i = 0; i < contacts.length; i++) {
        const element = document.getElementById(`contact${i}`);
        element.classList.remove('defaultStyle');

        const spans = element.querySelectorAll('span');
        spans.forEach(span => span.classList.remove('customTextColor'));
        const profilePictureList = element.querySelector('.profile-picture-list');
        if (profilePictureList) {
            profilePictureList.classList.remove('highlightedProfilePicture');
        }
    }
}


function contactsColor(id) {
    let contact = document.getElementById(`contact${id}`);
    contact.classList.add('defaultStyle'); // Fügt die Klasse für den Hintergrund hinzu

    contact.querySelectorAll('span').forEach(span => {
        span.classList.add('customTextColor'); // Fügt die Klasse für die Textfarbe hinzu
    });

    const firstProfilePictureDiv = contact.querySelector('div.profile-picture-list');
    if (firstProfilePictureDiv) {
        firstProfilePictureDiv.classList.add('highlightedProfilePicture'); // Fügt die Klasse für die Umrandung hinzu
    }
}


/**
 * Changes the content of the contact information display. 
 * It applies an animation for the transition by using 'slide-out' and 'slide-in' classes.
 * @param {Object} contact - The new contact information to display.
 * @param {number|string} id - The ID associated with the contact.
 * @param {string} initials - The initials of the contact.
 */
function changeContactInfo(contact, id, initials) {
    let userContactInfos = document.getElementById('contactInfo');
    userContactInfos.classList.add('slide-out');
    setTimeout(() => {
        updateContactInfoContent(userContactInfos, contact, id, initials);
        userContactInfos.classList.remove('slide-out');
        userContactInfos.classList.add('slide-in');
    }, 500);
}


/**
 * Changes the content of the contact information display. 
 * It applies an animation for the transition by using 'slide-out' and 'slide-in' classes.
 * @param {Object} contact - The new contact information to display.
 * @param {number|string} id - The ID associated with the contact.
 * @param {string} initials - The initials of the contact.
 */
function displayNewContactInfo(contact, id, initials) {
    let userContactInfos = document.getElementById('contactInfo');
    let contactInfoPanel = document.querySelector('.contacts-info-panel');
    updateContactInfoContent(userContactInfos, contact, id, initials);
    contactInfoPanel.style.display = 'block';
    userContactInfos.classList.add('slide-in');
}


/**
 * Toggles the animation state of the contact information display.
 * Depending on its current state, it switches between 'slide-in' and 'slide-out' animations.
 */
function toggleContactInfoAnimation(id) {
    let userContactInfos = document.getElementById('contactInfo');
    if (userContactInfos.classList.contains('slide-out')) {
        userContactInfos.classList.remove('slide-out');
        userContactInfos.classList.add('slide-in');
        contactsColor(id)
    } else if (userContactInfos.classList.contains('slide-in')) {
        userContactInfos.classList.remove('slide-in');
        userContactInfos.classList.add('slide-out');
    }
}


/**
 * Updates the content of a given element with new contact information.
 * It sets the inner HTML of the element to the content generated by `loadcontactsInfoTamplate`,
 * and then calls `loadSvgS` to load any necessary SVGs.
 * @param {HTMLElement} element - The DOM element to be updated with new contact information.
 * @param {Object} contact - The new contact information to display.
 * @param {number|string} id - The ID associated with the contact.
 * @param {string} initials - The initials of the contact.
 */
function updateContactInfoContent(element, contact, id, initials) {
    element.innerHTML = loadcontactsInfoTamplate(contact, id, initials);
    loadSvgS();
}

// animation END----------------------------

/**
 * Closes the contact information panel. It hides the panel and clears its content.
 * This function is typically used to reset the state of the contact info display when it is no longer needed.
 */
function closeContactInfos() {
    document.querySelector('.contacts-info-panel').style.display = 'none';
    let userContactInfos = document.getElementById('contactInfo');
    userContactInfos.innerHTML = "";
}


function loadcontactsInfoTamplate(contact, id, initials) {
    return /* html */ `
    <div class="contacts-info">
        <div class="contact-header">        
                <div class="profile-picture" style="background-color: ${contact.color}">
                <spline class="fontSize12"><b>${initials}</b></spline>        
                </div> 
        <div>
            <span id="contact-name" class="contact-name">${contact['name']}</span>  

            <div class="d-flex">        
                <div  class="d-flex cursor-pointer" onclick="deleteContact(${id})">
                    <div id="delete-svg"></div>
                    <div id="delete">delete</div>   
                </div>
                <div class="d-flex cursor-pointer" onclick="editContact(${id})">
                    <div id="pen-svg"></div>
                    <div id="edit">edit</div>
                </div>  
            </div> 
        </div>
            </div>
          
        </div>
        
    </div>
    <div class="column">
        
        <div class="contact-information">
            <h2>Contact Information</h2>
            <div class="d-flex flex-column">        
                <span><b>Email</b></span> 
               <a href="#" class="fontSize16 emailScrollMenu">${contact['email']}</a>       
            </div>
            <div class="d-flex flex-column">
                <span><b>Phone</b></span>
                <span>${contact['phone']}</span>
            </div>
        </div>
    </div>
</div> 
`
}


/**
 * Closes the 'add contact' interface element by adding the 'd-none' class.
 * This function is typically used to hide the element responsible for adding new contacts in the user interface.
 */
function closeAddContact() {
    document.getElementById('add-contact').classList.add('d-none');
};


document.getElementById('add-new-contacts').addEventListener('click', function() {
    renderAddContact('<div class="profile-picture-list p-40 margin" style="background-color: white;"><img style="height: 56px" src="img/person-white.svg" alt=""></div>');
    document.getElementById('add-contact').classList.remove('d-none');
    addInputRestriction()
});


/**
 * Renders the add contact interface with a given image.
 * It updates the inner HTML of the element with ID 'add-contact' using a template function.
 * @param {string} img - HTML string representing an image to be included in the add contact interface.
 */
function renderAddContact(img) {
    document.getElementById('add-contact').innerHTML = renderAddContactTemplate(img);
}


function renderAddContactTemplate(img) {
    return ( /*html*/ `

<div class="header-contact-addet ">
     <img src="img/join.logo-white.svg" alt="logo">
     <div class="d-flex flex-column">
         <h1>Add Contacts</h1>
         <div>Better with a Team</div>
         <div class="contacts-line-vertikal"></div>
     </div>
 </div>

 <form onsubmit="saveNewContact()"return false; class="contact-add-input-picture d-flex"  action="">
     ${img}
     <div class="flex-column d-flex contact-add-inputarea">
         <div class="p-70"></div>
         <input  required  type="text" placeholder="Name" id="contact-add-name" pattern="[A-Za-z ]+" title="Nur Buchstaben und Leerzeichen erlaubt">
         <input  required type="email" placeholder="EMail" id="contact-add-email" title="Bitte eine passende Email adresse angeben">
         <input required type="tel" placeholder="Telefonnummer" id="contact-add-phone">
         <div class="p-40"></div>
         <div class="btnBackground">
             <button type="button" onclick="cancelAddNewContact()" class=" cancel-btn">Cancel</button>
             <button  type="submit" class="addNewContactButton add-contact-btn">Add Contact</button>
         </div>
     </div>
     <div class="close-btn" onclick="closeAddContact()" id="close-btn">X</div>
</form>

`)

}


/**
 * Hides the 'add contact' interface element by adding the 'd-none' class.
 * This function is typically used to cancel the process of adding a new contact in the user interface.
 */
function cancelAddNewContact() {
    document.getElementById('add-contact').classList.add('d-none');
}


/**
 * Saves the new contact information entered by the user.
 * It extracts values from form inputs, assigns them to a new contact object, and then adds the contact to the contacts array.
 * Finally, it hides the add contact form.
 */
async function saveNewContact() {
    newContact.name = document.getElementById('contact-add-name').value
    newContact.email = document.getElementById('contact-add-email').value
    newContact.phone = document.getElementById('contact-add-phone').value
    newContact.id = contacts.length + 1;
    newContact.color = generateBackgroundColor();

    contacts.push(newContact);
    await saveContactsDataToBakcend()
    await renderContacts();
    document.getElementById('add-contact').classList.add('d-none');
}


/**
 * Deletes a contact from the contacts array based on the provided ID.
 * After deleting the contact, it re-renders the contacts list and clears the contact information display.
 * @param {number} id - The ID of the contact to be deleted.
 */
async function deleteContact(id) {
    contacts.splice(id, 1);
    await saveContactsDataToBakcend()
    renderContacts();
    document.getElementById('contactInfo').innerHTML = "";
}


/**
 * Prepares and displays the interface for editing a contact. 
 * It loads a contact editing template with the details of the selected contact and makes the editing interface visible.
 * Additionally, it calls a function to load any required SVGs.
 * @param {number} id - The ID or index of the contact to be edited in the contacts array.
 */
function editContact(id) {
    document.getElementById('add-contact').innerHTML = loadcontactsEditTamplate(contacts[id], extractInitials(contacts[id].name));
    document.getElementById('add-contact').classList.remove('d-none');
    loadSvgS();
    addInputRestriction();
}


/**
 * Saves the edited contact information back to the contacts array.
 * It updates the specific contact's details in the array and stores the updated array in local storage.
 * Also clears the contact information display area after saving.
 * @param {number} id - The ID or index of the contact in the contacts array to be updated.
 */
function saveEditContacts(id) {
    let name = document.getElementById('contact-add-name').value
    let email = document.getElementById('contact-add-email').value
    let phone = document.getElementById('contact-add-phone').value

    contacts[id].name = name;
    contacts[id].email = email;
    contacts[id].phone = phone;
    setItem('contacts', JSON.stringify(contacts));
    document.getElementById('contactInfo').innerHTML = "";
    document.getElementById('add-contact').classList.add('d-none')
    renderContacts();
}



function loadcontactsEditTamplate(contact, initials) {
    return ( /*html*/ `
<div class="header-contact-addet ">
     <img src="img/join.logo-white.svg" alt="logo">
     <div class="d-flex flex-column">
         <h1>Edit Contacts</h1>
         <div>Better with a Team</div>
         <div class="contacts-line-vertikal"></div>
     </div>
 </div>

 <div class=" contact-add-input-picture d-flex ">
     <div style="background-color: ${contact.color}" class="profile-picture-list p-40 margin">${initials}</div>
     <div class="flex-column d-flex contact-add-inputarea">
         <div class="p-70"></div>
         <input type="text" value="${contact.name}" id="contact-add-name">
        <input type="text" value="${contact.email}" id="contact-add-email">
        <input type="text" value="${contact.phone}" id="contact-add-phone">
         <div class="p-40"></div>
         <div class="btnBackground">
             <button onclick="closeAddContact()" class=" cancel-btn">Cancel</button>
             <div style="padding: 15px;"></div>
             <button onclick="saveEditContacts(${contact.id})" class="addNewContactButton edit-contact-btn">Edit Contact</button>
         </div>
     </div>
     <div class="close-btn" onclick="closeAddContact()" id="close-btn">X</div>
 </div>

`)
}

function addInputRestriction() {
    const phoneInput = document.getElementById('contact-add-phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            const value = e.target.value;
            const validPattern = /^\+?\d*$/;
            if (validPattern.test(value)) {
                e.target.style.borderColor = '#D1D1D1';
            } else {
                e.target.style.borderColor = 'red';
            }
        });
    }
}