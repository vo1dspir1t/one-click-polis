function loadData(number_plate) {
    const data = store.get(number_plate);

    try {
        $('#full-name').text(`${data.owner.last_name} ${(data.owner.first_name).substr(0, 1)}.${(data.owner.patronymic).substr(0, 1)}`);
        $('#kbm-value').text(data.response.agreement.kbm_value);
        $('#car-data').text(`${data.car.car_brand} ${data.car.car_model}, ${data.car.manufacturing_year}г.в, ${data.car.engine_power}л.с.`);
        $('#insurance-condition').text(`${(data.owner.address[0].address_street).split(',')[0]}, период страхования с ${new Date(data.periods.start_date).toLocaleString().substr(0,10)} по ${new Date(data.periods.end_date).toLocaleString().substr(0,10)}`);
    } catch (e) {
        $('#kbmInfo').remove();
    }
}

function saveCurrentCompany(number_plate, btnSelector, redirect = false) {
    let local = store.get(number_plate);
    btnSelector.addClass('disabled').removeClass('btn-success').addClass('btn-secondary').html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Загрузка...`);
    const currentCompany = {
        code: btnSelector.closest('.row').attr('id'),
        image: btnSelector.closest('.row').find('img').attr('src'),
        title: btnSelector.closest('.row').find('#company-title').text(),
        price: btnSelector.closest('.row').find('#company-price').text(),
        paymentLink: undefined
    }
    local.currentCompany = currentCompany;
    store.set(number_plate, local);
    if (redirect)
        window.location.href = './paymentResult.html';
}