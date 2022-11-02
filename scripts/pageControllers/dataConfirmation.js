$(document).ready(() => {
    let number_plate;
    $.get("./engine/getCurrentAuto.php", (data) => {number_plate = data;}).done(function () {
        loadData(number_plate);
    });

    $('input[name=sendInsuranceTo]').inputmask({
        alias: "email",
        jitMasking: true,
        showMaskOnFocus: false,
        showMaskOnHover: false
    });

    //Кнопки перехода по страницам
    $('button[name=back]').click(() => {
        window.location.href = './owner.html';
    });

    $('button[name=next]').click(() => {
        $('#email-input').addClass('was-validated');
        if ($('input[name=sendInsuranceTo]').inputmask("isComplete")) {
            window.location.href = './results.html';
        }
    });
});