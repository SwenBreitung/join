let prioUrgent = false;
let prioMedium = false;
let prioLow = false;
let subtaskArry = [];
let selectedColor;
let contaktsTask = [];
let addTasksStatus = 'toDo';
let saveAddTaskTorgle = false;

async function loadInit() {
    await includeHTML();
    await loadAllDataFromBackend();
    await loadUserDataFromLocalStorage();
    renderContacts();
    initializeDatePicker();
    await loadHeadImg()
    highlightCurrentPageInHeader('add-task-sidebar');
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
        button.style.backgroundColor = '';
        button.style.backgroundColor = '';
        button.style.backgroundColor = '';
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


function activatePriority(id, priorityNumber) {
    addMainPrioImg();
    resetBollians();
    activatePriorityBoolean(priorityNumber);
    changeImage(id, priorityNumber);
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
        document.getElementById('prioUrgentBtn').style.backgroundColor = 'red';
    } else if (priorityNumber === 2) {
        document.getElementById('prioMediumBtn').style.backgroundColor = 'orange';
    } else if (priorityNumber === 3) {
        document.getElementById('prioLowBtn').style.backgroundColor = 'green';
    }
}


function addMainPrioImg() {
    document.getElementById('prioLowIcon').src = './img/prioLow.svg';
    document.getElementById('prioMediumIcon').src = './img/prioMedium.svg';
    document.getElementById('prioUrgentIcon').src = './img/prioUrgent.svg';
}


function removeBackgroundColor() {
    document.getElementById('prioUrgentBtn').style.backgroundColor = '';
    document.getElementById('prioMediumBtn').style.backgroundColor = '';
    document.getElementById('prioLowBtn').style.backgroundColor = '';
}


function changeImage(id, priorityNumber) {
    let img;


    if (priorityNumber = 1) {
        img = 'img/prioUngrentWhite2.svg';
    }
    if (priorityNumber = 2) {
        img = './img/PrioMediumWhite.svg';
    }
    if (priorityNumber = 3) {
        img = './img/PrioLowWhite.svg';
    }

    let imageElement = document.getElementById(id);
    imageElement.src = img;
}

//---------------------------------------------------

