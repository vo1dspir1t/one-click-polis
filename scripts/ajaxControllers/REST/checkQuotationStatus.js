function checkQuotationStatus(number_plate) {
    const local = store.get(number_plate);
    $.post("./engine/API/checkQuotationStatus.php", {
        agreement_id: local.response.agreement.agreement_id,
        companyCode: local.currentCompany.code
    }).done(msg => {
        const data = JSON.parse(msg);
        if (data.parameters.ping_status.status === "APPROVED") {
            showQuotationStatus(data.parameters.ping_status.message);
            prepareLink();
            if (local.currentCompany.paymentLink === undefined)
                buyPolis(number_plate);
            else
                regenerateLink(number_plate);
        } else
            showQuotationStatus(data.error);
    });
}

function showQuotationStatus(text) {
    $('#quotationStatus').toast('show').find('.toast-body').text(text);
}