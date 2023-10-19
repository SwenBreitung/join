let registerBtn = document.getElementById('registerBtn');
let checkbox = document.getElementById("myCheckbox");

async function init() {
    loadBackendUsers();
}


// function signUp() {
//     dialog.innerHTML = loadTemplateSignUp();
// }


async function loadBackendUsers() {
    loadBackendData('users')

}

async function loadBackendData(key) {
    try {
        users = JSON.parse(await getItem(key));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


async function register() {
    if (!checkbox.checked) return;

    registerBtn.disabled = true;

    const newUser = createUser();
    await saveUser(newUser);

    resetForm();
    window.location = 'index.html';
}

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

async function saveUser(user) {
    await setItem('users', JSON.stringify(users));
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