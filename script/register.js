let registerBtn = document.getElementById('registerBtn');
let checkbox = document.getElementById("myCheckbox");

/**
 * Initializes the application by loading backend user data.
 * This function is typically called when the application or a particular page is loaded.
 */
async function init() {
    // loadBackendUsers();
    // fetch(`${STORAGE_URL}api/get-token/`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             // Füge erforderliche Authentifizierungsköpfe hinzu, falls nötig
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Token:', data.token);
    //     })
    //     .catch(error => console.error('Fehler beim Abrufen des Tokens:', error));
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
    event.preventDefault();
    const csrftoken = getCookie('csrftoken'); // Das CSRF-Token aus dem Cookie holen
    const data = {
        username: document.getElementById('userName').value,
        password: document.getElementById('password').value,
        password2: document.getElementById('password').value,
        email: document.getElementById('email').value,
    };

    fetch('http://127.0.0.1:8000/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken, // Das Token im Request-Header mitsenden
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    const formData = {
        username: document.getElementById('userName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        password2: document.getElementById('password2').value,
    };

    // fetch('/api/register/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(formData)
    //     })
    //     .then(response => {
    //         if (response.ok) {
    //             return response.json();
    //         }
    //         throw new Error('Etwas ist schief gelaufen bei der Registrierung!');
    //     })
    //     .then(data => {
    //         console.log('Erfolgreich registriert:', data);
    //         // Weiterleitung oder weitere Aktionen nach erfolgreicher Registrierung
    //     })
    //     .catch(error => {
    //         console.error('Registrierungsfehler:', error);
    //     });

    // registerBtn.disabled = true;
    // const newUser = createUser();
    // await saveUser(newUser);
    // resetForm();
    // window.location = 'index.html';
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



function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

// fetch('/register/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrftoken,
//         },
//         body: JSON.stringify({ yourData: 'yourValue' })
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });