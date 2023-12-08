let prioUrgent = false;
let prioMedium = false;
let prioLow = false;

let addTasksStatus = 'toDo';


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
function saveTask() {
    const getValue = id => {
        const element = document.getElementById(id);
        return element ? element.value || "" : "";
    };
    let prio = prioUrgent ? "Urgent" : (prioMedium ? "Medium" : (prioLow ? "Low" : ""));
    let [title, description, date, category] = ['addTitel', 'addDescription', 'datepicker', 'categoryInputV1'].map(getValue);
    let subtaskArry = getAllSubtaskTexts();
    let contaktsArry = loadContactsArry();
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
        "contacts": contaktsArry,
        "status": addTasksStatus

    };
    tasks.push(newTask);
    console.log(tasks);
    resetAllInputs();
};

function handleAddTaskButtonClick() {
    saveTask();
    savetasksDataToBakcend();
    // window.location.href = 'board.html'; 
}

function loadContactsArry() {
    let contact = document.querySelectorAll('.subtask-container');
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
        subtaskTexts.push(subtask.innerText);
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
}

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
                   <img src="img/PenAddTask 1=edit.svg" alt="" data-target="subTask${i}" onclick="handleEditSubtaskClick('edit-subtask')" id="edit-subtask">
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

function resetAllCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
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