function loadData(number_plate) {
    const data = store.get(number_plate);

    try {
        $('#car-data').text(`${data.car.car_brand} ${data.car.car_model}, ${data.car.manufacturing_year}г.в, ${data.car.engine_power}л.с.`);
        $('#valid_from').text(new Date(data.periods.start_date).toLocaleString().substr(0,10));
        $('#valid_to').text(new Date(data.periods.end_date).toLocaleString().substr(0,10));
        $('#kbm-value').text(data.response.agreement.kbm_value);
        $('#drivers-count').text(data.drivers.length);
        $('.company').prepend(`
        <div class="company-logo col-lg-3 col-12">
            <img src="${data.currentCompany.image}"
                 class="img-thumbnail rounded">
        </div>
        <div class="company-info col-lg-4 col-12">
            ${data.currentCompany.title}
        </div>
        <div class="company-price col-lg-3 col-12">
            ${data.currentCompany.price}
        </div>
        `);
    } catch (e) {
        $('.btn.btn-success').addClass('disabled');
        $('.alert').each(function () {
            $(this).hide();
        });
        $('#dataLoadingErrored').toggle().append(`Ошибка: ${e}`);
    }
}

function goToLink(number_plate) {
    const data = store.get(number_plate);
    window.open(data.currentCompany.paymentLink, "_blank");
}