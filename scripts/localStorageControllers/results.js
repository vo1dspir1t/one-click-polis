function loadData(number_plate) {
    const data = store.get(number_plate);

    try {
        $('#full-name').text(`${data.insurant.last_name} ${(data.insurant.first_name).substr(0, 1)}.${(data.insurant.patronymic).substr(0, 1)}`);
        $('#car-data').text(`${data.car.car_brand} ${data.car.car_model}, ${data.car.manufacturing_year}г.в, ${data.car.engine_power}л.с.`);
        $('#insurance-condition').text(`${(data.insurant.address[0].address_street).split(',')[0]}, период страхования с ${new Date(data.periods.start_date).toLocaleString().substr(0,10)} по ${new Date(data.periods.end_date).toLocaleString().substr(0,10)}`);
    } catch (e) {
        $('#kbmInfo').remove();
    }
}