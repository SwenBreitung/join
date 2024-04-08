// const STORAGE_TOKEN = 'WPFKLL9AMIDPXQR1EISWWODPTCHU7V6AK4EGRIVD';
// const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
const STORAGE_URL = 'http://127.0.0.1:8000/'
let newContact = {};

const colorArray = [
    "#006400", "#00008B", "#8B0000", "#800080", "#808080",
    "#0000CD", "#008000", "#FF0000", "#8A2BE2", "#FFA500",
    "#2E8B57", "#9932CC", "#DC143C", "#228B22", "#20B2AA",
    "#FF1493", "#D2691E", "#00CED1", "#008080", "#FF6347"
];


let users = [{
    "id": "1",
    "name": "Gast Benutzer",
    "email": "gast@example.com",
    "password": "gast123",
    "color": "#00008B",
}];


let contacts = [
    { email: 'john.doe0@example.com', id: '0', name: 'John Doe', phone: '0972713325', color: '#2E8B57' },
    { email: 'emily.smith1@example.com', id: '1', name: 'Emily Smith', phone: '0095987325', color: '#FFA500' },
    { email: 'david.jones2@example.com', id: '2', name: 'David Jones', phone: '0966278427', color: '#006400' },
    { email: 'sarah.brown3@example.com', id: '3', name: 'Sarah Brown', phone: '0872816737', color: '#FFA500' },
    { email: 'michael.johnson4@example.com', id: '4', name: 'Michael Johnson', phone: '0825696908', color: '#D2691E' },
    { email: 'linda.williams5@example.com', id: '5', name: 'Linda Williams', phone: '0223202438', color: '#008080' },
    { email: 'robert.miller6@example.com', id: '6', name: 'Robert Miller', phone: '0165419875', color: '#800080' },
    { email: 'jessica.davis7@example.com', id: '7', name: 'Jessica Davis', phone: '0358325901', color: '#FF0000' },
    { email: 'thomas.wilson8@example.com', id: '8', name: 'Thomas Wilson', phone: '0093827840', color: '#8A2BE2' },
    { email: 'sophia.martinez9@example.com', id: '9', name: 'Sophia Martinez', phone: '0143828786', color: '#FFA500' },
    { email: 'richard.anderson10@example.com', id: '10', name: 'Richard Anderson', phone: '0374347763', color: '#FFA500' },
    { email: 'patricia.thomas11@example.com', id: '11', name: 'Patricia Thomas', phone: '0484213711', color: '#FFA500' },
    { email: 'mark.jackson12@example.com', id: '12', name: 'Mark Jackson', phone: '0827676172', color: '#FF6347' },
    { email: 'laura.moore13@example.com', id: '13', name: 'Laura Moore', phone: '0509285380', color: '#FF6347' },
    { email: 'kevin.taylor14@example.com', id: '14', name: 'Kevin Taylor', phone: '0531149849', color: '#808080' },
    { email: 'amanda.white15@example.com', id: '15', name: 'Amanda White', phone: '0740856485', color: '#20B2AA' },
    { email: 'stephen.harris16@example.com', id: '16', name: 'Stephen Harris', phone: '0657233179', color: '#D2691E' },
    { email: 'rebecca.lee17@example.com', id: '17', name: 'Rebecca Lee', phone: '0072715564', color: '#800080' },
    { email: 'brian.garcia18@example.com', id: '18', name: 'Brian Garcia', phone: '0490237022', color: '#D2691E' },
    { email: 'nicole.clark19@example.com', id: '19', name: 'Nicole Clark', phone: '0037647558', color: '#DC143C' }
];

let tasks = [{
        "id": "0",
        "category": "Work",
        "title": "Design new logo",
        "description": "Design a new logo for our upcoming product",
        "time": "15:00",
        "date": "2023-09-30",
        "priority": "urgent",
        "status": "awaitingFeedback", // Status aktualisiert zu "awaitingFeedback"
        "contacts": [
            { "name": "Rebecca Lee", "color": "#FF5733" },
            { "name": "Sarah Brown", "color": "#33FF57" }
        ],
        "subtasks": [
            { "name": "Sketch design", "status": true },
            { "name": "Finalize design", "status": false }
        ]
    },
    {
        "id": "1",
        "category": "Personal",
        "title": "Buy groceries",
        "description": "Milk, bread, eggs, and some fruits",
        "time": "17:30",
        "date": "2023-09-30",
        "priority": "medium",
        "status": "done",
        "contacts": [
            { "name": "Brian Garcia", "color": "#5733FF" },
            { "name": "Jessica Davis", "color": "#FFFF33" }
        ],
        "subtasks": [
            { "name": "Buy milk", "status": true },
            { "name": "Buy bread", "status": true }
        ]
    },
    {
        "id": "2",
        "category": "Study",
        "title": "Finish homework",
        "description": "Complete math assignment and prepare for history quiz",
        "time": "20:00",
        "date": "2023-09-30",
        "priority": "low",
        "status": "inProgress",
        "contacts": [
            { "name": "Linda Williams", "color": "#FF33FF" },
            { "name": "Emily Smith", "color": "#33FFFF" }
        ],
        "subtasks": [
            { "name": "Math assignment", "status": true },
            { "name": "History quiz preparation", "status": false }
        ]
    }
];


