function makeCarObject(number_plate, redirect = false) {
    const local = store.get(number_plate).car;
    const carObject = {
        car_model_id: local.car_model_id,
        engine_power: local.engine_power,
        chassis_number: null,
        car_body_number: null,
        vin_number: local.vin_number,
        number_plate: local.number_plate,
        manufacturing_year: local.manufacturing_year,
        has_trailer: false,
        credential: [{
            credential_type: local.credential[0].credential_type,
            issue_date: local.credential[0].issue_date,
            number: local.credential[0].number,
            series: local.credential[0].series
        }]
    }

    $.post("../../engine/API/car.php", {
        carObject: carObject
    }).done((msg)=>{
        let local_store = store.get(number_plate);
        const response = JSON.parse(msg);
        if (local_store.response != undefined)
            local_store.response.car = {car_id: response.id}
        else
            local_store.response = {
                car: {
                    car_id: response.id
                },
                drivers: [],
                owner: {},
                insurant: {},
                insured_objects: {},
                agreement: {}
            }
        store.add(number_plate, local_store);
        if (redirect)
            window.location.href = './drivers.html';
    });
}