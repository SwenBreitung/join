let prioUrgent = false;
let prioMedium = false;
let prioLow = false;
let subtaskArry = [];
let selectedColor;
let contaktsTask = [];

async function loadInit() {
    await includeHTML();
    await loadAllDataFromBackend();
    renderContacts();
}


function savetasksDataToBakcend() {
    uploadBackendDatas('tasks', tasks)
}

function saveContactsDataToBakcend() {
    uploadBackendDatas('contacts', contacts)
}


async function loadAllDataFromBackend() {
    await loadTasksFromBackend();
    await loadContactsFromBackend();
}


function priButtonActivated(id, newImgSrc, priorityNumber) {
    if (!isPriorityActive(priorityNumber)) {
        activatePriority(id, newImgSrc, priorityNumber);
    } else {
        resetBollians();
        resetButtonColors();
        addMainPrioImg();
    }
}

function resetButtonColors() {
    let buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.classList.remove('red-background');
        button.classList.remove('orange-background');
        button.classList.remove('green-background');
    });
}

function isPriorityActive(priorityNumber) {
    switch (priorityNumber) {
        case 1:
            return prioLow;
        case 2:
            return prioMedium;
        case 3:
            return prioUrgent;
        default:
            return false;
    }
}


function activatePriority(id, newImgSrc, priorityNumber) {
    addMainPrioImg();
    resetBollians();
    activatePriorityBoolean(priorityNumber);
    changeImage(id, newImgSrc);
    changeColor(priorityNumber);
}


function activatePriorityBoolean(priorityNumber) {
    switch (priorityNumber) {
        case 1:
            prioLow = true;
            break;
        case 2:
            prioMedium = true;
            break;
        case 3:
            prioUrgent = true;
            break;
    }
}


function resetBollians() {
    prioUrgent = false;
    prioMedium = false;
    prioLow = false;
}


function changeColor(priorityNumber) {
    resetButtonColors();
    if (priorityNumber === 1) {
        document.getElementById('prioUrgentBtn').classList.add('red-background');
    } else if (priorityNumber === 2) {
        document.getElementById('prioMediumBtn').classList.add('orange-background');
    } else if (priorityNumber === 3) {
        document.getElementById('prioLowBtn').classList.add('green-background');
    }
}


function addMainPrioImg() {
    document.getElementById('prioLowIcon').src = './img/prioLow.svg';
    document.getElementById('prioMediumIcon').src = './img/prioMedium.svg';
    document.getElementById('prioUrgentIcon').src = './img/prioUrgent.svg';
}


function removeBackgroundColor() {
    document.getElementById('prioUrgentBtn').classList.remove('red-background');
    document.getElementById('prioMediumBtn').classList.remove('orange-background');
    document.getElementById('prioLowBtn').classList.remove('green-background');
}


function changeImage(id, newImgSrc) {
    let imageElement = document.getElementById(id);
    imageElement.src = newImgSrc;
}

//---------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('dropdownTrigger').addEventListener('click', toggleDropdown);
    document.querySelectorAll('#dropdownMenu span').forEach(option => {
        option.addEventListener('click', function() {
            selectOption(this);
        });
    });
});

function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
}

document.getElementById('dropdownMenu').addEventListener('click', function(event) {
    // Prüfen, ob das angeklickte Element ein `span` ist
    if (event.target.tagName === 'SPAN') {
        selectOption(event.target);
    }
});

function selectOption(optionElement) {
    document.getElementById('categoryInputV1').value = optionElement.textContent;
    document.getElementById('dropdownMenu').style.display = 'none';
}
//--------------------------------------------------


function addSubTask() {
    let taskContent = document.getElementById('subTaskSelectInput').value.trim();
    if (taskContent) {
        subtaskArry.push(taskContent);
        document.getElementById('subtasks-addet').innerHTML = "";
        loadSubTask();
        document.getElementById('subTaskSelectInput').value = '';
    }
}


function loadSubTask() {
    let newsubTask = document.getElementById('subtasks-addet');
    subtaskArry.forEach(function(subtask, index) {
        newsubTask.innerHTML += loadSubTaskTemplate(subtask, index);
    });
}

