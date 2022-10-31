$(document).ready(() => {
    let number_plate;
    $.get("./engine/getCurrentAuto.php", (data) => {number_plate = data;}).done(function () {
        getDriversData();
        reloadMasks($(document));
    });

    //Добавление и удаление водителей
    $('.form-select').change(function () {
        cloneDriver(parseInt(this.value));
    });

    //Чекбокс "Водитель менял права в течение года"
    $(document).on('click', 'input[name=license_changed]',function () {
        toggleDriverChangedLicense($(this).closest('.alert'));
    });

    //Чекбокс "Помню только год"
    $(document).on('click', 'input[name=yearOnly]', function () {
        setCheckboxInput($(this));
    });

    //Кнопки перехода по страницам
    $('button[name=back]').click(() => {
        window.location.href = './car.html';
    });

    $('input:disabled').dblclick(function () {
        toggleInputs(false);
    });

    $('.needs-validation').submit(function (e) {
        toggleInputs(false);
        if (!this.checkValidity()) {
            scrollToInvalidInput();
        }
        $(this).addClass('was-validated');
        e.preventDefault();
        e.stopPropagation();
        if (this.checkValidity() || parseInt($('select').val()) == 0 ) {
            window.location.href = './owner.html';
        }
    });

    //Сохранение данных
    $(document).on('focusout', 'input', function () {
        saveDriversObjectToStorage(number_plate);
    });

    $(document).on('change', 'input[type=checkbox]', function () {
        saveDriversObjectToStorage(number_plate);
    });

    $('select').change(function () {
        saveDriversObjectToStorage(number_plate);
    });
});

//Маски для полей ввода
function reloadMasks(selector) {
    $(selector).find('input[name=driver_licenses_numbers]').inputmask({
        "mask": "9999 999999",
        placeholder: "1234 567890",
        clearMaskOnLostFocus: true
    });

    $(selector).find('input[name=previous_driver_licenses_numbers]').inputmask({
        "mask": "9999 999999",
        placeholder: "1234 567890",
        clearMaskOnLostFocus: true
    });

    $(selector).find('#driving_experience_started, #birth_date').inputmask({
        alias: "datetime",
        inputFormat: "dd.mm.yyyy",
        outputFormat: "yyyy-mm-dd",
        clearIncomplete: true
    });
}

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

function cloneDriver(selectValue) {
    let driversCount = $('.drivers').find('.driver').length;
    let currentValue = selectValue;
    $('.drivers').show('slow');
    if (currentValue > driversCount && currentValue > 0) {
        $.each(new Array(currentValue-driversCount), function (index) {
            $('form .driver:first').clone().appendTo('.drivers');
            let currentDriverNum = index+driversCount+1;
            let currentDriver = $('form .driver:last');
            reloadMasks(currentDriver);

            //Заменяем данные в клоне
            currentDriver.find('h4').text(`Водитель ${currentDriverNum}`);

            currentDriver.find('input[required]').each(function (number, element) {
                $(element).attr('id', `${$(element).attr('id')}_${currentDriverNum}`);
                $(element).attr('name', `${$(element).attr('name')}`);
                $(element).val('');
            });

            currentDriver.find('.alert .row input[type=text]').each(function (number, element) {
                $(element).attr('id', `${$(element).attr('id')}_${currentDriverNum}`);
                $(element).attr('name', `${$(element).attr('name')}`);
                $(element).val('');
            });

            currentDriver.find('label').each(function (number, element) {
                $(element).attr('for', `${$(element).attr('for')}_${currentDriverNum}`);
            });

            currentDriver.find('input[type=radio]').each(function (number, element) {
                $(element).prop('checked', false);
                $(element).attr('id', `${$(element).attr('id')}_${currentDriverNum}`);
            });

            currentDriver.find('input[type=checkbox]').each(function (number, element) {
                $(element).prop('checked', false);
                $(element).attr('id', `${$(element).attr('id')}_${currentDriverNum}`);
            });
        });
    } else if (currentValue != 0) {
        $.each(new Array(driversCount-currentValue), function () {
            $('form .driver:last').remove();
        });
    } else {
        $('.drivers').hide('slow');
    }
    $('form .driver:first').find('input[name=flexRadioDefault]').prop('checked', true);
}

function setCheckboxInput(selector) {
    let drivingExperienceInput = selector.closest('.col-lg-4').find('input[name=driving_experience_started]');
    let checkbox = selector.closest('.col-lg-4').find('input[name=yearOnly]');
    switch (checkbox.prop('checked')) {
        case false:
            drivingExperienceInput.val('');
            drivingExperienceInput.inputmask({
                alias: "datetime",
                inputFormat: "dd.mm.yyyy",
                outputFormat: "yyyy-mm-dd"
            });
            drivingExperienceInput.attr('placeholder', 'dd.mm.yyyy');
            break;
        case true:
            drivingExperienceInput.val('');
            drivingExperienceInput.inputmask({
                "mask": "9999",
                placeholder: "1999",
                clearMaskOnLostFocus: true
            });
            drivingExperienceInput.attr('placeholder', '1999');
            break;
        default:
            drivingExperienceInput.val('');
            drivingExperienceInput.inputmask('remove');
            break;
    }
}

function toggleDriverChangedLicense(selector) {
    selector.find('.row').slideToggle('fast');
}