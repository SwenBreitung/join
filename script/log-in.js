let dialog = document.getElementById('dialog');

/**
 * Initializes the application by starting necessary animations, loading the login interface,
 * and loading backend user data. This function is typically called when the application or a particular page is loaded.
 */
function init() {
    // startAnimation();
    loadLogIn();
    // loadBackendUsers();
}


/**
 * Loads the login template into a dialog element.
 * This function is responsible for displaying the login interface to the user.
 */
function loadLogIn() {
    dialog.innerHTML = loadTempleteLogIn();
}


/**
 * Initiates animations on specific elements if the page is accessed directly (without a referrer).
 * It adds an 'animated' class to enable animations and removes 'd-none' to make elements visible.
 */
function startAnimation() {
    document.querySelector('.join-logo-contain').classList.add('animated');
    document.querySelector('.join-logo-contain').classList.remove('d-none');
    document.querySelector('.join-logo').classList.add('animated');
};


/**
 * Redirects the user to the registration page.
 * This function is typically called to navigate the user from the current page to the registration page.
 */
function loadRegister() {
    window.location.href = "./register.html";
}


/**
 * Loads the password reset template into a dialog element.
 * This function is responsible for displaying the password reset interface to the user.
 */
function resetPasswort() {
    dialog.innerHTML = loadTemplateResetPasswort();
}


/**
 * Closes the current dialog and loads the login interface.
 * This function is typically used to switch from the current dialog view (like registration or password reset) back to the login view.
 */
function closeDialog() {
    loadLogIn();
}


/**
 * Handles the login process by checking user credentials against a list of registered users.
 * If a match is found, it stores the user data in local storage and redirects to the summary page.
 * If no match is found, it triggers visual feedback for incorrect credentials.
 */

function login() {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    console.log(username, password, 'username', 'passwort');

    fetch('http://127.0.0.1:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Login failed');
            }
        })
        .then(data => {
            localStorage.setItem('token', data.token); // Speichern des Tokens im LocalStorage
            window.location.href = "/summery.html";
            console.log('korrekt');
        })
        .catch(error => {
            console.error('Login error:', error);
            alert('Falscher Benutzername oder ungültige Anmeldeinformationen.'); // Fehlermeldung für den Benutzer
            return false; // Formular nicht senden
            // Implementieren Sie hier eine Fehlerbehandlung, z. B. eine Meldung für den Benutzer
        });
}
// function login() {
//     event.preventDefault()
//     let email = document.getElementById('email').value;
//     let password = document.getElementById('password').value;
//     console.log(email, password, 'email', 'passwort')
//     fetch('http://127.0.0.1:8000/login/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email: email, password: password }),
//         })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error('Login failed');

//             }

//         })
//         .then(data => {
//             localStorage.setItem('token', data.token); // Speichern des Tokens im LocalStorage
//             window.location.href = "/summery.html";
//             console.log('korrekt')
//         })
//         .catch(error => {
//             console.error('Login error:', error);
//             alert('Falsches Passwort oder ungültige Anmeldeinformationen.'); // Fehlermeldung für den Benutzer
//             // Fügen Sie hier optional weitere Maßnahmen hinzu, z. B. das Zurücksetzen der Eingabefelder
//             return false; // Formular nicht senden
//             // Implementieren Sie hier eine Fehlerbehandlung, z. B. eine Meldung für den Benutzer
//         });

// let email = document.getElementById('email');
// let passwort = document.getElementById('passwort');
// let user = users.find(u => u.email === email.value && u.password === passwort.value);
// if (user) {
//     try {
//         localStorage.removeItem('userData');
//         localStorage.setItem('userData', JSON.stringify(user));
//     } catch (e) {
//         console.error('An error occurred:', e);
//     }
//     userId = user.id;
//     window.location.href = "./summery.html";
// } else {
//     loadRedBorderInput();
//     loadWarningTextTamplate();
// }
// }


