let userss = {
    "user0": {
        "name": "hello",
        "email": "1234",
        "password": "1234",
        "color": null,
        "cards": {
            "toDo": {
                "ToDo0": {
                    "category": "Technical Task",
                    "title": "sad",
                    "text": "sadsad",
                    "time": "sadd",
                    "date": "23.13.23",
                    "priority": "medium",
                },
                "ToDo1": {
                    "category": "Technical Task",
                    "title": "sad",
                    "text": "sadsad",
                    "time": "sadd",
                    "date": "23.13.23",
                    "priority": "medium",
                },
                "ToDo2": {
                    "category": "Technical Task",
                    "title": "sad",
                    "text": "sadsad",
                    "time": "sadd",
                    "date": "23.13.23",
                    "priority": "medium",
                },
                "ToDo3": {
                    "category": "Technical Task",
                    "title": "sad",
                    "text": "sadsad",
                    "time": "sadd",
                    "date": "23.13.23",
                    "priority": "Urgent",
                }
            },
            "inProgress": {
                "inProgress0": {
                    "category": "Technical Task",
                    "title": "sad",
                    "text": "sadsad",
                    "time": "sadd",
                    "date": "23.13.23",
                    "priority": "medium",
                },
                "inProgress1": {
                    "category": "Technical Task",
                    "title": "sad",
                    "text": "sadsad",
                    "time": "sadd",
                    "date": "23.13.23",
                    "priority": "medium",
                },
                "inProgress2": {
                    "category": "Technical Task",
                    "title": "sad",
                    "text": "sadsad",
                    "time": "sadd",
                    "date": "23.13.23",
                    "priority": "medium",
                },
            },
            "awaitFeedback": {
                "awaitFeedback0": {
                    "category": "Technical Task",
                    "title": "sad",
                    "text": "sadsad",
                    "time": "sadd",
                    "date": "23.13.23",
                    "priority": "medium",
                },
                "awaitFeedback1": {
                    "category": "Technical Task",
                    "title": "sad",
                    "text": "sadsad",
                    "time": "sadd",
                    "date": "23.13.23",
                    "priority": "medium",
                },
            },
            "done": {
                "done0": {
                    "category": "Technical Task",
                    "title": "sad",
                    "text": "sadsad",
                    "time": "sadd",
                    "date": "23.13.23",
                    "priority": "medium",
                },
                "done1": {
                    "category": "Technical Task",
                    "title": "sad",
                    "text": "sadsad",
                    "time": "sadd",
                    "date": "23.13.23",
                    "priority": "medium",
                },
            },
        },
        "contacts": {
            "contact0": [{
                "name": "sadsad",
                "email": "adsj@asd",
                "phone": "021513",
            }]
        }
    },
}


function init() {
    loadTimeOfDay();
    loadText();
    loadSvgPen();
    loadSvgChop();
}


function loadText() {
    loadUserName();
    loadNumersToDo();
    loadNumersInProgress();
    loadNumersAwaitFeedback();
    loadNumersDone();
    loadNumbersBoard();
}

//----------------------search function------------------------------
//---Search User name----------------------------
function loadUserName() {
    userName = document.getElementById('name')
    userName.innerText = userss['user0']['name'];
}
//================Search User name END==============================

//----------------------search function cards------------------------------
function loadNumbersBoard() {
    let toDos = searchNumbers(userss['user0']['cards']['toDo']);
    let inProgress = searchNumbers(userss['user0']['cards']['inProgress']);
    let awaitFeedback = searchNumbers(userss['user0']['cards']['awaitFeedback']);
    let done = searchNumbers(userss['user0']['cards']['done']);
    let board = document.getElementById('board');
    board.innerText = (toDos + inProgress + awaitFeedback + done);

}


function loadNumersToDo() {
    let toDos = document.getElementById('to-dos');
    toDos.innerText = searchNumbers(userss['user0']['cards']['toDo']);
}


function loadNumersInProgress() {
    let inProgress = document.getElementById('in-progress');
    inProgress.innerText = searchNumbers(userss['user0']['cards']['inProgress']);
}


function loadNumersAwaitFeedback() {
    let awaitFeedback = document.getElementById('await-feedback');
    awaitFeedback.innerText = searchNumbers(userss['user0']['cards']['awaitFeedback']);
}


function loadNumersDone() {
    let done = document.getElementById('done');
    done.innerText = searchNumbers(userss['user0']['cards']['done']);
}


function searchNumbers(collection) {
    let collectionAsJson = collection;
    let currentNumber = 0;
    if (Array.isArray(collectionAsJson)) {
        for (let i = 0; i < collectionAsJson.length; i++) {
            currentNumber++;
        }
    } else {
        for (let i = 0; i < Object.keys(collectionAsJson).length; i++) {
            currentNumber++;
        }
    }
    return currentNumber;
}


function searchFirstUrgantDate() {

}
//======================== search function cards END==============================



//----------------- load Time of Day------------------
function loadTimeOfDay() {
    let HoursOfTheDay = document.getElementById('time-of-day');
    HoursOfTheDay.innerHTML = getTimeOfDay();
}

function getTimeOfDay() {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 6) {
        return '<span class="time-of-day">Schöne </span><span class="time-of-day">Nacht</span>';
    } else if (currentHour >= 6 && currentHour < 12) {
        return '<span class="time-of-day">Guten </span> <span class="time-of-day"> Morgen</span>';

    } else if (currentHour >= 12 && currentHour < 18) {
        return '<span class="time-of-day">Guten</span> <span class="time-of-day">Nachmittag</span>';
    } else {
        return '<span class="time-of-day">Guten  </span class="time-of-day"><span>Abend</span>';
    }
}

//===================load Time of Day END============================


function loadSvgChop() {
    const penSVGContainer = document.getElementById('chop-container'); // Ändern Sie den Namen des Elements, auf das Sie zugreifen möchten
    const penSVGContent = loadChopSvg();
    penSVGContainer.innerHTML = penSVGContent;
}

function loadSvgPen() {
    const penSVGContainer = document.getElementById('penContainer'); // Ändern Sie den Namen des Elements, auf das Sie zugreifen möchten
    const penSVGContent = loadPenSvg();
    penSVGContainer.innerHTML = penSVGContent;
}