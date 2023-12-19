/**
 * Initializes the application.
 * @async
 * @function
 * @returns {Promise<void>} A Promise that resolves when initialization is complete.
 */
async function init() {
    await loadAllDataFromBackend();
    await loadUserDataFromLocalStorage();
    await includeHTML();
    loadTimeOfDay();
    loadText();
    searchFirstUrgantDate();
    loadSvgs();
    await loadHeadImg();
    highlightCurrentPageInHeader('summary-sidebar');
}


/**
 * Loads SVG images for the application.
 * @function
 */
function loadSvgs() {
    loadSvgPen();
    loadSvgChop();
}


/**
 * Loads various text content for the application.
 * @function
 */
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

/**
 * Loads the user's name and displays it in the designated element.
 * @function
 */
function loadUserName() {
    userName = document.getElementById('name')
    userName.innerText = userData['name'];
}


//----------------------search function task------------------------------

/**
 * Loads and displays the number of tasks on the board.
 * @function
 */
function loadNumbersBoard() {
    let board = document.getElementById('board');
    board.innerText = tasks.length;
}


/**
 * Loads and displays the number of tasks in the "ToDo" status.
 * @function
 */
function loadNumersToDo() {
    let toDos = document.getElementById('to-dos');
    toDos.innerText = countTasksByStatus(tasks, 'toDo', 'status');
}


/**
 * Loads and displays the number of tasks in the "In Progress" status.
 * @function
 */
function loadNumersInProgress() {
    let inProgress = document.getElementById('in-progress');
    inProgress.innerText = countTasksByStatus(tasks, 'inProgress', 'status');
}


/**
 * Loads and displays the number of tasks in the "Awaiting Feedback" status.
 * @function
 */
function loadNumersAwaitFeedback() {
    let awaitFeedback = document.getElementById('await-feedback');
    awaitFeedback.innerText = countTasksByStatus(tasks, 'awaitingFeedback', 'status');
}


/**
 * Loads and displays the number of tasks in the "Done" status.
 * @function
 */
function loadNumersDone() {
    let done = document.getElementById('done');
    done.innerText = countTasksByStatus(tasks, 'done', 'status');
}


/**
 * Loads and displays the number of tasks with "Urgent" priority.
 * @function
 */
function loadNumbersUrgent() {
    let urgentNumber = document.getElementById('urgent')
    urgentNumber.innerHTML = countTasksByStatus(tasks, 'urgent', 'priority');
}


/**
 * Counts the number of elements in a collection that have a specific status or attribute value.
 *
 * @param {Array} collection - The collection of elements to count.
 * @param {string} status - The status or attribute value to count.
 * @param {string} attribute - The name of the attribute to check in each element.
 * @returns {number} The count of elements with the specified status or attribute value.
 * @function
 */
function countTasksByStatus(collection, status, attribute) {
    if (Array.isArray(collection) && collection.length > 0) {
        return collection.filter(element => element[attribute] === status).length;
    } else {
        return 0;
    }
}


/**
 * Searches for the earliest urgent date among a collection of tasks.
 *
 * @param {Array} tasks - The collection of tasks to search for the earliest urgent date.
 * @returns {string} The earliest urgent date found in the tasks, or an empty string if no urgent dates are found.
 * @function
 */
function searchFirstUrgantDate() {
    let urgentDate = document.getElementById('date')
    urgentDate.innerHTML = findLatestDate(tasks);
}

//======================== search function task END==============================



//----------------- load Time of Day------------------

/**
 * Loads and displays the time of day on the webpage.
 *
 * @function
 */
function loadTimeOfDay() {
    let HoursOfTheDay = document.getElementById('time-of-day');
    HoursOfTheDay.innerHTML = getTimeOfDay();
}


/**
 * Gets the time of day based on the current hour.
 *
 * @function
 * @returns {string} The time of day message.
 */
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


/**
 * Finds and returns the latest date from a collection of items.
 *
 * @function
 * @param {Array} collection - The collection of items to search for the latest date.
 * @returns {string} The latest date in "YYYY-MM-DD" format or '-' if no valid dates are found.
 */
function findLatestDate(collection) {
    let earliestDate = "2024-10-02";
    let earliestDateItem;
    if (!Array.isArray(collection) || collection.length === 0) {
        return '-';
    }
    collection.forEach(item => {
        if (item && item['date']) {
            let currentDate = item['date'];
            if (compareDates(currentDate, earliestDate) < 0) {
                earliestDate = currentDate;
                earliestDateItem = currentDate;
            }
        }
    });
    return earliestDate;
}


/**
 * Compare two dates in "YYYY-MM-DD" format.
 *
 * @function
 * @param {string} date1 - The first date to compare.
 * @param {string} date2 - The second date to compare.
 * @returns {number} A negative number if date1 is earlier than date2,
 *                   a positive number if date1 is later than date2,
 *                   or 0 if they are equal.
 */
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
    const chopSVGContainer = document.getElementById('chop-container');
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
    const penSVGContainer = document.getElementById('penContainer');
    if (penSVGContainer) {
        penSVGContainer.innerHTML = loadPenSvg();
    }
}

//====================load SVGs END============================