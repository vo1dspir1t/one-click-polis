function saveOwnerObjectToStorage(number_plate) {
    let flatString;
    let addressString;
    let houseString;
    let birth_date;
    let issue_date;

    if (!$('#no_flat').is(':checked'))
        flatString = ", "+$('input[name=address_query_flat]').val();
    else
        flatString = "";

    if ($('input[name=address_query_street]').val() != '')
        addressString = $('input[name=address_query_street]').val()+", ";
    else
        addressString = "";

    if ($('input[name=address_query_house]').val() != '')
        houseString = $('input[name=address_query_house]').val();
    else
        houseString = "";

    try {
        birth_date = new Date($('input[name=birth_date]').inputmask('unmaskedvalue')).toISOString().substr(0,10);
    } catch (e) {
        birth_date = null;
    }

    try {
        issue_date = new Date($('input[name=credential_issue_date]').inputmask('unmaskedvalue')).toISOString().substr(0,10);
    } catch (e) {
        issue_date = null;
    }

    const ownerObject = {
        last_name: $('input[name=last_name]').val(),
        first_name: $('input[name=first_name]').val(),
        patronymic: $('input[name=patronymic]').val(),
        birth_date: birth_date,
        gender: $('select[name=gender]').val(),
        credential: [{
            credential_type: "RUSSIAN_INTERNAL_PASSPORT",
            issue_date: issue_date,
            issue_point: $('input[name=credential_issue_point]').inputmask('unmaskedvalue'),
            // issue_point_code: $('input[name=last_name]').val(),
            number: $('input[name=credential_numbers]').inputmask('unmaskedvalue').substr(0,4),
            series: $('input[name=credential_numbers]').inputmask('unmaskedvalue').substr(4,10)
        }],
        address: [{
            address_query: addressString + houseString + flatString,
            address_type: "LEGAL_ADDRESS",
            address_street: $('input[name=address_query_street]').val(),
            address_house: $('input[name=address_query_house]').val(),
            address_flat: $('input[name=address_query_flat]').val()
        }],
        additional_parameters: {
            has_not_flat: $('#no_flat').is(':checked')
        }
    }
    store.add(number_plate, {owner: ownerObject});
}

function loadOwnerObjectFromStorage(number_plate) {
    const ownerObject = store.get(number_plate);

    let birth_date;
    let issue_date;
    console.log(ownerObject)

    try {
        if (ownerObject.owner.birth_date != null)
            birth_date = new Date(ownerObject.owner.birth_date).toLocaleString();
        else
            birth_date = null;
    } catch (e) {
        birth_date = null;
    }

    try {
        if (ownerObject.owner.credential[0].issue_date != null)
            issue_date = new Date(ownerObject.owner.credential[0].issue_date).toLocaleString();
        else
            issue_date = null;
    } catch (e) {
        issue_date = null;
    }

    try {
        $('input[name=last_name]').val(ownerObject.owner.last_name);
        $('input[name=first_name]').val(ownerObject.owner.first_name);
        $('input[name=patronymic]').val(ownerObject.owner.patronymic);
        $('input[name=birth_date]').val(birth_date);
        $('select[name=gender]').val(ownerObject.owner.gender);
        $('input[name=credential_numbers]').val(ownerObject.owner.credential[0].number+ownerObject.owner.credential[0].series);
        $('input[name=credential_issue_date]').val(issue_date);
        $('input[name=credential_issue_point]').val(ownerObject.owner.credential[0].issue_point);
        $('input[name=address_query_street]').val(ownerObject.owner.address[0].address_street);
        $('input[name=address_query_house]').val(ownerObject.owner.address[0].address_house);
        $('input[name=address_query_flat]').val(ownerObject.owner.address[0].address_flat);

    } catch (e) {
        console.log(e);
        store.add(number_plate, {owner: [{}]});
    }
}