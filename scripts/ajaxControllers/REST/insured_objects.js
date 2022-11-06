function makeInsuredObjects(number_plate, redirect = false) {
    const local = store.get(number_plate);
    let deferred = $.Deferred();
    let driversIdArray = [];
    $.each(local.response.drivers, function () {
        driversIdArray.push(this.driver_id);
    });
    const insuredObjects = {
        drivers: driversIdArray,
        owner: local.response.owner.owner_id,
        car: local.response.car.car_id,
        insurant: local.response.insurant.insurant_id
    }

    $.post("../../engine/API/insured_objects.php", {
        insuredObjects: insuredObjects
    }).done((msg)=>{
        let local_store = store.get(number_plate);
        const response = JSON.parse(msg);
        local_store.response.insured_objects = {insured_objects_id: response.id}
        store.add(number_plate, local_store);
        if (redirect)
            window.location.href = './results.html';
        deferred.resolve();
    });
    return deferred.promise();
}