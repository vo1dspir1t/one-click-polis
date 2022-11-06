$(document).ready(() => {
    let number_plate;
    $.get("./engine/getCurrentAuto.php", (data) => {number_plate = data;}).done(function () {
        loadOwnerObjectFromStorage(number_plate);

        //Сохранение данных о сроке действия полиса
        let validFrom = new Date();
        let validTo = new Date();
        validFrom.setDate(validFrom.getDate() + 4);
        validTo.setDate(validTo.getDay()+367);

        store.add(number_plate, {
            periods: {
                start_date: validFrom.toISOString().substr(0,10),
                end_date: validTo.toISOString().substr(0,10)
            }
        });
    });

    //Маски для полей ввода
    $('input[name=credential_numbers],input[name=insurance_credential_numbers]').inputmask({
        "mask": "9999 999999",
        placeholder: "1234 567890",
        clearMaskOnLostFocus: true
    });

    $('input[name=credential_issue_point],input[name=insurance_credential_issue_point]').inputmask({
        "mask": "999 999",
        placeholder: "123 456",
        clearMaskOnLostFocus: true
    });

    $('input[name=contact_type_email]').inputmask({
        alias: "email",
        jitMasking: true,
        showMaskOnFocus: false,
        showMaskOnHover: false
    });

    $('input[name=contact_type_phone]').inputmask({
        "mask": "+7 (999) 999 99 99",
        placeholder: "+7 (123) 456 78 90",
        clearMaskOnLostFocus: true
    });

    $('#credential_issue_date, #birth_date, #insurance_birth_date, #insurance_credential_issue_date').inputmask({
        alias: "datetime",
        inputFormat: "dd.mm.yyyy",
        outputFormat: "yyyy-mm-dd",
        clearIncomplete: true
    });

    //Чекбоксы
    $('#flexCheckDefault').click(() => {
        $('.alert .alertBox').slideToggle('slow');
        $('.alert .alertBox').find('input').each(function (index, element) {
            $(element).prop('required', !$(element).prop('required'));
        });
        loadInsurantObjectFromStorage(number_plate);
    });

    $('#agreesWithInfo').click(() => {
        $('button[type=submit]').toggleClass('disabled');
    });

    $('#no_flat').click(() => {
        toggleOwnerFlatInput();
    })

    $('#insurance_no_flat').click(() => {
        let flatInput = $('input[name=insurance_address_query_flat]');
        flatInput.prop('disabled', !flatInput.prop('disabled'));
        flatInput.prop('required', !flatInput.prop('required'));
    })

    //Кнопки перехода по страницам
    $('button[name=back]').click(() => {
        window.location.href = './drivers.html';
    });

    $('.needs-validation').submit(function (e) {
        toggleInputs(false);
        if (!this.checkValidity()) {
            scrollToInvalidInput();
        }
        $(this).addClass('was-validated');
        e.preventDefault();
        e.stopPropagation();
        if (this.checkValidity()) {
            $('button[type=submit]').addClass('disabled').removeClass('btn-success').addClass('btn-secondary').html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Загрузка...`);
            try {
                if (Object.keys(store.get(number_plate).response.owner).length > 0 && Object.keys(store.get(number_plate).response.insurant).length > 0) {
                    window.location.href = './dataConfirmation.html';
                } else {
                    makeOwnerObject(number_plate).done(function () {
                        makeInsurantObject(number_plate, true);
                    });
                }
            } catch (e) {
                window.location.href = './car.html';
            }
        }
    });

    function scrollToInvalidInput() {
        $('html, body').animate({
            scrollTop: $('.form-control:invalid').first().offset().top-$(window).height()/2
        }, 250);
    }

    function toggleInputs(value) {
        $('.form-control').each(function () {
            $(this).prop("disabled", value);
        });

        $('select').each(function () {
            $(this).prop("disabled", value);
        });
    }

    //Сохранение данных
    $(document).on('focusout', 'input', function () {
        saveOwnerObjectToStorage(number_plate);
    });

    $(document).on('change', 'input[type=checkbox]', function () {
        saveOwnerObjectToStorage(number_plate);
    });

    $('select').change(function () {
        saveOwnerObjectToStorage(number_plate);
    });
});

function toggleOwnerFlatInput() {
    let flatInput = $('input[name=address_query_flat]');
    flatInput.prop('disabled', !flatInput.prop('disabled'));
    flatInput.prop('required', !flatInput.prop('required'));
}

function clearInsurantInputs() {
    $('.alert input[type=text]').each(function () {
        $(this).val('');
    });
}