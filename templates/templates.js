async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
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

function switchColorSidebar(boolian) {
    boolian = true;
    for (let i = 0; i < classCSS.length; i++) {
        const element = classCSS[i];
    }
}

function openHeaderMenu() {
    openMenu = !openMenu;
    let headerMenu = document.getElementById('menu-header-container');
    openMenu ? headerMenu.classList.remove('d-none') : headerMenu.classList.add('d-none');
}

function highlightCurrentPageInHeader(id) {
    let colorSummery = document.getElementById(id);
    colorSummery.classList.add('blue-background');
}