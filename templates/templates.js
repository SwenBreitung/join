isSummery = false;
isAddTask = false;
isBoard = false;
isContacts = false;
isPolice = false;
isNotice = false;


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

function loadHeaderSidebar(boolian) {
    resetBoolians();
    includeHTML();
    switchColorSidebar(boolian);
}

function resetBoolians() {
    isSummery = false;
    isAddTask = false;
    isBoard = false;
    isContacts = false;
    isPolice = false;
    isNotice = false;
}

function switchColorSidebar(boolian) {
    boolian = true;
    for (let i = 0; i < classCSS.length; i++) {
        const element = classCSS[i];
    }
}

function openHeaderMenu() {
    openMenu = !openMenu; // Das Umschalten des Wertes von openMenu

    let headerMenu = document.getElementById('menu-header-container');
    openMenu ? headerMenu.classList.remove('d-none') : headerMenu.classList.add('d-none');
}