function init() {
    loadTimeOfDay();
    loadSvgPen();
}

//---Search User name----------------------------
function loadUserName() {
    userName = document.getElementById('name')
    userName.innerText = loadUserName();
}

function loadUserName() {
    let userName = document.getElementById('name');
    userName.innerText = searchUserName();
}

function searchUserName() {}

//================Search User name END==============================

//----------------- load Time of Day------------------
function loadTimeOfDay() {
    let HoursOfTheDay = document.getElementById('time-of-day');
    HoursOfTheDay.innerText = getTimeOfDay();
}

function getTimeOfDay() {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 6) {
        return "Schöne Nacht";
    } else if (currentHour >= 6 && currentHour < 12) {
        return "Guten Morgen";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "Guten Nachmittag";
    } else {
        return "Guten Abend";
    }
}

//===================load Time of Day END============================

function loadSvgPen() {
    const penSVGContainer = document.getElementById('penContainer'); // Ändern Sie den Namen des Elements, auf das Sie zugreifen möchten
    const penSVGContent = loadPenSvg();
    penSVGContainer.innerHTML = penSVGContent;
}