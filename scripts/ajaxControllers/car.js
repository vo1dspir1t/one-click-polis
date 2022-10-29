// Получение данных авто
function getCarData() {
    let number_plate;
    $.get("./engine/getCurrentAuto.php", (data) => {number_plate = data;}).done(function () {
        if (!store.has(number_plate)) {
            getLoadDataStatus();
            $.post("./engine/API/getCarData.php",
                {
                    'number_plate': number_plate
                },
                function (data) {
                    const parsedData = JSON.parse(data);
                    try {
                        const issue_date = new Date(parsedData.credential[0].issue_date).toLocaleDateString();
                        $('input[name=car_brand]').val(parsedData.car_mark).attr("car_brand", parsedData.car_mark_id);
                        $('input[name=car_model]').val(parsedData.car_model).attr("car_model", parsedData.car_model_id);
                        $('input[name=manufacturing_year]').val(parsedData.manufacturing_year);
                        $('input[name=engine_power]').val(parsedData.engine_power);
                        $('input[name=number_plate]').val(number_plate);
                        $('input[name=identification_number]').val(parsedData.vin_number);
                        $('input[name=credential_numbers]').val(parsedData.credential[0].series + parsedData.credential[0].number);
                        $('input[name=credential_issue_date]').val(issue_date);
                        $('#getDataMessage .toast-body').text("Данные успешно загружены!");
                        $('#getDataMessage').addClass('text-bg-success').toast('show');
                        saveCarObjectToStorage();
                    } catch (e) {
                        $('#getDataMessage .toast-body').text("Ошибка загрузки данных: "+parsedData.error);
                        $('#getDataMessage').addClass('text-bg-warning').toast('show');
                    }
                }
            ).done(() => {
                toggleInputs(true);
                $('.data_loading_status').slideToggle('fast');
                $('.data_loading_status').css('width', '100%');
                getCarMarks($('input[name=car_brand]').attr("car_brand"));
            });
        } else {
            loadCarObjectFromStorage(number_plate);
            toggleInputs(true);
        }
    });
}

function toggleInputs(value) {
    $('.form-control').each(function () {
        if ($(this).val() != '')
            $(this).prop("readonly", value);
    });

    $('select').each(function () {
        $(this).prop("disabled", value);
    });
}

//Получение списка автомобилей
function getCarMarks() {
    for (i = 1; i <= 50; i++) {
        $.post("./engine/dictionaries/getCarMarks.php", {
            'page':i
        }, function (data) {
            let dataArray;
            try {
                dataArray = JSON.parse(data).results;
            } catch (e) {
                console.log(e);
            }
            $.each(dataArray, function (index, element) {
                $('input[name=car_brand]').siblings('.dictionary').append(`<li class="list-group-item" data-key="${element.id}">${element.title}</li>`);
            });
        });
    }
}

function getCarModels(markID) {
    $('input[name=car_model]').siblings('.dictionary').empty();
    $.post("./engine/dictionaries/getCarModels.php", {
        'carMarkID':markID
    }, function (data) {
        let dataArray;
        try {
            dataArray = JSON.parse(data).results;
        } catch (e) {
            console.log(e);
        }
        $.each(dataArray, function (index, element) {
            $('input[name=car_model]').siblings('.dictionary').append(`<li class="list-group-item" data-key="${element.id}">${element.title}</li>`);
        });
    });
}

//Статус загрузки данных
function getLoadDataStatus() {
    const progressBarContainer = $('.data_loading_status');
    const progressBar = $('.data_loading_status .progress-bar');
    progressBarContainer.toggle();
    const enableLoadingBar = setInterval(() => {
        const stepProgress = progressBarContainer.width()/5;
        progressBar.width(progressBar.width()+stepProgress);
    }, 500);
    setTimeout(() => {clearInterval(enableLoadingBar);}, 2000)
}