let number_plate = undefined;

$(document).ready(() => {
    $.get("./engine/getCurrentAuto.php", (data) => {number_plate = data;}).done(function () {
        loadData(number_plate);
        checkQuotationStatus(number_plate);
    });

    $('button.btn-success').click(function () {
        goToLink(number_plate);
    });

    $('#regenerate-link').click(function () {
        regenerateLink(number_plate);
    });
});

function restartTimer() {
    let finalDate = new Date();
    finalDate.setMinutes(finalDate.getMinutes() + 20);

    $('#payment-timer').countdown(finalDate, function (event) {
        $(this).text(
            event.strftime('%M:%S')
        );
    }).on('finish.countdown', function () {
        $('#paymentExpired').show('fast');
        $('#paymentActive').hide();
        $('.buy-btn .btn.btn-success').addClass('disabled');
    });
}

function prepareLink() {
    $('#getLink').toast('show');
    $('button.btn-success').addClass('disabled');
}

function linkPrepared() {
    $('#paymentReady').toast('show');
    restartTimer();
    $('.buy-btn .btn.btn-success').removeClass('disabled');
    $('#paymentActive').slideToggle('fast');
}

$(window).on('focus', () => {
    checkPayment(number_plate);
})