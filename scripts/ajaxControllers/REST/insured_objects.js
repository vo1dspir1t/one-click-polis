function makeInsuredObjects(number_plate, redirect = false) {
    const local = store.get(number_plate);
    const insuredObjects = {
        drivers: local.response.drivers,
        owner: {owner_id: local.response.owner.owner_id},
        car: {car_id: local.response.car.car_id},
        insurant: local.response.insurant
    }

    console.log(insuredObjects)

    $.post("../../engine/API/insured_objects.php", {
        insuredObjects: insuredObjects
    }).done((msg)=>{
        let local_store = store.get(number_plate);
        const response = JSON.parse(msg);
        console.log(msg)
        local_store.response.insured_objects = {insured_objects_id: response.person}
        store.add(number_plate, local_store);
        if (redirect)
            window.location.href = './results.html';
    });
}