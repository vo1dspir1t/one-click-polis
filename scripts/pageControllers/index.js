$(document).ready(() => {
    let number_plate = $('#number_plate');

    $(document).on('click', '#savedResults a', function () {
        $('#number_plate').val($(this).attr('data-key')).prop('disabled', true);
        setCurrentAuto();
    });

    updateSavedResults();

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

    // Debug block

    $(document).keydown((e) => {
        if (e.ctrlKey && e.altKey && e.keyCode == 71)
            $('button[name=debug]').toggle();
    });

    $('#LogStorage').click(() => {
        console.log(store());
    });

    $('#clearStorage').click(() => {
        store(false);
    });
});

function updateSavedResults() {
    if (store.size() > 0) {
        let keysCount = 0;
        store.each(function (key) {
            if (!key.startsWith('_'))
                keysCount++;
        });
        if (keysCount > 0) {
            $('#results').show();
            $('#savedResults').show();
            try {
                store.each(function (key, value) {
                    if (!key.startsWith('_'))
                        $('#savedResults').append(`<li><a class="text-decoration-none" href="javascript:void(0)" data-key="${key}">${value.car.car_brand} ${value.car.car_model} (${key})</a></li>`);
                });
            } catch (e) {
                console.log(e);
                // store(false);
            }
        }
    }
}