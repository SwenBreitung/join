async function initializeDraggable() {
    new Sortable(toDo, {
        group: 'shared',
        filter: '.dont-taks',
        clone: true,
        animation: 150,
        onStart: async function(evt) {},
        onEnd: function(evt) {
            var clone = evt.clone;
            if (clone) {
                clone.classList.remove('sortable-drag');
            }
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
            let userId = evt.item.id;
            tasks[userId].status = evt.to.id;
            savetasksDataToBakcend();
            loadTasks();
        }
    });
}


var customDragGhostList = new Sortable(document.getElementById('custom-drag-ghost-list'), {
    animation: 150
});

var customDragGhostList = new Sortable(
    document.getElementById("custom-drag-ghost-list"), {
        animation: 150
    }
);