/**
 * Loads all data from the backend, including tasks and contacts.
 * This function asynchronously loads tasks and contacts data from the backend.
 */
async function loadAllDataFromBackend() {
    await loadTasksFromBackend();
    // await loadContactsFromBackend();
}


/**
 * Loads contacts data from the backend by using the 'loadBackendData' function.
 * This function asynchronously loads contacts data from the backend.
 */
async function loadContactsFromBackend() {
    await loadBackendData('contacts')
}


/**
 * Loads tasks data from the backend by using the 'loadBackendData' function.
 * This function asynchronously loads tasks data from the backend.
 */
async function loadTasksFromBackend() {
    await loadBackendData('tasks')
}


/**
 * Loads data from the backend based on the provided key.
 *
 * @param {string} key - The key to identify the type of data to load from the backend.
 */
async function loadBackendData(key) {
    try {
        arryData = await getItem(key);
        console.log(arryData)
        if (key === 'tasks') {
            tasks = arryData;
            resetId(tasks);
        } else if (key === 'contacts') {
            contacts = arryData;
            resetId(contacts);
        }

    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * Resets the IDs of tasks in an array to match their index positions.
 *
 * @param {Array} tasks - The array of tasks to reset IDs for.
 */
function resetId(tasks) {
    for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];
        task.id = index;
    }
}


/**
 * Sets an item with the specified key and value in storage via a POST request.
 *
 * @param {string} key - The key of the item to set.
 * @param {string} value - The value to set for the item.
 * @returns {Promise} A promise that resolves when the item is successfully set in storage.
 */
// async function setItem(key, value) {
//     // stringify
//     const payload = { key, value, token: STORAGE_TOKEN };
//     return fetch(STORAGE_URL + key + `/`, { method: 'PATCH', body: JSON(payload) })
//         .then(res => res.json());
// }
async function setItem(key, value) {
    // stringify   
    const url = `${STORAGE_URL}/${key}/`;
    console.log(url);

    // Bereiten Sie den Payload vor. Ich gehe davon aus, dass value bereits das ist, was Sie senden möchten.
    // Wenn value ein Objekt ist, das Sie direkt senden möchten, ist das in Ordnung. Andernfalls müssen Sie möglicherweise value anders strukturieren.
    const payload = JSON.stringify(value); // Nehmen wir an, value ist das, was Sie senden möchten.
    console.log("Sending data:", JSON.stringify(value));
    console.log(tasks, 'tasks');
    fetch('http://127.0.0.1:8000/tasks/refresh-tasks/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));


    // Nehmen wir an, Sie möchten die Antwort als JSON.
    // let todos = await resp.json();
    // console.log(todos);
    // Verwenden Sie 'POST' zum Senden von Daten

}

/**
 * Retrieves an item with the specified key from storage via a GET request.
 *
 * @param {string} key - The key of the item to retrieve.
 * @returns {Promise} A promise that resolves with the retrieved item's value or rejects with an error.
 */
// &token=${STORAGE_TOKEN}
async function getItem(key) {
    const url = `${STORAGE_URL}/${key}/`;
    console.log(url)
    let resp = await fetch(url)
    console.log(resp)
    todos = await resp.json();
    console.log(todos, 'todos')
    return todos
        // return fetch(url).then(res => res.json()).then(res => {
        //     if (res.data) {
        //         return res.data.value;
        //     }
        //     throw `Could not find data with key "${key}".`;
        // }).catch(error => {
        //     console.error("Error in fetching data:", error);
        // });
}


/**
 * Uploads data to the backend using the specified key.
 *
 * @param {string} key - The key under which the data will be stored in the backend.
 * @param {any} dataToUpload - The data to upload to the backend.
 * @returns {Promise} A promise that resolves when the data is successfully uploaded, or rejects with an error.
 */
async function uploadBackendDatas(key, dataToUpload) {
    try {
        if (!dataToUpload) {
            throw new Error('No data to upload');
        }
        let dataString = dataToUpload
            // const dataString = JSON.stringify(dataToUpload);
        const response = await setItem(key, dataString);
        if (response.error) {
            throw new Error(`Server error: ${response.error}`);
        }
    } catch (error) {}
}


/**
 * Loads user data from the browser's local storage.
 *
 * @returns {object|null} The loaded user data if found, or null if not found.
 */
function loadUserDataFromLocalStorage() {
    userData = localStorage.getItem('userData');
    if (userData) {
        userData = JSON.parse(userData);
    } else {
        return null;
    }
}


/**
 * Loads user data from the backend.
 *
 * @returns {Promise} A promise that resolves with the loaded user data or rejects with an error.
 */
async function loadBackendUsers() {
    loadBackendData('users')
}


/**
 * Saves user data to the backend.
 *
 * @returns {Promise} A promise that resolves when the data is successfully saved or rejects with an error.
 */
function saveUserDataToBakcend() {
    uploadBackendDatas('users', users)
}


/**
 * Clears the tasks array and resets the currentId value.
 *
 * @returns {Promise} A promise that resolves when the data is successfully cleared and saved or rejects with an error.
 */
async function clearArray() {
    tasks.splice(0, tasks.length);
    currentId = ""
    updateBoardHTML
    await setItem('tasks', JSON.stringify(tasks));
    await setItem('currentId', JSON.stringify(currentId));
}