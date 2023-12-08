async function init() {
    await loadUserDataFromLocalStorage();
    await includeHTML();
    loadTimeOfDay();
    // loadText();
    searchFirstUrgantDate();
    loadSvgs();
    await loadHeadImg();
    highlightCurrentPageInHeader('summary-sidebar');
}

function loadSvgs() {
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
    loadNumbersUrgent();
}



//----------------------search function------------------------------
//---Search User name----------------------------
function loadUserName() {
    userName = document.getElementById('name')
    userName.innerText = userData['name'];
}


//----------------------search function task------------------------------
function loadNumbersBoard() {
    let board = document.getElementById('board');
    board.innerText = tasks.length;
}


function loadNumersToDo() {
    let toDos = document.getElementById('to-dos');
    toDos.innerText = countTasksByStatus(tasks, 'toDo', 'status');
}


function loadNumersInProgress() {
    let inProgress = document.getElementById('in-progress');
    inProgress.innerText = countTasksByStatus(tasks, 'in-progress', 'status');
}


function loadNumersAwaitFeedback() {
    let awaitFeedback = document.getElementById('await-feedback');
    awaitFeedback.innerText = countTasksByStatus(tasks, 'awaitFeedback', 'status');
}


function loadNumersDone() {
    let done = document.getElementById('done');
    done.innerText = countTasksByStatus(tasks, 'done', 'status');
}


function loadNumbersUrgent() {
    let urgentNumber = document.getElementById('urgent')
    urgentNumber.innerHTML = countTasksByStatus(tasks, 'urgent', 'priority');
}

function countTasksByStatus(collection, status, attribute) {

    if (Array.isArray(collection) && collection.length > 0) {
        // console.log(status)
        // console.log(attribute)
        return collection.filter(element => element[attribute] === status).length;

    } else {
        return 0;
    }
}


function searchFirstUrgantDate() {
    let urgentDate = document.getElementById('date')
    urgentDate.innerHTML = findLatestDate(tasks);
}

//======================== search function task END==============================



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



function findLatestDate(collection) {
    let earliestDate = "2024-10-02"; // Setzen Sie ein "hohes" Anfangsdatum.
    let earliestDateItem;

    if (!Array.isArray(collection) || collection.length === 0) {
        return '-';
    }

    collection.forEach(item => {
        if (item && item['date']) { // Überprüfen, ob 'date' existiert
            let currentDate = item['date'];
            if (compareDates(currentDate, earliestDate) < 0) {
                earliestDate = currentDate;
                earliestDateItem = currentDate;
            }
        }
    });

    return earliestDate; // Oder einfach `return earliestDate;`, je nach Bedarf.
}

function compareDates(date1, date2) {
    const [year1, month1, day1] = date1.split('-').map(Number);
    const [year2, month2, day2] = date2.split('-').map(Number);
    if (year1 !== year2) return year1 - year2;
    if (month1 !== month2) return month1 - month2;
    return day1 - day2;
}

//------------------load SVGs------------------------------------

/**
 * Loads the Chop-SVG into the designated container.
 * 
 * This function sets the content of the element with the ID 'chop-container'
 * to the returned SVG from the `loadChopSvg` function.
 */
function loadSvgChop() {
    /** @type {HTMLElement|null} The element where the SVG will be loaded into */
    const chopSVGContainer = document.getElementById('chop-container');

    /** @type {string} The SVG content to be loaded */
    const chopSVGContent = loadChopSvg();

    if (chopSVGContainer) {
        chopSVGContainer.innerHTML = chopSVGContent;
    }
}


/**
 * Loads the Pen-SVG into the designated container.
 * 
 * This function sets the content of the element with the ID 'penContainer'
 * to the returned SVG from the `loadPenSvg` function.
 */
function loadSvgPen() {
    /** @type {HTMLElement|null} The element where the SVG will be loaded into */
    const penSVGContainer = document.getElementById('penContainer');

    /** @type {string} The SVG content to be loaded */


    if (penSVGContainer) {
        penSVGContainer.innerHTML = loadPenSvg();
    }
}
//====================load SVGs END============================