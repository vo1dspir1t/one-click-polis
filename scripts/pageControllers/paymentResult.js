$(document).ready(() => {
    let number_plate;
    $.get("./engine/getCurrentAuto.php", (data) => {number_plate = data;}).done(function () {
        loadData(number_plate);
    });

    $('button.btn-success').click(function () {
        prepareLink();
    });

    $('button.btn-outline-secondary').click(() => {
        window.location.href = './results';
    });
});

function restartTimer() {
    let finalDate = new Date();
    finalDate.setMinutes(finalDate.getMinutes() + 30);

    $('#payment-timer').countdown(finalDate, function (event) {
        $(this).text(
            event.strftime('%M:%S')
        );
    });
}

function prepareLink() {
    $('#getLink').toast('show');
    restartTimer();
    $('button.btn-success').addClass('disabled');
    setTimeout(() => {
        $('#gotoPayment').toast('show');
        $('button.btn-success').removeClass('disabled');
    }, 3000);
}