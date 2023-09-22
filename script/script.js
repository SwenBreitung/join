userDummy = [
    {
        'user0':
        {
            'name': '',
            'nameAbbreviation': '',
            'color': '',
        }
    }
]


taskDummy = [
    {
        'task#1':
        {
            'category': '',
            'titel': '',
            'description': '',
            'Contacts':
            {
                'name': [],
                'color': [],
                'nameAbbreviation': [],
            },
            'subTask': [],
            'prio': '',
            'dueDate': '',
        },
    }
];


let users = [];
let taskToDo = [];
let taskInProgress = [];
let taskAwaitFeedback = [];
let taskDone = [];


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


function closeDialog() {
    document.getElementById('dialog-full').classList.add('d-none');
}