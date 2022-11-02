$(document).ready(() => {
    let number_plate = $('#number_plate');

    if (store.size() == 0) {
        $('#results').toggle();
    } else {
        try {
            store.each(function (key, value) {
                $('#savedResults').append(`<li><a class="text-decoration-none" href="javascript:void(0)" data-key="${key}">${value.car.car_brand} ${value.car.car_model} (${key})</a></li>`);
            });
        } catch (e) {
            store(false);
        }
    }

    $(document).on('click', '#savedResults a', function () {
        $('#number_plate').val($(this).attr('data-key')).prop('disabled', true);
        setCurrentAuto();
    });

    //Маски для полей
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

    $('button[name=calculate]').click(() => {
        if ($('#number_plate').inputmask("isComplete")) {
            number_plate.removeClass('border-danger');
            number_plate.tooltip('hide');
            setCurrentAuto();
        } else {
            number_plate.addClass('border-danger');
            number_plate.tooltip('show');
        }
    });

    $('button[name=toggleResults]').click(function () {
        $(this).text(($(this).text() == "Скрыть") ? "Показать" : "Скрыть");
        $('#savedResults').slideToggle('fast');
    });

    // Debug block

    $(document).keydown((e) => {
        if (e.ctrlKey && e.altKey && e.keyCode == 71)
            $('button[name=debug]').toggle();
    });

    $('#toggleResults').click(() => {
        $('#results').toggle();
    });

    $('#LogStorage').click(() => {
        console.log(store());
    });

    $('#clearStorage').click(() => {
        store(false);
    });
});