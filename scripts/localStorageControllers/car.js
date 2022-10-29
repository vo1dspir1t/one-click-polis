function saveCarObjectToStorage() {
    let carCredentialIssueDate;
    try {
        carCredentialIssueDate = new Date($('#credential_issue_date').inputmask('unmaskedvalue')).toISOString().substr(0,10);
    } catch (e) {
        carCredentialIssueDate = null;
    }

    const carObject = {
        car_brand: $('input[name=car_brand]').val(),
        car_brand_id: $('input[name=car_brand]').attr('car_brand'),
        car_model_id: $('input[name=car_model]').attr('car_model'),
        car_model: $('input[name=car_model]').val(),
        engine_power: $('#engine_power').inputmask('unmaskedvalue'),
        chassis_number: null,
        car_body_number: null,
        vin_number: $('#identification_number').inputmask('unmaskedvalue'),
        number_plate: $('#number_plate').inputmask('unmaskedvalue'),
        manufacturing_year: $('#manufacturing_year').inputmask('unmaskedvalue'),
        max_mass: null,
        has_trailer: false,
        credential: [{
            credential_type: $('select[name=credential_type]').val(),
            issue_date: carCredentialIssueDate,
            number: $('#credential_numbers').inputmask('unmaskedvalue').substr(0,4),
            series: $('#credential_numbers').inputmask('unmaskedvalue').substr(4,6)
        }]
    }
    store.add(carObject.number_plate, {car: carObject});
}

function loadCarObjectFromStorage(number_plate) {
    const carObject = store.get(number_plate);

    let carCredentialIssueDate;
    try {
        carCredentialIssueDate = new Date(carObject.car.credential[0].issue_date).toLocaleString();
    } catch (e) {
        carCredentialIssueDate = null;
    }

    try {
        $('#car_brand').attr('car_brand', carObject.car.car_brand_id).val(carObject.car.car_brand);
        $('#car_model').attr('car_model', carObject.car.car_model_id).val(carObject.car.car_model);
        $('#engine_power').val(carObject.car.engine_power);
        $('#identification_number').val(carObject.car.vin_number);
        $('#number_plate').val(carObject.car.number_plate);
        $('#manufacturing_year').val(carObject.car.manufacturing_year);
        $('#credential_type').val(carObject.car.credential[0].credential_type);
        $('#credential_issue_date').val(carCredentialIssueDate);
        $('#credential_numbers').val(carObject.car.credential[0].number + carObject.car.credential[0].series);

        //Проверка на наличие марки авто и выдача моделей авто
        if (carObject.car.car_brand_id != '') {
            getCarModels(carObject.car.car_brand_id);
        }
    } catch (e) {
        console.log(e);
        store.add(carObject.number_plate, {car: {}});
    }
}