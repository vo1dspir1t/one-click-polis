function makeOwnerObject(number_plate, redirect = false) {
    const local = store.get(number_plate).owner;
    const ownerObject = {
        last_name: local.last_name,
        first_name: local.first_name,
        patronymic: local.patronymic,
        birth_date: local.birth_date,
        gender: local.gender,
        credential: local.credential,
        address: [{
            address_query: local.address[0].address_query,
            address_type: local.address[0].address_type
        }]
    }

    $.post("../../engine/API/owner.php", {
        ownerObject: ownerObject
    }).done((msg)=>{
        let local_store = store.get(number_plate);
        const response = JSON.parse(msg);
        local_store.response.owner = {owner_id: response.id}
        store.add(number_plate, local_store);
        if (redirect)
            window.location.href = './dataConfirmation.html';
    });
}