function buyPolis(number_plate) {
    const local = store.get(number_plate);
    $.post("./engine/API/buyPolis.php", {
        agreement_id: local.response.agreement.agreement_id,
        companyCode: local.currentCompany.code
    }).done(msg => {
        const data = JSON.parse(msg);
        try {
            let local_store = store.get(number_plate);
            local_store.currentCompany.paymentLink = data.pay_parameters.pay_link;
            store.set(number_plate, local_store);
            linkPrepared();
        } catch (e) {
            console.log(e, msg);
            window.location.replace('./dataConfirmation.html');
        }
    });
}