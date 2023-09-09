let registerBtn = document.getElementById('registerBtn');
let checkbox = document.getElementById("myCheckbox");

async function init() {
    loadUsers();
}


function signUp() {
    dialog.innerHTML = loadTemplateSignUp();
}


async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


async function register() {
    if (checkbox.checked) {
        registerBtn.disabled = true;

        users.push({
            name: userName.value,
            email: email.value,
            password: password.value,
        });
        await setItem('users', JSON.stringify(users));
        resetForm();
        window.location = 'index.html';
    } else {
        document.getElementById('dialog-full').classList.remove('d-none');
    }
}


function resetForm() {
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
}


async function resetAllBackendUser() {
    await loadUsers();
    users.splice(0, users.length);
    console.log(users);
    await setItem('users', JSON.stringify(users));
}