/**
 * Facilitates a guest login to the application.
 * This function automatically logs in the first user from the users array as a guest and redirects to the summary page.
 */
function guastLogin() {
    // let userData = users[0];
    localStorage.removeItem('userData');
    localStorage.setItem('userData', JSON.stringify(userData));
    window.location.href = "./summery.html";
}


/**
 * Applies a red border to specific input fields.
 * This function is typically used to visually indicate an error or invalid input in form fields.
 */
function loadRedBorderInput() {
    let inputIds = ["input-email", "input-passwort"];
    for (let id of inputIds) {
        document.getElementById(id).classList.add("red-border");
    }
}


/**
 * Makes warning text elements visible by removing the 'd-none' class.
 * This function is used to display warning messages related to specific form fields, typically for validation purposes.
 */
function loadWarningTextTamplate() {
    let warningIds = ["warning-text-passwort", "warning-text-email"];
    for (let id of warningIds) {
        document.getElementById(id).classList.remove("d-none");
    }
}



function loadTemplateResetPasswort() {
    return /*html*/ `
    <img src="img/arror-left.svg" alt="" onclick="closeDialog()">
    <form action="">
    <h1>I forgot my passwort</h1>
    <span>Don´t worry! We send you an email with the instrctions to reset your passwort.</span>

    <div  class="input-field">
        <input type="text" placeholder="EMail">
            <img src="./img/letter.svg" alt="Bild hinten" class="input-suffix">   
    </div>  
    <button type="button" class="btn btn-dark button" onsubmit>Send new Passwort</button>  
    </form>
    `
}


function loadTempleteLogIn() {
    return /*html*/ `

<div>
    <div class="h1">
        <h1>Log in</h1>
        <div class="underline"></div>
    </div>
   
    <form method="POST" onsubmit="login();" action=""  id="login-form">
        <div class="input-fields">
            <div id="input-email" class="input-field">
                <input id="username" type="name" name="name" placeholder="username" required>
                <img src="./img/letter.svg" alt="Bild hinten" class="input-suffix">
            </div>
            <div class="warning-field">
                <span id="warning-text-email" class="d-none">
                    Bitte gebe die passende E-Mailadresse ein.
                </span>
            </div>
            <div id="input-passwort" class="input-field">
                <input id="password" type="password" name="password" placeholder="Passwort" required>
                <img src="./img/lock.svg" alt="Bild hinten" class="input-suffix">
            </div>
            <div class="warning-field">
                <span id="warning-text-passwort" class="d-none">
                    Bitte gebe das passende Passwort ein.
                </span>
            </div>
        </div>

        <div class="buttons">
            <button type="submit" class="btn btn-dark button button-log-in">Log in</button>
            <button type="button" onclick="guastLogin()" class="btn btn-dark button-guest-login">Guest Log in</button>
        </div>
    </form>
</div>



         <!-- <div>
                <div class="h1">
                    <h1>Log in</h1>
                    <div class="underline"></div>
                </div>
                <div  class="input-fields">
                    <div id="input-email" class="input-field ">
                        <input id="email" type="text" placeholder="EMail">
                        <img src="./img/letter.svg" alt="Bild hinten" class="input-suffix">
                    </div>
                    <div class="warning-field">
                    <span id="warning-text-email" class="d-none">
                    Bitte gebe die passende E-Mailadresse ein.
                    </span>
                    </div>
                    <div id="input-passwort" class="input-field">
                        <input id="passwort" type="text" placeholder="passwort">
                        <img src="./img/lock.svg" alt="Bild hinten" class="input-suffix">
                    </div>
                    <div class="warning-field">
                    <span id="warning-text-passwort" class="d-none">
                    Bitte gebe das passende Passwort ein.
                    </span>
                    </div>
                </div>

                <div class="buttons">
                    <button onclick="login()" type="button" class="btn btn-dark button button-log-in">Log in</button>
                    <button onclick="guastLogin()" type="button" class="btn btn-dark button-guest-login">Guest Log in</button>
                </div>
            </div> -->
    `
}