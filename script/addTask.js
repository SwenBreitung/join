function toggleVisibility(id, id2) {
    const elementOne = document.getElementById(id);
    const elementTwo = document.getElementById(id2);

    elementOne.classList.add('d-none');
    elementTwo.classList.remove('d-none');
}


function toggleClass(mainElementId, shouldToggle, firstSecondaryId, secondSecondaryId) {
    const mainElement = document.getElementById(mainElementId);
    const firstSecondary = document.getElementById(firstSecondaryId);
    const secondSecondary = document.getElementById(secondSecondaryId);

    if (shouldToggle) {
        if (mainElement) {
            returnSettingsMain(mainElement);
        }
        if (firstSecondary) {
            returnSettingsFirst(firstSecondary);
        }
        if (secondSecondary) {
            returnSettingsSecond(secondSecondary);
        }
    }
}


function prioSelected(btnId, iconId, activeIconId, activeClass, resetOther) {
    if (resetOther) {
        resetAll();
    }

    document.getElementById(btnId).classList.add(activeClass);
    document.getElementById(iconId).classList.add('d-none');
    document.getElementById(activeIconId).classList.remove('d-none');
}

function resetAll() {
    const buttons = ['prioUrgentBtn', 'prioMediumBtn', 'prioLowBtn'];
    const icons = ['prioUrgentIcon', 'prioMediumIcon', 'prioLowIcon'];
    const activeIcons = ['prioUrgentIconActiv', 'prioMediumIconActiv', 'prioLowIconActiv'];
    const activeClasses = ['prioBtnActivUrgent', 'prioBtnActivMedium', 'prioBtnActivLow'];

    for (let i = 0; i < buttons.length; i++) {
        document.getElementById(buttons[i]).classList.remove(activeClasses[i]);
        document.getElementById(icons[i]).classList.remove('d-none');
        document.getElementById(activeIcons[i]).classList.add('d-none');
    }
}


function returnSettingsMain(mainElement) {
    if (mainElement.classList.contains('assignedContactsBox')) {
        mainElement.classList.remove('assignedContactsBox');
        mainElement.classList.add('assignedContactsBoxSelected');
    } else {
        mainElement.classList.remove('assignedContactsBoxSelected');
        mainElement.classList.add('assignedContactsBox');
    }
    return
}


function returnSettingsFirst(firstSecondary) {
    if (firstSecondary.classList.contains('d-none')) {
        firstSecondary.classList.remove('d-none');
    } else {
        firstSecondary.classList.add('d-none');
    }
    return
}


function returnSettingsSecond(secondSecondary) {
    if (secondSecondary.classList.contains('d-none')) {
        secondSecondary.classList.remove('d-none');
    } else {
        secondSecondary.classList.add('d-none');
    }
    return
}