function deleteSubtaskContainer() {
    let target = event.target.getAttribute('data-target');
    let index = parseInt(target.replace('subtask-container', ''));

    subtaskArry.splice(index, 1);


    let newsubTask = document.getElementById('subtasks-addet'); // Ersetzen Sie 'your-container-id' durch die tatsächliche ID Ihres Containers
    newsubTask.innerHTML = ''; // Leeren Sie den Container

    subtaskArry.forEach(function(subtask, idx) {
        newsubTask.innerHTML += loadSubTaskTemplate(subtask, idx);
    });
}

function loadSubTaskTemplate(subtask, i) {
    return /*html*/ `  
    <li style="width: 100%;" id="subtask-container${i}">
        <div class="subtask-list">
            <div id="subTask${i}"  class="subtask-container">${subtask} </div>
                <div class="subtask-listImg" >
                   <img src="img/PenAddTask 1=edit.svg" alt="" data-target="subTask${i}" id="edit-subtask">
                   <img src="img/subTaskDelete.svg" alt="" data-target="subtask-container${i}" id="delete-subtask" onclick="deleteSubtaskContainer(event)">
                </div>
            </div>
         </div>
    </li>
    `;
}

document.body.addEventListener('click', function(event) {
    // Check, ob das geklickte Element (oder ein Elternteil) die ID "edit-subtask" hat
    let targetElement = event.target.closest('#edit-subtask');

    if (targetElement) {
        let targetId = targetElement.getAttribute('data-target');
        let targetDiv = document.getElementById(targetId); // Hier holen Sie das tatsächliche DOM-Element
        targetDiv.setAttribute('contenteditable', 'true');
        targetDiv.focus(); // Fokus auf das Element setzen
    }
});


document.addEventListener('DOMContentLoaded', function() {
    var dateInput = document.getElementById('datepicker');

    var picker = new Pikaday({
        field: dateInput,
        position: 'top right',
        format: 'DD/MM/YYYY',
        minDate: new Date(), // Das stellt sicher, dass kein Datum vor dem heutigen Datum ausgewählt werden kann.
        onSelect: function(date) {
            const formattedDate = [
                date.getDate().toString().padStart(2, '0'),
                (date.getMonth() + 1).toString().padStart(2, '0'),
                date.getFullYear()
            ].join('/');
            dateInput.value = formattedDate;
        }
    });

    dateInput.addEventListener('focus', function() {
        if (!this.value) {
            const today = new Date();
            const formattedDate = [
                today.getDate().toString().padStart(2, '0'),
                (today.getMonth() + 1).toString().padStart(2, '0'),
                today.getFullYear()
            ].join('/');
            this.value = formattedDate;
            picker.show();
        }
    });
});


document.getElementById('addItemButton').addEventListener('click', function() {
    document.getElementById('dialog-window').classList.remove('d-none');
    createColorDivs();
});
document.getElementById('dialog-window').addEventListener('click', function() {
    document.getElementById('dialog-window').classList.add('d-none');
});
document.getElementById('close-dialog').addEventListener('click', function() {
    document.getElementById('dialog-window').classList.add('d-none');
});
document.getElementById('dialog').addEventListener('click', function(event) {
    event.stopPropagation(); // Verhindert das Hochbubbeln des Events
});


function colorSelectionHandler(event) {
    selectedColor = event.target.style.backgroundColor;
    console.log(`Color selected: ${selectedColor}`);
    resetBorders();
    event.target.style.border = '1px solid black';
}

function resetBorders() {
    for (let i = 0; i < 20; i++) {
        const colorDiv = document.getElementById(`color-${i}`);
        if (colorDiv) {
            colorDiv.style.border = '';
        }
    }
}

function createColorDivs() {
    const container = document.getElementById('color-container'); // Angenommen, es gibt ein Element mit der ID 'color-container'
    container.innerHTML = ""
    colorArray.forEach((color, index) => {
        const div = document.createElement('div');
        div.style.backgroundColor = color;
        div.className = "color-box";
        div.id = `color-${index}`;

        div.addEventListener('click', colorSelectionHandler);
        container.appendChild(div);
    })
};


document.getElementById('save-subtask-btn').addEventListener('click', function() {
    const subtaskText = document.getElementById('subtask-input').value;
    if (subtaskText.trim() === '' || !selectedColor) {
        alert('Please provide valid subtask text and select a color');
        return;
    }
    const itemsContainer = document.getElementById('itemsContainer');

    const newItemHTML = `
        <div class="dropdown-item">
            <span class="dropdown-text" data-color="${selectedColor}">${subtaskText}</span>
            <div class="color-box" style="background-color:${selectedColor};"></div>
        </div>
    `;
    itemsContainer.innerHTML += newItemHTML;
    document.getElementById('subtask-input').value = '';
    document.getElementById('dialog-window').classList.add('d-none');
});


