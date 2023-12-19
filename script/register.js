let registerBtn = document.getElementById('registerBtn');
let checkbox = document.getElementById("myCheckbox");

/**
 * Initializes the application by loading backend user data.
 * This function is typically called when the application or a particular page is loaded.
 */
async function init() {
    loadBackendUsers();
}


/**
 * Loads data from a specified key in local storage and assigns it to a variable.
 * This function is typically used to retrieve and assign data from local storage to a variable in the application.
 *
 * @param {string} key - The key under which the data is stored in local storage.
 */
async function loadBackendData(key) {
    try {
        users = JSON.parse(await getItem(key));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * Handles the user registration process:
 * 1. Checks if a checkbox is checked; if not, registration is aborted.
 * 2. Disables the registration button to prevent multiple submissions.
 * 3. Creates a new user.
 * 4. Saves the new user's data.
 * 5. Resets the registration form.
 * 6. Redirects the user to the 'index.html' page upon successful registration.
 */
async function register() {
    if (!checkbox.checked) return;
    registerBtn.disabled = true;
    const newUser = createUser();
    await saveUser(newUser);
    resetForm();
    window.location = 'index.html';
}


/**
 * Creates a new user object based on user input and generates a background color for the user.
 *
 * @returns {Object} - A new user object with the following properties:
 */
function createUser() {
    let user = {
        id: users.length.toString(),
        name: userName.value,
        email: email.value,
        password: password.value,
        color: generateBackgroundColor(),
        tasks: [],
        contacts: []
    };
    users.push(user);
    return user;
}


/**
 * Saves a user object to local storage by updating the 'users' data.
 *
 * @param {Object} user - The user object to be saved.
 */
async function saveUser(user) {
    await setItem('users', JSON.stringify(users));
}


/**
 * Resets the registration form by clearing the email and password fields and enabling the registration button.
 */
function resetForm() {
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
}