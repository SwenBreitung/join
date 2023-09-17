async function initContacts() {
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