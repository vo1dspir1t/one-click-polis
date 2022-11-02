$(document).ready(() => {
    let number_plate;
    $.get("./engine/getCurrentAuto.php", (data) => {number_plate = data;}).done(function () {
        loadData(number_plate);
    });

    $('button').click(function () {
        prepareLink();
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
    $('button').addClass('disabled');
    setTimeout(() => {
        $('#gotoPayment').toast('show');
        $('button').removeClass('disabled');
    }, 3000);
}