let dialog = document.getElementById('dialog');


function init() {
    loadLogIn();
}


function loadLogIn() {
    dialog.innerHTML = loadTempleteLogIn();
}


function loadRegister() {
    window.location.href = "./register.html";
}


function resetPasswort() {
    dialog.innerHTML = loadTemplateResetPasswort();
}


function closeDialog() {
    loadLogIn();
}


function login() {
    let email = document.getElementById('email');
    let passwort = document.getElementById('passwort');
    let user = users.find(u => u.email === email.value && u.password === passwort.value);
    console.log(user);
    if (user) {
        window.location.href = "./summery.html";
    } else {
        console.log('Registriere dich bitte');
    }
}


function loadTemplateResetPasswort() {
    return /*html*/ `
    <img src="img/arror-left.svg" alt="" onclick="closeDialog()">
    <form action="">
    <h1>I forgot my passwort</h1>
    <span>Don´t worry! We send you an email with the instrctions to reset your passwort.</span>

    <div class="input-field">
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
                <div class="input-fields">
                    <div class="input-field">
                        <input id="email" type="text" placeholder="EMail">
                        <img src="./img/letter.svg" alt="Bild hinten" class="input-suffix">
                    </div>

                    <div class="input-field">
                        <input id="passwort" type="text" placeholder="passwort">
                        <img src="./img/lock.svg" alt="Bild hinten" class="input-suffix">
                    </div>

                </div>

                <div class="checkbox">
                    <input type="checkbox" name="myCheckbox" id="myCheckbox">
                    <label for="myCheckbox">Remember me</label>
                    <a onclick="resetPasswort()" class="checkbox-register" href="javascript:void(0);">Forget my Password</a>
                </div>
                <div class="buttons">
                    <button onclick="login()" type="button" class="btn btn-dark button button-log-in">Log in</button>
                    <button type="button" class="btn btn-dark button-guest-login">Guest Log in</button>
                </div>
            </div>
    `
}