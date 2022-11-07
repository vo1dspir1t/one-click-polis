$(document).ready(() => {
    let number_plate;
    $.get("./engine/getCurrentAuto.php", (data) => {number_plate = data;}).done(function () {
        loadData(number_plate);
        $('button[name=next]').addClass('disabled').removeClass('btn-success').addClass('btn-secondary').html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Загрузка...`);
        makeInsuredObjects(number_plate).done(function () {
            if (Object.keys(store.get(number_plate).response.agreement).length == 0) {
                precalculate(number_plate).done(function () {
                    patchAgreement(number_plate);
                });
            } else {
                patchAgreement(number_plate);
            }
        });
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