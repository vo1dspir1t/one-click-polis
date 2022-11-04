$(document).ready(() => {
    getCarData();
    getCarMarks();

    let validFrom = new Date();
    validFrom.setDate(validFrom.getDate() + 4);

    // Установка времени для периода страхования
    $('input[name=valid_from]').val(validFrom.toLocaleDateString());
    $('#valid_from_span').text(validFrom.toLocaleDateString());

    //Маски для полей ввода
    $('#manufacturing_year').inputmask({
        "mask": "9999",
        placeholder: "0000",
        clearMaskOnLostFocus: true
    });

    $('#engine_power').inputmask({
        "mask": "99[9{1,2}]",
        placeholder: "00",
        clearMaskOnLostFocus: true
    });

    $('#number_plate').inputmask({
        "mask": "Z 999 ZZ 99[9]",
        clearMaskOnLostFocus: true,
        placeholder: "A 999 AA 99",
        definitions: {
            'Z': {
                validator: '[АВЕКМНОРСТУХавекмнорстух]',
                casing: "upper"
            }
        }
    });

    $('#identification_number').inputmask({
        "mask": "ZZZZZZZZZZZZZZZZZ",
        clearMaskOnLostFocus: true,
        placeholder: "WBAZZZ8A9KA123456",
        definitions: {
            'Z': {
                validator: '[0-9ABCDEFGHJKLMNPRSTUVWXYZabcdefghjklmnprstuvwxyz]',
                casing: "upper"
            }
        }
    });

    $('#credential_numbers').inputmask({
        "mask": "CC CC 999999",
        clearMaskOnLostFocus: true,
        placeholder: "99 99 999999",
        definitions: {
            'C': {
                validator: '[0-9А-Яа-я]',
                casing: "upper"
            }
        }
    });

    $('#credential_issue_date, #valid_from').inputmask({
        alias: "datetime",
        inputFormat: "dd.mm.yyyy",
        outputFormat: "yyyy-mm-dd",
        clearIncomplete: true
    });

    //Разблокировка поля
    $('.form-control').dblclick(() => {
        toggleInputs(false);
    });

    //Сохранение данных при изменении
    $('select').change(() => {
        saveCarObjectToStorage();
    });

    $('input').focusout(() => {
        saveCarObjectToStorage();
    });

    //Кнопки перехода по страницам
    $('button[name=back]').click(() => {
        window.location.href = './';
    });

    //Отправка формы
    $('.needs-validation').submit(function (e) {
        toggleInputs(false);
        if (!this.checkValidity()) {
            scrollToInvalidInput();
        }
        $(this).addClass('was-validated');
        e.preventDefault();
        e.stopPropagation();
        if (this.checkValidity()) {
            if ($('input[name=car_model]').attr('car_model') == undefined) {
                $('input[name=car_model]').tooltip('show');
                $('input[name=car_model]').addClass(':invalid');
                $('input[name=car_model]').siblings('.dictionary').show();
            } else {
                const number_plate = $('input[name=number_plate]').inputmask("unmaskedvalue");
                $('button[type=submit]').addClass('disabled').removeClass('btn-success').addClass('btn-secondary').html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Загрузка...`);
                try {
                    if (Object.keys(store.get(number_plate).response.car).length > 0)
                        window.location.href = './drivers.html';
                    else
                        makeCarObject(number_plate, true);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    });

    //Скроллинг к пустому полю
    function scrollToInvalidInput() {
        $('html, body').animate({
            scrollTop: $('.form-control:invalid').first().offset().top - $(window).height() / 2
        }, 250);
    }

    //Включение/Выключение словаря
    const DictionarySelector = $('input[name=car_brand], input[name=car_model]');
    DictionarySelector.keyup(function () {
        $(this).siblings('.dictionary').show();
        filterDictionary($(this), $(this).siblings('.dictionary').find('li'));
    });

    DictionarySelector.click(function () {
        $('.dictionary').hide();
    })

    $(document).on('click', '.dictionary li', function () {
        const closestInput = $(this).closest('.position-relative').find('input');
        closestInput.val($(this).text());
        closestInput.attr(closestInput.attr('name'), $(this).attr('data-key'));
        getCarModels($(this).attr('data-key'));
        $(this).closest('.dictionary').hide();
        saveCarObjectToStorage();
    });

    function filterDictionary(inputSelector, dictionarySelector) {
        const inputValueLower = inputSelector.val().toLowerCase();
        dictionarySelector.filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(inputValueLower) > -1);
        });
    }
});