document.body.addEventListener('click', function(event) {
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


document.body.addEventListener('click', function(event) {
    // Prüfen, ob das angeklickte Element oder ein übergeordnetes Element das 'dropdownMenu' ist
    let dropdownMenu = event.target.closest('#dropdownMenu');
    if (dropdownMenu && event.target.tagName === 'SPAN') {
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
        let subtaskObj = {
            name: taskContent,
            status: false
        };
        subtaskArry.push(subtaskObj);
        document.getElementById('subtasks-addet').innerHTML = "";
        loadSubTask();
        document.getElementById('subTaskSelectInput').value = '';
    }
}


function loadSubTask() {
    let newsubTask = document.getElementById('subtasks-addet');
    subtaskArry.forEach(function(subtask, index) {
        newsubTask.innerHTML += loadSubTaskTemplate(subtask.name, index);
    });
}

function deleteSubtaskContainer() {
    let target = event.target.getAttribute('data-target');
    let index = parseInt(target.replace('subtask-container', ''));

    subtaskArry.splice(index, 1);

    let newsubTask = document.getElementById('subtasks-addet'); // Ersetzen Sie 'your-container-id' durch die tatsächliche ID Ihres Containers
    newsubTask.innerHTML = ''; // Leeren Sie den Container

    subtaskArry.forEach(function(subtask, idx) {
        newsubTask.innerHTML += loadSubTaskTemplate(subtask.name, idx);
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


document.body.addEventListener('click', handleEditSubtaskClick);

function handleEditSubtaskClick(event) {
    // Überprüfen, ob das geklickte Element (oder ein Elternteil) die ID "edit-subtask" hat
    let targetElement = event.target.closest('#edit-subtask');

    if (targetElement) {
        let targetId = targetElement.getAttribute('data-target');
        let targetDiv = document.getElementById(targetId); // Hier holen Sie das tatsächliche DOM-Element

        if (targetDiv) {
            targetDiv.setAttribute('contenteditable', 'true');
            targetDiv.focus(); // Fokus auf das Element setzen
        }
    }
}


function initializeDatePicker() {
    var dateInput = document.getElementById('datepicker');
    if (!dateInput) return; // Sicherstellen, dass das Element existiert

    var picker = new Pikaday({
        field: dateInput,
        position: 'top right',
        format: 'DD/MM/YYYY',
        minDate: new Date(),
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
}


function openDialogAndCreateColors() {
    document.getElementById('dialog-window').classList.remove('d-none');
    createColorDivs();
}


function closeDialogWindow() {
    document.getElementById('dialog-window').classList.add('d-none');
    toggleDropdown()
}


function closeDialogAndToggleDropdown() {
    if (!event.target.closest('#dialog')) {
        document.getElementById('dialog-window').classList.add('d-none');
        toggleDropdown();
    }
}


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


function saveSubtask() {
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
}


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


document.body.addEventListener('click', handleCheckboxClickOnBody);

function handleCheckboxClickOnBody(event) {
    let targetCheckbox = event.target.closest('input[type="checkbox"]');

    if (targetCheckbox && targetCheckbox.id.startsWith('contactCheckbox_')) {
        if (targetCheckbox.checked) {
            console.log(targetCheckbox.checked);
            const parentDiv = targetCheckbox.closest('.d-flex[data-index]');
            const i = parentDiv.getAttribute('data-index'); // Aus der ID das i extrahieren
            console.log(i);
            // const initials = extractInitials(contacts[i].name); // Einen geeigneten Wert einfügen
            const contactColor = contacts[i].color; // Einen geeigneten Wert einfügen

            contaktsTask.push({
                name: contacts[i].name,

                color: contactColor
            });
            loadContactAddTasksTamplate(initials, i, contactColor);
        } else {

            console.log(targetCheckbox.checked);
            const dataIndex = targetCheckbox.id.replace('contactCheckbox_', '');
            console.log(dataIndex);

            const elementToRemove = document.querySelector(`.profilbuild[data-index="${dataIndex}"]`);
            if (elementToRemove) elementToRemove.remove();

            const indexInArray = contaktsTask.findIndex(item => item.index === dataIndex);
            if (indexInArray !== -1) {
                contaktsTask.splice(indexInArray, 1);
            }
        }
    }
}



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

    if (!saveAddTaskTorgle) {
        saveNewTask();
        savetasksDataToBakcend();
        window.location.href = 'board.html';
    } else {
        saveOldTask();
        savetasksDataToBakcend();
    }

}

function saveDataTask() {
    const getValue = id => {
        const element = document.getElementById(id);
        return element ? element.value || "" : "";
    };
    let prio = prioUrgent ? "Urgent" : (prioMedium ? "Medium" : (prioLow ? "Low" : ""));
    let [title, description, date, category] = ['addTitel', 'addDescription', 'datepicker', 'categoryInputV1'].map(getValue);
    let subtaskArry = getAllSubtaskTexts();
    let contaktsArry = contaktsTask;
    let newTask = {
        "id": tasks.length + 1,
        "category": category,
        "colorCategory": "",
        "title": title,
        "text": description,
        "time": "",
        "date": date,
        "priority": prio,
        "subtasks": subtaskArry,
        "contacts": contaktsArry,
        "status": addTasksStatus
    };
    return newTask
}

function saveOldTask() {
    let task = saveDataTask();
    tasks[editArryIndex] = task
    resetAllInputs();
}


function saveNewTask() {
    let task = saveDataTask();
    tasks.push(task);


    resetAllInputs();
};


function loadContactsArry() {
    let contact = document.querySelectorAll('.add-contacts-add-tasks');
    let contacts = [];

    contact.forEach(contact => {
        contacts.push(contact.innerText);
    });
    return contacts;
}


function getAllSubtaskTexts() {
    let subtasks = document.querySelectorAll('.subtask-container');
    let subtaskTexts = [];

    subtasks.forEach(subtask => {
        subtaskTexts.push({ name: subtask.innerText.trim(), status: false });
    });
    return subtaskTexts;
}


function resetAllInputs() {
    ['addTitel', 'addDescription', 'datepicker', 'categoryInputV1', 'subTaskSelectInput'].forEach(id => {
        document.getElementById(id).value = "";
    });
    document.getElementById('categoryInputV1').value = `Select task category`;
    document.getElementById('add-contacts-add-tasks').innerHTML = "";

    document.getElementById('subtasks-addet').innerHTML = "";
    resetBollians();
    resetButtonColors();
    resetAllCheckboxes();
    addMainPrioImg()
}


function resetAllCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}