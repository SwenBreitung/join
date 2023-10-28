const STORAGE_TOKEN = 'WPFKLL9AMIDPXQR1EISWWODPTCHU7V6AK4EGRIVD';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


const colorArray = [
    "#006400", "#00008B", "#8B0000", "#800080", "#808080",
    "#0000CD", "#008000", "#FF0000", "#8A2BE2", "#FFA500",
    "#2E8B57", "#9932CC", "#DC143C", "#228B22", "#20B2AA",
    "#FF1493", "#D2691E", "#00CED1", "#008080", "#FF6347"
];


let users = [{
    "id": "",
    "name": "",
    "email": "",
    "password": "",
    "color": "",
}];

let contacts = [
    // { "id": "0", "name": "Alice Johnson", "email": "alice.johnson@example.com", "phone": "+1234567890", "color": "#006400" },
    // { "id": "1", "name": "Bob Marley", "email": "bob.marley@example.com", "phone": "+1234567891", "color": "" },
    // { "id": "2", "name": "Charlie Brown", "email": "charlie.brown@example.com", "phone": "+1234567892", "color": "#006400" },
    // { "id": "3", "name": "David Bowie", "email": "david.bowie@example.com", "phone": "+1234567893", "color": "#006400" },
    // { "id": "4", "name": "Eva Green", "email": "eva.green@example.com", "phone": "+1234567894", "color": "#006400" },
    // { "id": "5", "name": "Frank Sinatra", "email": "frank.sinatra@example.com", "phone": "+1234567895", "color": "#006400" },
    // { "id": "6", "name": "Grace Kelly", "email": "grace.kelly@example.com", "phone": "+1234567896", "color": "#006400" },
    // { "id": "7", "name": "Henry Ford", "email": "henry.ford@example.com", "phone": "+1234567897", "color": "#006400" },
    // { "id": "8", "name": "Ivy Lee", "email": "ivy.lee@example.com", "phone": "+1234567898", "color": "#006400" },
    // { "id": "9", "name": "Jack Daniels", "email": "jack.daniels@example.com", "phone": "+1234567899", "color": "#006400" },
    // { "id": "10", "name": "Kim Possible", "email": "kim.possible@example.com", "phone": "+1234567800", "color": "#006400" },
    // { "id": "11", "name": "Lara Croft", "email": "lara.croft@example.com", "phone": "+1234567801", "color": "#006400" },
    // { "id": "12", "name": "Mickey Mouse", "email": "mickey.mouse@example.com", "phone": "+1234567802", "color": "#006400" },
    // { "id": "13", "name": "Nancy Drew", "email": "nancy.drew@example.com", "phone": "+1234567803", "color": "#006400" },
    // { "id": "14", "name": "Oscar Wilde", "email": "oscar.wilde@example.com", "phone": "+1234567804", "color": "#006400" },
    // { "id": "15", "name": "Pamela Anderson", "email": "pamela.anderson@example.com", "phone": "+1234567805", "color": "#006400" },
    // { "id": "16", "name": "Quincy Jones", "email": "quincy.jones@example.com", "phone": "+1234567806", "color": "#006400" },
    // { "id": "17", "name": "Rachel Green", "email": "rachel.green@example.com", "phone": "+1234567807", "color": "#006400" },
    // { "id": "18", "name": "Steve Jobs", "email": "steve.jobs@example.com", "phone": "+1234567808", "color": "#006400" },
    // { "id": "19", "name": "Tina Turner", "email": "tina.turner@example.com", "phone": "+1234567809", "color": "#006400" }
]

let tasks = [{
        "id": "0",
        "category": "Work",
        "title": "Design new logo",
        "text": "Design a new logo for our upcoming product",
        "time": "15:00",
        "date": "2023-09-30",
        "priority": "urgent",
        "status": "toDo",
        "contacts": [
            { "name": "Alice", "color": "#FF5733" },
            { "name": "Bob", "color": "#33FF57" }
        ]
    },
    {
        "id": "1",
        "category": "Personal",
        "title": "Buy groceries",
        "text": "Milk, bread, eggs, and some fruits",
        "time": "17:30",
        "date": "2023-09-30",
        "priority": "normal",
        "status": "in-progress",
        "contacts": [
            { "name": "Charlie", "color": "#5733FF" },
            { "name": "Dave", "color": "#FFFF33" }
        ]
    },
    {
        "id": "2",
        "category": "Study",
        "title": "Finish homework",
        "text": "Complete math assignment and prepare for history quiz",
        "time": "20:00",
        "date": "2023-09-30",
        "priority": "low",
        "status": "in-progress",
        "contacts": [
            { "name": "Eve", "color": "#FF33FF" },
            { "name": "Frank", "color": "#33FFFF" }
        ]
    }
];


async function loadContactsFromBackend() {
    await loadBackendData('contacts')
}

async function loadTasksFromBackend() {
    await loadBackendData('tasks')
}

async function loadBackendData(key) {
    try {
        arryData = JSON.parse(await getItem(key));
        if (key === 'tasks') {
            tasks = arryData;
        } else if (key === 'contacts') {
            contacts = arryData;
        }
    } catch (e) {
        console.error('Loading error:', e);
    }
}

async function setItem(key, value) {
    console.log("Key:", key);
    console.log("Value:", value);
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        console.log(res); // Log the entire response object
        if (res.data) {
            console.log(res.data); // Log the data object
            return res.data.value;
        }
        throw `Could not find data with key "${key}".`;
    }).catch(error => {
        console.error("Error in fetching data:", error);
    });
}

async function uploadBackendDatas(key, dataToUpload) {
    try {
        // Überprüfen, ob die übergebenen Daten gültig sind, falls gewünscht/erforderlich.
        if (!dataToUpload) {
            throw new Error('No data to upload');
        }
        // Wandle die Daten in einen String um, wenn sie es noch nicht sind.
        const dataString = JSON.stringify(dataToUpload);

        // Verwende setItem, um die Daten zum Backend zu senden.
        const response = await setItem(key, dataString);

        // Überprüfe die Antwort vom Server und handle entsprechende Logik (optional).
        if (response.error) {
            throw new Error(`Server error: ${response.error}`);
        }
    } catch (error) {
        // Hier Fehler loggen oder anderweitig behandeln.
        console.error('Error uploading data:', error);
    }
}


localStorage.setItem('user', JSON.stringify({
    "id": "0",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123",
    "color": "#FF6347",
}));