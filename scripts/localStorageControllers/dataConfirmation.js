function loadData(number_plate) {
    const data = store.get(number_plate);

    try {
        $('#valid_from').text(new Date(data.periods.start_date).toLocaleString().substr(0,10));
        $('#valid_to').text(new Date(data.periods.end_date).toLocaleString().substr(0,10));
        $('#auto').text(`${data.car.car_brand} ${data.car.car_model} ${data.car.manufacturing_year}г. ${data.car.engine_power}л.с.`);
        $('#number_plate').text(number_plate);
        $('#vin_number').text(data.car.vin_number);
        $('#credential_numbers').text(`${data.car.credential[0].number} ${data.car.credential[0].series}`);
        $('#insurance_full_name').text(`${data.insurant.last_name} ${data.insurant.first_name} ${data.insurant.patronymic}`);
        $('#insurance_birth_date').text(new Date(data.insurant.birth_date).toLocaleString().substr(0,10));
        $('#insurance_credential_numbers').text(`${data.insurant.credential[0].series} ${data.insurant.credential[0].number}`);
        $('#insurance_credential_issue_date').text(new Date(data.insurant.credential[0].issue_date).toLocaleString().substr(0,10));
        $('#insurance_address_query').text(data.insurant.address[0].address_query);
        $('input[name=sendInsuranceTo]').val(data.insurant.contact[1].data);

        $.each(data.drivers, function (key, value) {
            $('#drivers-container').append(`
            <ul class="list-group list-group-flush mb-2 border border-2 rounded bg-light">
            <li class="list-group-item bg-transparent">ФИО: <span id="driver_full_name">${value.last_name} ${value.first_name} ${value.patronymic}</span>
            </li>
            <li class="list-group-item bg-transparent">Дата рождения: <span
            id="driver_birth_date">${new Date(value.birth_date).toLocaleString().substr(0,10)}</span>
            </li>
            <li class="list-group-item bg-transparent">В/У:
            <span>${value.driver_licenses[0].number} ${value.driver_licenses[0].series}</span>
            стаж с
            <span>${new Date(value.driver_licenses[0].issue_date).toLocaleString().substr(0,10)}</span>
            </li>
            </ul>
        `);
        });
    } catch (e) {
        $('#dataLoadingErrored').toggle().append(`Ошибка: ${e}`);
        $('#info').toggle();
        $('.btn.btn-success').addClass('disabled');
    }
}