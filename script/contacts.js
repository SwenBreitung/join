/**
 * This Array is used to save the contact infos
 * 
 */
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


function loadSvgS() {
    loadPenSvgTamplate();
    loadTaskDeleteTamplate();
}

function loadPenSvgTamplate() {
    document.getElementById('pen-svg').innerHTML = loadPenSvgBlack();
}

function loadTaskDeleteTamplate() {
    document.getElementById('delete-svg').innerHTML = loadTaskDelete()
}


/**
 * This function us used to render the contact informations and sort it
 * 
 *
 */
function renderContacts() {
    // if (userData && Array.isArray(userData['contacts'])) {
    //     contactsArray = userData['contacts'];
    // }
    let userContent = document.getElementById('contactsId');
    userContent.innerHTML = '';

    let previousFirstLetter = '';
    contacts.sort((a, b) => a.name.localeCompare(b.name, 'de', { sensitivity: 'base' }));
    // nameAbbreviationArray = [];
    renderContactsAndInitials(userContent, previousFirstLetter);
}

// /**
//  * This function is used to save the name abbreviation in the contacts array
//  * 
//  */
// function addNameAbbreviationInContactsArray() {
//     for (let i = 0; i < contacts.length; i++) {
//         contacts[i].nameAbbreviation = nameAbbreviationArray[i];
//     }
// }
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
 * This function us used to display the contact infos 
 * 
 * 
 */
function loadContactInfos(contact, id, initials) {
    document.querySelector('.contacts-info-panel').style.display = 'block';
    let userContactInfos = document.getElementById('contactInfo');
    userContactInfos.innerHTML = loadcontactsInfoTamplate(contact, id, initials);
    loadSvgS();
}

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
            <span class="contact-name">${contact['name']}</span>  

            <div class="d-flex">        
                <div  class="d-flex" onclick="deleteContact(${id})">
                    <div id="delete-svg"></div>
                    <div id="delete">delete</div>   
                </div>
                <div class="d-flex" onclick="editContact(${id})">
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
                <span class="fontSize16 emailScrollMenu">${contact['email']}</span>       
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




function closeAddContact() {
    document.getElementById('add-contact').classList.add('d-none');
};


document.getElementById('add-new-contacts').addEventListener('click', function() {
    renderAddContact('<div class="profile-picture-list p-40 margin" style="background-color: white;"><img style="height: 56px" src="img/person-white.svg" alt=""></div>');
    document.getElementById('add-contact').classList.remove('d-none');
});


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

 <form onsubmit="saveNewContact()"return false; class=" contact-add-input-picture d-flex"  action="">
     <!-- <div class="profile-picture-list p-40 margin">profielbild</div> -->
     ${img}
     <div class="flex-column d-flex contact-add-inputarea">
         <div class="p-70"></div>
         <input  required  type="text" placeholder="Name" id="contact-add-name" pattern="[A-Za-z ]+" title="Nur Buchstaben und Leerzeichen erlaubt">
         <input  required type="email" placeholder="EMail" id="contact-add-email" title="Bitte eine passende Email adresse angeben">
         <input  required type="text" placeholder="Phone" id="contact-add-phone" pattern="\+?[0-9]+" title="Nur Zahlen und ein optionales Plus-Zeichen am Anfang">
         <div class="p-40"></div>
         <div class="btnBackground">
             <button type="button" onclick="cancelAddNewContact()" class=" cancel-btn">Cancel</button>
             <!-- <div style="padding: 15px;"></div> -->
             <button  type="submit" class="addNewContactButton add-contact-btn">Add Contact</button>
         </div>
     </div>
     <div class="close-btn" onclick="closeAddContact()" id="close-btn">X</div>
</form>

`)
}

function cancelAddNewContact() {
    document.getElementById('add-contact').classList.add('d-none');
}

function saveNewContact() {
    newContact.name = document.getElementById('contact-add-name').value
    newContact.email = document.getElementById('contact-add-email').value
    newContact.phone = document.getElementById('contact-add-phone').value
    newContact.id = contacts.length + 1;
    newContact.color = generateBackgroundColor();

    contacts.push(newContact);
    document.getElementById('add-contact').classList.add('d-none');
}

function deleteContact(id) {
    contacts.splice(id, 1);
    renderContacts();
    document.getElementById('contactInfo').innerHTML = "";

}


function editContact(id) {
    document.getElementById('add-contact').innerHTML = loadcontactsEditTamplate(contacts[id], extractInitials(contacts[id].name));
    document.getElementById('add-contact').classList.remove('d-none');
    loadSvgS();
}

function saveEditContacts(id) {
    let name = document.getElementById('contact-add-name').value
    let email = document.getElementById('contact-add-email').value
    let phone = document.getElementById('contact-add-phone').value

    contacts[id].name = name;
    contacts[id].email = email;
    contacts[id].phone = phone;
    setItem('contacts', JSON.stringify(contacts));
    document.getElementById('contactInfo').innerHTML = "";
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
             <button class=" cancel-btn">Cancel</button>
             <div style="padding: 15px;"></div>
             <button onclick="saveEditContacts(${contact.id})" class="addNewContactButton edit-contact-btn">Edit Contact</button>
         </div>
     </div>
     <div class="close-btn" onclick="closeAddContact()" id="close-btn">X</div>
 </div>

`)
}