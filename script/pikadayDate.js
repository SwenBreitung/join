//only for date-input by addTask.html/ Due date//

document.addEventListener('DOMContentLoaded', function () {
    var dateInput = document.getElementById('datepicker');

    var picker = new Pikaday({
        field: dateInput,
        position: 'top left',
        format: 'DD/MM/YYYY',
        minDate: new Date(), // Das stellt sicher, dass kein Datum vor dem heutigen Datum ausgewählt werden kann.
        onSelect: function (date) {
            const formattedDate = [
                date.getDate().toString().padStart(2, '0'),
                (date.getMonth() + 1).toString().padStart(2, '0'),
                date.getFullYear()
            ].join('/');
            dateInput.value = formattedDate;
        }
    });

    dateInput.addEventListener('focus', function () {
        if (!this.value) {
            const today = new Date();
            const formattedDate = [
                today.getDate().toString().padStart(2, '0'),
                (today.getMonth() + 1).toString().padStart(2, '0'),
                today.getFullYear()
            ].join('/');
            this.value = formattedDate;
            picker.show();
        }
    });
});
