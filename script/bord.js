let todos = [{
    'id': 0,
    'title': 'Putzen saufen',
    'category': 'to-do'
}, {
    'id': 1,
    'title': 'Kochen putzen',
    'category': 'in-progress'
}, {
    'id': 2,
    'title': 'Einkaufen aaufen',
    'category': 'awaiting-feedback'
}, {
    'id': 3,
    'title': 'Einkaufen laufen',
    'category': 'awaiting-feedback'
}];


let currentDragElement;

//drag and drop--------------------------------------------------------------

function ini() {
    loadTemplateCardsToDo();

}


function loadTemplateCardsToDo() {
    let toDo = todos.filter(t => t['category'] == `to-do`)
    document.getElementById('to-do').innerHTML = '';

    let inProgress = todos.filter(t => t['category'] == `in-progress`)
    document.getElementById('in-progress').innerHTML = '';

    let awaitingFeedback = todos.filter(t => t['category'] == `awaiting-feedback`)
    document.getElementById('awaiting-feedback').innerHTML = '';

    let done = todos.filter(t => t['category'] == `done`)
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < toDo.length; i++) {
        let element = toDo[i];
        document.getElementById('to-do').innerHTML += loadTemplateCardTodo(element);
    }
    for (let i = 0; i < inProgress.length; i++) {
        let element = inProgress[i];
        document.getElementById('in-progress').innerHTML += loadTemplateCardTodo(element);
    }
    for (let i = 0; i < awaitingFeedback.length; i++) {
        const element = awaitingFeedback[i];
        document.getElementById('awaiting-feedback').innerHTML += loadTemplateCardTodo(element);
    }
    for (let i = 0; i < done.length; i++) {
        let element = done[i];
        document.getElementById('done').innerHTML += loadTemplateCardTodo(element);
    }
}


function startDragging(id) {
    currentDragElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    todos[currentDragElement]['category'] = category;
    loadTemplateCardsToDo();
    document.getElementById(category).classList.remove('drag-area-highlight');
}


function heiglight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');

}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

function loadTemplateCardTodo(element) {
    return /*html*/ ` <div draggable="true" ondragstart="startDragging(${element['id']})" class = "card" >
        <div class = "card-body" >
            <h5 class = "card-title" > Design </h5> 
            <h6 class = "card-subtitle mb-2 text-body-secondary" > headline </h6> 
            <p id = "card-text" > Lorem ipsum dolor sit amet, consectetur </p> 
            <div id = "card-footer" >
                <div id = "card-user-imgs" >
                    <div id = "card-user-img1" class = "card-user-img" > SB </div> 
                    <div id = "card-user-img2" class = "card-user-img-two card-user-img" > HB </div> 
                    <div id = "card-user-img3" class = "card-user-img-three card-user-img" > + </div> 
                </div> 
            <img src = "img-Andre/prio-medium.svg" alt = "prio" ></div> 
        </div> 
    </div>
    `;
}


//drag and drop END=============================================================================

//loop for User IMG------------------------------------------------------------------------

function loadUserImgLoop() {
    for (let i = 0; i <= 3; i++) {
        loadUserImg(i);
    }
}

//img from card-user-img--------------------------------------------------
function loadUserImg(i) {
    let initials;
    if (i <= 2) {
        initials = generateInitials()
        document.getElementById('card-user-img[i]').innerHTML = `${initials[0]} ${initials[1]}`
    } else if (Array.length == 3) {
        initials = generateInitials()
        document.getElementById('card-user-img[i]').innerHTML = `${initials[0]} ${initials[1]}`
    } else if (Array.length >= 3) {
        document.getElementById('card-user-img[i]').innerHTML = `+`
    }
}

function generateInitials() {
    let jsonString = '{"text": " hallo Welt"}';

    // JSON-String in ein JavaScript-Objekt umwandeln
    let data = JSON.parse(jsonString);

    // Textfeld aus dem JSON-Objekt extrahieren
    let text = data.text.trim();

    // Leerzeichen finden und den ersten Buchstaben sowie den Buchstaben danach extrahieren
    let index = text.indexOf(' ');
    if (index !== -1 && index < text.length - 1) {
        let firstLetter = text.charAt(0).toUpperCase();
        let letterAfterSpace = text.charAt(index + 1).toUpperCase();

        console.log(firstLetter + letterAfterSpace);
        return (firstLetter, letterAfterSpace)
    } else {
        console.log('Kein Leerzeichen gefunden oder kein Buchstabe danach.');
    }
}