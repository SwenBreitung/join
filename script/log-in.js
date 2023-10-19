let dialog = document.getElementById('dialog');


function init() {
    startAnimation();
    loadLogIn();
    loadBackendUsers();
}


function loadLogIn() {
    dialog.innerHTML = loadTempleteLogIn();
}


function startAnimation() {
    if (!document.referrer) {
        document.querySelector('.join-logo-contain').classList.add('animated');
        document.querySelector('.join-logo-contain').classList.remove('d-none');
        document.querySelector('.join-logo').classList.add('animated');
    }
};


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
    if (user) {
        console.log('User found', user);
        try {
            console.log('Trying to set item:', user);
            localStorage.setItem('user', JSON.stringify(user));
            console.log('Just set:', JSON.parse(localStorage.getItem('user')));
            console.log('Item should be set.');
        } catch (e) {
            console.error('An error occurred:', e);
        }
        userId = user.id;
        window.location.href = "./summery.html";
    } else {
        loadRedBorderInput();
        loadWarningTextTamplate();
    }
}

function loadRedBorderInput() {
    let inputIds = ["input-email", "input-passwort"];
    for (let id of inputIds) {
        document.getElementById(id).classList.add("red-border");
    }
}

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