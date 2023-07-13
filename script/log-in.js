let dialog = document.getElementById('dialog');

function loadRegister() {
    window.location.href = "./register.html";
}


function resetPasswort() {
    dialog.innerHTML = loadTemplateResetPasswort();
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

function login() {
    for (let i = 0; i < user.length; i++) {
        const element = user[i];
        if (email.value == element['name'] && passwort.value == element['passwort']) {

        }
    }

}