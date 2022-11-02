function loadData(number_plate) {
    const data = store.get(number_plate);

    try {
        $('#car-data').text(`${data.car.car_brand} ${data.car.car_model}, ${data.car.manufacturing_year}г.в, ${data.car.engine_power}л.с.`);
        $('#valid_from').text(new Date(data.periods.start_date).toLocaleString().substr(0,10));
        $('#valid_to').text(new Date(data.periods.end_date).toLocaleString().substr(0,10));
        $('#drivers-count').text(data.drivers.length);
    } catch (e) {
        $('.btn.btn-success').addClass('disabled');
        $('.alert').each(function () {
            $(this).hide();
        });
        $('#dataLoadingErrored').toggle().append(`Ошибка: ${e}`);
    }
}