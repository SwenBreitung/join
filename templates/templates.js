isSummery = false;
isAddTask = false;
isBoard = false;
isContacts = false;
isPolice = false;
isNotice = false;
openMenu = false;

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

/**
 * This function is used to mark the active .html page
 *
 */
function markCategory() {
    const currentPage = window.location.href.split('/').pop() || 'index.html';
    const links = document.querySelectorAll(`.sidebar-text[href*="${currentPage}"]`);

    links.forEach(link => {
        const categoryElement = link.querySelector('.sidebar-text-sub');
        categoryElement.classList.add('htmlActive');

        categoryElement.style.color = 'white';

        const categoryImage = link.querySelector('img');
        if (categoryImage) {
            const categoryName = categoryElement.textContent.trim().toLowerCase();
            categoryImage.src = `img/${categoryName}ImageWhite.png`;
        }
    });
}