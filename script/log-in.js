let dialog = document.getElementById('dialog');

function loadRegister() {
    window.location.href = "./register.html";
}


function resetPasswort() {
    dialog.innerHTML = loadTemplateResetPasswort();
}


function login() {
    let email = document.getElementById('email');
    let passwort = document.getElementById('passwort');
    let user = users.find(u => u.email === email.value && u.password === passwort.value);
    console.log(user);
    if (user) {
        console.log('Registriere dich bitte');
    } else {
        console.log('Herzlich willkommen');
    }
}


function loadTemplateResetPasswort() {
    return `
    <h1>I forgot my passwort</h1>
    <span>Don´t worry! We send you an email with the instrctions to reset your passwort.</span>

    <div class="input-field">
        <input type="text" placeholder="EMail">
            <img src="./img/letter.svg" alt="Bild hinten" class="input-suffix">
    </div>  
    `
}