function regenerateLink(number_plate) {
    const local = store.get(number_plate);
    $('.buy-btn .btn.btn-success').addClass('disabled');
    $('#paymentActive').hide();
    $('#paymentExpired').hide('fast');
    $.post("../../engine/API/regenerateLink.php", {
        agreement_id: local.response.agreement.agreement_id
    }).done(msg => {
        const data = JSON.parse(msg);
        try {
            let local_store = store.get(number_plate);
            local_store.currentCompany.paymentLink = data.pay_parameters.pay_link;
            store.set(number_plate, local_store);
            linkPrepared();
        } catch (e) {
            console.log(e);
        }
    });
}