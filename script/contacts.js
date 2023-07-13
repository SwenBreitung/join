let bundesleander = [
    { "name": "Baden-Württemberg", "population": 11100394 },
    { "name": "Bayern", "population": 13124737 },
    { "name": "Berlin", "population": 3669491 },
    { "name": "Brandenburg", "population": 2521893 },
    { "name": "Bremen", "population": 682986 },
    { "name": "Hamburg", "population": 1847253 },
    { "name": "Hessen", "population": 6288080 },
    { "name": "Mecklenburg-Vorpommern", "population": 1608138 },
    { "name": "Niedersachsen", "population": 7982448 },
    { "name": "Nordrhein-Westfalen", "population": 17947221 },
    { "name": "Rheinland-Pfalz", "population": 4093903 },
    { "name": "Saarland", "population": 986887 },
    { "name": "Sachsen", "population": 4071971 },
    { "name": "Sachsen-Anhalt", "population": 2208321 },
    { "name": "Schleswig-Holstein", "population": 2896712 },
    { "name": "Thüringen", "population": 2133378 }
];


let letters = [];
let alphabet = [];



function init() {
    loadAlphabet();
    loadAlphabetTemplete();
    includeHTML();
}


function loadAlphabet() {
    for (let i = 65; i <= 90; i++) {
        alphabet.push(String.fromCharCode(i));
    }
}


function loadAlphabetTemplete() {
    for (let i = 0; i < alphabet.length; i++) {
        let letter = alphabet[i];
        contacts = document.getElementById('contacts')

        contacts.innerHTML += /*html*/ `
        <div id="letter${i}" onclick="loadContaktInfo(${i})">
            <div class="font-weight-bold" id="letter">${letter}</div>
            <div class="line"><div id="line"></div></div>
            <div id="contact${i}"></div>
        </div>
        `
        loadContactsSearch(letter, i);
    }
}


function loadContactsSearch(letter, y) {
    for (let i = 0; i < bundesleander.length; i++) {
        let name = bundesleander[i]['name'];
        if (name.charAt(0).toUpperCase() === letter.toUpperCase()) {
            loadContactsData(i, letter, y);
        }
    }
}


function loadContactsData(i, letter, y) {
    bundesleanderTemplate = document.getElementById(`contact${y}`);
    let bundeslandAsJson = bundesleander[i];
    let name = bundeslandAsJson['name'];
    let population = bundeslandAsJson['population'];
    let url = bundeslandAsJson['url']
    bundesleanderTemplate.innerHTML += loadBundeslandTamlete(name, population, url, i, letter)
}


function loadBundeslandTamlete(name, population, i, y) {
    return ( /*html*/ ` 
        <div>
            <h3>${name}</h3> 
            <div> ${population }Millionen</div>         
        </div>                          
        `)
}


function loadContaktInfo(i) {
    let InfoField = document.getElementById('contact-info');
    let contaktInfo = bundesleander[i];


}