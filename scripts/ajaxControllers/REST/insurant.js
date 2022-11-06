function makeInsurantObject(number_plate, redirect = false) {
    const local = store.get(number_plate).insurant;
    const insurantObject = {
        address: [
            {
                address_query: local.address[0].address_query,
                address_type: local.address[0].address_type
            }
        ],
        credential: local.credential,
        contact: local.contact,
        last_name: local.last_name,
        first_name: local.first_name,
        patronymic: local.patronymic,
        birth_date: local.birth_date

    }

    $.post("../../engine/API/insurant.php", {
        insurantObject: insurantObject
    }).done((msg)=>{
        let local_store = store.get(number_plate);
        const response = JSON.parse(msg);
        local_store.response.insurant = {insurant_id: response.person}
        store.add(number_plate, local_store);
        if (redirect)
            window.location.href = './dataConfirmation.html';
    });
}