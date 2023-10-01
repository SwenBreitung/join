let tasks = [];

async function loadTasks() {
    try {
        tasks = JSON.parse(await getItem('tasks'));

    } catch (e) {
        console.info('Could not load tasks');
    }
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


function closeDialog() {
    document.getElementById('dialog-full').classList.add('d-none');
}