function precalculate(number_plate, redirect = false) {
    const local = store.get(number_plate);
    let deferred = $.Deferred();
    let driversIdArray = [];
    $.each(local.response.drivers, function () {
        driversIdArray.push(this.driver_id);
    });
    const precalculatedObject = {
        valid_from: local.periods.start_date,
        valid_to: local.periods.end_date,
        engine_power: local.car.engine_power,
        is_car_without_registration: false,
        car_type: local.response.car.car_type,
        target_of_using: 11,
        has_car_trailer: false,
        insurance_period: 8,
        owner_registration: {
            address_query: local.response.owner.owner_registration[0].address_query[0],
            region_kladr_id: local.response.owner.owner_registration[0].region_kladr_id
        },
        periods: [],
        drivers_ids: driversIdArray
    }

    $.post("./engine/API/precalculation.php", {
        precalculatedObject: precalculatedObject
    }).done((msg)=>{
        let local_store = store.get(number_plate);
        const response = JSON.parse(msg);
        local_store.response.agreement = {agreement_id: response.id, kbm_value: response.calculation.data.kbm};
        store.set(number_plate, local_store);
        if (redirect)
            window.location.href = './results.html';
        deferred.resolve();
    });
    return deferred.promise();
}