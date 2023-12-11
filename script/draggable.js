async function initializeDraggable() {
    // new Sortable(toDo, {
    //     group: 'shared',
    //     filter: '.dont-taks',
    //     clone: true,
    //     animation: 100,
    //     dragClass: 'my-custom-ghost',
    //     onStart: async function(evt) {
    //         // Diese Funktion wird aufgerufen, nachdem das Sortable-Objekt initialisiert ist

    //         // Die `ghostClass`-Eigenschaft festlegen
    //         // evt.sortable.ghostClass = "bg-primary";

    //         // // Das Ghost-Element abrufen
    //         // var ghostElement = evt.sortable.ghost;

    //         // // Das Ghost-Element um 30 Grad kippen
    //         // ghostElement.style.transform = "rotate(30deg)";
    //         // ghostElement.style.webkitTransform = "rotate(30deg)";
    //         // ghostElement.style.mozTransform = "rotate(30deg)";

    //         // console.log('Drag-and-drop operation started', evt);
    //     },
    //     // onMove: function(evt) {
    //     //     var draggedElement = evt.dragged; // Das aktuell gezogene Element

    //     //     draggedElement.classList.add('sortable-drag');
    //     // },
    //     onEnd: function(evt) {
    //         // Diese Funktion wird aufgerufen, wenn der Drag-and-Drop-Vorgang beendet ist
    //         var clone = evt.clone;
    //         if (clone) {
    //             clone.classList.remove('sortable-drag');
    //         }

    //         console.log('Drag-and-Drop-Vorgang beendet', evt);
    //         let userId = evt.item.id;
    //         tasks[userId].status = evt.to.id;
    //         savetasksDataToBakcend();
    //         loadTasks();
    //     }
    // });



    new Sortable(toDo, {
        group: 'shared',
        filter: '.dont-taks',
        clone: true,
        animation: 10000,
        // dragClass: 'my-custom-ghost',
        onStart: async function(evt) {
            // Diese Funktion wird aufgerufen, nachdem der Drag-and-Drop-Vorgang gestartet wurde

            // Das clone-Element abrufen
            // const cloneElement = evt.clone;
            // setInterval(checkForClass, 1000);
            // Das clone-Element um 200 Grad kippen
            // cloneElement.style.transform = 'rotate(200deg)';

            console.log('Drag-and-Drop-Vorgang gestartet', evt);
        },
        // onMove: function(evt) {
        //   // Das Ghost-Element um 30 Grad kippen
        //   var ghostElement = evt.sortable.ghost;
        //   ghostElement.style.transform = 'rotate(30deg)';
        //   ghostElement.style.webkitTransform = 'rotate(30deg)';
        //   ghostElement.style.mozTransform = 'rotate(30deg)';
        // },
        onEnd: function(evt) {
            // Diese Funktion wird aufgerufen, wenn der Drag-and-Drop-Vorgang beendet ist
            var clone = evt.clone;
            if (clone) {
                clone.classList.remove('sortable-drag');
            }

            console.log('Drag-and-Drop-Vorgang beendet', evt);
            let userId = evt.item.id;
            tasks[userId].status = evt.to.id;
            savetasksDataToBakcend();
            loadTasks();
        }
    });




    new Sortable(inProgress, {
        group: 'shared',
        filter: '.dont-taks',
        animation: 150,
        onEnd: function(evt) {
            // Diese Funktion wird aufgerufen, wenn der Drag-and-Drop-Vorgang beendet ist
            console.log('Drag-and-Drop-Vorgang beendet', evt.to.id, );
            console.log('Gezogenes Element:', evt.item.id);
            let userId = evt.item.id;
            tasks[userId].status = evt.to.id;
            savetasksDataToBakcend();
            loadTasks();

        }
    });


    new Sortable(awaitingFeedback, {
        group: 'shared',
        filter: '.dont-taks',
        animation: 150,
        onEnd: function(evt) {
            // Diese Funktion wird aufgerufen, wenn der Drag-and-Drop-Vorgang beendet ist
            console.log('Drag-and-Drop-Vorgang beendet', evt);
            let userId = evt.item.id;
            tasks[userId].status = evt.to.id;
            savetasksDataToBakcend();
            loadTasks();;
        }
    });


    new Sortable(done, {
        group: 'shared',
        filter: '.dont-taks',
        animation: 150,
        onEnd: function(evt) {
            // Diese Funktion wird aufgerufen, wenn der Drag-and-Drop-Vorgang beendet ist
            console.log('Drag-and-Drop-Vorgang beendet', evt);
            let userId = evt.item.id;
            tasks[userId].status = evt.to.id;
            savetasksDataToBakcend();
            loadTasks();
        }
    });

}

function rotateGhostElement(evt) {
    // Das Ghost-Element abrufen
    var ghostElement = evt.sortable.ghost;

    // Das Ghost-Element um 30 Grad kippen
    ghostElement.style.webkitTransform = "rotate(30deg)";
    ghostElement.style.mozTransform = "rotate(30deg)";
}
var customDragGhostList = new Sortable(document.getElementById('custom-drag-ghost-list'), {
    // Just for appearance
    animation: 150
});

var customDragGhostList = new Sortable(
    document.getElementById("custom-drag-ghost-list"), {
        // Just for appearance
        animation: 150
    }
);


// function checkForClass() {
//     // Alle Elemente im DOM abrufen
//     const elements = document.querySelectorAll('*');

//     // Für jedes Element im DOM
//     for (const element of elements) {
//         // Wenn das Element die Klasse `my-custom-ghost` hat
//         if (element.classList.contains('my-custom-ghost')) {
//             // Eine Style-Eigenschaft mit einer Rotation hinzufügen
//             element.style.transform = 'rotate(200deg)';
//         }
//     }
// }