const skipCompanies = ["RENAISSANCE_NEW", "RGS", "CARDIF", "TEST_COMPANY"];
const progressBarWidth = $('.progress').width();
let progressWidth = $('.progress-bar').width();
let progressBarStep = 0;

function getResultsFromCompanies(number_plate) {
    let companies = [];
    $.get("../../engine/dictionaries/getInsuranceCompanies.php", msg => {
        companies = JSON.parse(msg);
    }).done(() => {
        progressBarStep = (progressBarWidth-progressWidth)/(companies.length-skipCompanies.length);
        getRequestFromCompanies(number_plate, companies);
    });
}

function getRequestFromCompanies(number_plate, companies_list) {
    const local = store.get(number_plate);
    $.each(companies_list, function () {
        if (skipCompanies.includes(this.code))
            return;

        $('.result-body').append(`
            <div class="row g-3 mb-2 align-items-center" id="${this.code}">
                <div class="col-lg-3 col-12">
                    <div class="ratio ratio-21x9">
                        <img src="https://widget.agentapp.ru${this.logo}"
                             class="img-thumbnail rounded">
                    </div>
                </div>
                <div class="col-lg-3 col-12">
                    <span style="font-size: 18px" id="company-title">${this.title}</span>
                </div>
                <div class="col-lg-3 col-12">
                    <span style="font-size: 18px" id="company-price">Выполняется запрос</span>
                </div>
                <div class="col-lg-3 col-12">
                    <button class="btn btn-secondary disabled w-100" style="font-size: 18px" status="loading">
                        <div class="spinner-border spinner-border-sm" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </button>
                </div>
                <hr>
            </div>
        `);

        $.post("../../engine/API/getCalculation.php", {
            agreement_id: local.response.agreement.agreement_id,
            companyCode: this.code
        }).done(msg => {
            try {
                const data = JSON.parse(msg);
                if (data.error != undefined || data.detail != undefined) {
                    const companyDOM = $('#'+this.code);
                    companyDOM.find('.btn.btn-secondary').attr('status', 'error').text('Отказ').toggleClass('btn-secondary').toggleClass('btn-danger');
                    companyDOM.find('#company-price').text('Оформление невозможно');
                } else {
                    const companyDOM = $('#'+this.code);
                    companyDOM.find('.btn.btn-secondary').attr('status', 'success').text('Купить').toggleClass('btn-secondary').toggleClass('btn-success').toggleClass('disabled');
                    companyDOM.find('#company-price').text(`${Math.round(parseFloat(data.parameters.premium))} Руб.`);
                    companyDOM.prependTo('.result-body');
                }
                progressWidth += progressBarStep
                $('.progress-bar').width(progressWidth);
            } catch (e) {
                console.log(e);
                window.location.href = './dataConfirmation.html';
            }
        });
    });
}

$(document).ajaxStop(function () {
    $('.progress-bar').addClass('bg-success').removeClass('progress-bar-animated');
    setTimeout(() => {
        $('.progress').slideToggle('fast');
    }, 1000);
})