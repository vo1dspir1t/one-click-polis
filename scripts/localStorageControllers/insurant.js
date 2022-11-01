function saveInsurantObjectToStorage(number_plate) {
    let flatString;
    let addressString;
    let houseString;
    let birth_date;
    let issue_date;

    if (!$('#insurance_no_flat').is(':checked'))
        flatString = ", "+$('input[name=insurance_address_query_flat]').val();
    else
        flatString = "";

    if ($('input[name=insurance_address_query_street]').val() != '')
        addressString = $('input[name=insurance_address_query_street]').val()+", ";
    else
        addressString = "";

    if ($('input[name=insurance_address_query_house]').val() != '')
        houseString = $('input[name=insurance_address_query_house]').val();
    else
        houseString = "";

    try {
        birth_date = new Date($('input[name=insurance_birth_date]').inputmask('unmaskedvalue')).toISOString().substr(0,10);
    } catch (e) {
        birth_date = null;
    }

    try {
        issue_date = new Date($('input[name=insurance_credential_issue_date]').inputmask('unmaskedvalue')).toISOString().substr(0,10);
    } catch (e) {
        issue_date = null;
    }

    const insurantObject = {
        last_name: $('input[name=insurance_last_name]').val(),
        first_name: $('input[name=insurance_first_name]').val(),
        patronymic: $('input[name=insurance_patronymic]').val(),
        birth_date: birth_date,
        gender: $('select[name=insurance_gender]').val(),
        credential: [{
            credential_type: "RUSSIAN_INTERNAL_PASSPORT",
            issue_date: issue_date,
            issue_point: $('input[name=insurance_credential_issue_point]').inputmask('unmaskedvalue'),
            // issue_point_code: $('input[name=last_name]').val(),
            number: $('input[name=insurance_credential_numbers]').inputmask('unmaskedvalue').substr(0,4),
            series: $('input[name=insurance_credential_numbers]').inputmask('unmaskedvalue').substr(4,10)
        }],
        address: [{
            address_query: addressString + houseString + flatString,
            address_type: "LEGAL_ADDRESS",
            address_street: $('input[name=insurance_address_query_street]').val(),
            address_house: $('input[name=insurance_address_query_house]').val(),
            address_flat: $('input[name=insurance_address_query_flat]').val()
        }],
        additional_parameters: {
            has_not_flat: $('#insurance_no_flat').is(':checked')
        }
    }
    store.add(number_plate, {insurant: insurantObject});
}

function loadInsurantObjectFromStorage(number_plate) {
    const insurantObject = store.get(number_plate);

    let birth_date;
    let issue_date;

    try {
        if (insurantObject.insurant.birth_date != null)
            birth_date = new Date(insurantObject.insurant.birth_date).toLocaleString();
        else
            birth_date = null;
    } catch (e) {
        birth_date = null;
    }

    try {
        if (insurantObject.insurant.credential[0].issue_date != null)
            issue_date = new Date(insurantObject.insurant.credential[0].issue_date).toLocaleString();
        else
            issue_date = null;
    } catch (e) {
        issue_date = null;
    }

    try {
        if (insurantObject.insurant.additional_parameters.has_not_flat) {
            let flatInput = $('input[name=insurance_address_query_flat]');
            flatInput.prop('disabled', !flatInput.prop('disabled'));
            flatInput.prop('required', !flatInput.prop('required'));
        } else {
            $('input[name=insurance_address_query_flat]').val(insurantObject.insurant.address[0].address_flat);
        }

        $('input[name=insurance_last_name]').val(insurantObject.insurant.last_name);
        $('input[name=insurance_first_name]').val(insurantObject.insurant.first_name);
        $('input[name=insurance_patronymic]').val(insurantObject.insurant.patronymic);
        $('input[name=insurance_birth_date]').val(birth_date);
        $('select[name=insurance_gender]').val(insurantObject.insurant.gender);
        $('input[name=insurance_credential_numbers]').val(insurantObject.insurant.credential[0].number+insurantObject.insurant.credential[0].series);
        $('input[name=insurance_credential_issue_date]').val(issue_date);
        $('input[name=insurance_credential_issue_point]').val(insurantObject.insurant.credential[0].issue_point);
        $('input[name=insurance_address_query_street]').val(insurantObject.insurant.address[0].address_street);
        $('input[name=insurance_address_query_house]').val(insurantObject.insurant.address[0].address_house);
        $('#insurance_no_flat').prop('checked', insurantObject.insurant.additional_parameters.has_not_flat);
    } catch (e) {
        console.log(e);
    }
}