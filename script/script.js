// let tasks = [];
let userData = [];
let userId;
let moduloColor = 0;


function generateBackgroundColor() {
    let i = moduloColor % colorArray.length
    moduloColor++;
    return colorArray[i];
}


function loadUserDataFromLocalStorage() {
    userData = localStorage.getItem('user');
    if (userData) {
        userData = JSON.parse(userData);
    } else {
        return null; // oder einen anderen Standardwert, je nachdem, was für Ihre Anwendung sinnvoll ist
    }
}

function closeDialog() {
    document.getElementById('dialog-full').classList.add('d-none');
}

function extractInitials(text) {
    text = text.trim();

    // Find space and extract the first letter and the letter after the space
    let index = text.indexOf(' ');
    if (index !== -1 && index < text.length - 1) {
        let firstLetter = text.charAt(0).toUpperCase();
        let letterAfterSpace = text.charAt(index + 1).toUpperCase();

        console.log(firstLetter + letterAfterSpace);
        return firstLetter + letterAfterSpace;
    } else if (text.length > 1) { // Check if there are at least two characters in the name
        console.log(text.charAt(0).toUpperCase() + text.charAt(1).toUpperCase());
        return text.charAt(0).toUpperCase() + text.charAt(1).toUpperCase();
    } else if (text.length === 1) {
        console.log(text.charAt(0).toUpperCase());
        return text.charAt(0).toUpperCase();
    } else {
        console.log('Empty text provided.');
        return ''; // or return null, depending on your preference
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

        // Use extractInitials function to get the initials
        let nameAbbreviation = extractInitials(contact.name);
        // nameAbbreviationArray.push(nameAbbreviation);

        // First letter of the name for category split
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


// async function loadTasks() {
//     try {
//         tasks = JSON.parse(await getItem('tasks'));
//         updateBoardHTML();
//     } catch (e) {
//         console.info('Could not load tasks');
//     }
// }