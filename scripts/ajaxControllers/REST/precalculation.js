function precalculate(number_plate, redirect = false) {
    const local = store.get(number_plate);
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
        drivers_ids: local.response.drivers
    }

    console.log(precalculatedObject)

    $.post("../../engine/API/precalculation.php", {
        precalculatedObject: precalculatedObject
    }).done((msg)=>{
        let local_store = store.get(number_plate);
        console.log(msg)
        const response = JSON.parse(msg);
        local_store.response.agreement = {agreement_id: response.id}
        store.add(number_plate, local_store);
        $('button[name=next]').removeClass('disabled').addClass('btn-success').removeClass('btn-secondary').html(`Продолжить`);
        if (redirect)
            window.location.href = './results.html';
    });
}