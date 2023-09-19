isSummery = false;
isAddTask = false;
isBoard = false;
isContacts = false;
isPolice = false;
isNotice = false;




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