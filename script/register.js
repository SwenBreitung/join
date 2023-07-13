function signUp() {
    dialog.innerHTML = loadTemplateSignUp();
}



function loadTemplateSignUp() {
    return /*html*/ `
    <form onsubmit="register(); return false;"  action="">
    <h1>Sign up</h1>
    <div required class="input-field">
        <input type="text" placeholder="Name">
        <img src="./img/user.svg" alt="Bild hinten" class="input-suffix">
    </div>  
    <div  required class="input-field">
        <input type="text" placeholder="EMail">
            <img src="./img/letter.svg" alt="Bild hinten" class="input-suffix">
    </div>  
    <div required class="input-field">
        <input type="text" placeholder="Passwort">
        <img src="./img/lock.svg" alt="Bild hinten" class="input-suffix">
    </div>

    <button>Sign up</button>
    </form>
`
}