function renderContacts() {
    const contactsElement = document.getElementById('contactsId');

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let initalien = extractInitials(contact.name)
        let contactName = contact.name;
        let contactColor = contact.color;
        contactsElement.innerHTML += loadContactHTML(initalien, contactName, contactColor, i)
    }
}

function openCloseContactsMenu() {
    const contactsContainer = document.getElementById('contacts-container');
    const contactsOnclicMenu = document.getElementById('assignedToInputContainer');
    if (contactsContainer.classList.contains('d-none')) {
        contactsContainer.classList.remove('d-none');
        contactsOnclicMenu.classList.add('focus');
    } else {
        contactsContainer.classList.add('d-none');
        contactsOnclicMenu.classList.remove('focus');
    }
}

function loadContactAddTasksTamplate(initalien, i, contactColor) {
    let contact = document.getElementById('add-contacts-add-tasks')
    contact.innerHTML += /*html*/ `
      <div class="profilbuild" data-index="${i}" style="background-color: ${contactColor}">${initalien}</div>
`
}


document.body.addEventListener('click', function(event) {
    let targetCheckbox = event.target.closest('input[type="checkbox"]');

    if (targetCheckbox && (targetCheckbox.id.startsWith('contactCheckbox_'))) {
        if (targetCheckbox.checked) {
            console.log(targetCheckbox.checked)
            const parentDiv = targetCheckbox.closest('.d-flex[data-index]');
            const i = parentDiv.getAttribute('data-index'); // Aus der ID das i extrahieren
            console.log(i)
            const initalien = extractInitials(contacts[i].name); // Einen geeigneten Wert einfügen
            const contactColor = contacts[i].color; // Einen geeigneten Wert einfügen

            loadContactAddTasksTamplate(initalien, i, contactColor);
        } else {
            console.log(targetCheckbox.checked)
            const dataIndex = targetCheckbox.id.replace('contactCheckbox_', '');
            console.log(dataIndex)
            const elementToRemove = document.querySelector(`.profilbuild[data-index="${dataIndex}"]`);
            if (elementToRemove) elementToRemove.remove();
        }
    }
});

function loadContactHTML(initalien, contactName, contactColor, i) {
    return /*html*/ `
    <div class="d-flex align-items-center justify-content-between" data-index="${i}">
        <div class="d-flex" >
            <div class="profilbuild" style="background-color: ${contactColor}">${initalien}</div>
            <div class="d-flex align-items-center justify-content-between">${contactName}</div>
        </div>
        <div class="d-flex align-items-center justify-content-between">
            <input type="checkbox" id="contactCheckbox_${i}" name="contactCheckbox_${contactName}" />
            <label for="contactCheckbox_${i}"></label>
        </div>
    </div>
`
}

function addNewContact() {
    let dialog = document.getElementById('dialog');
    dialog.remove('d-none');
}

function handleAddTaskButtonClick() {
    saveTask();
    savetasksDataToBakcend();
    // window.location.href = 'board.html'; 
}


function saveTask() {
    const getValue = id => {
        const element = document.getElementById(id);
        return element ? element.value || "" : "";
    };
    let prio = prioUrgent ? "Urgent" : (prioMedium ? "Medium" : (prioLow ? "Low" : ""));
    let [title, description, date, category, subTask] = ['addTitel', 'addDescription', 'datepicker', 'categoryInputV1', 'subTaskSelectInput'].map(getValue);
    let newTask = {
        "id": tasks.length + 1,
        "category": category,
        "colorCategory": "",
        "title": title,
        "text": description,
        "time": "",
        "date": date,
        "priority": prio,
        "subTasks": subtaskArry,
        "contacts": contaktsTask
    };
    tasks.push(newTask);
    console.log(tasks);
    resetAllInputs();
};

function resetAllInputs() {
    ['addTitel', 'addDescription', 'datepicker', 'categoryInputV1', 'subTaskSelectInput'].forEach(id => {
        document.getElementById(id).value = "";
    });
    document.getElementById('categoryInputV1').value = `Select task category`;
}