let users = [];

let registerBtn = document.getElementById('registerBtn');


function signUp() {
    dialog.innerHTML = loadTemplateSignUp();
}




async function init() {
    loadUsers();
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


async function register() {
    registerBtn.disabled = true;

    users.push({
        name: userName.value,
        email: email.value,
        password: password.value,
    });
    await setItem('users', JSON.stringify(users));
    resetForm();
    window.location = 'log-in.html';

}

function resetForm() {
    email.value = '';
    password.value = '';
    userName.value = '';
    registerBtn.disabled = false;
}


async function resetAllBackendUser() {
    await loadUsers();
    users.splice(0, users.length);
    console.log(users);
    await setItem('users', JSON.stringify(users));
}