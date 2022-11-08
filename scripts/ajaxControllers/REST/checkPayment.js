function checkPayment(number_plate) {
    const local = store.get(number_plate);
    $.post("./engine/API/checkPayment.php", {
        agreement_id: local.response.agreement.agreement_id
    }).done(msg => {
        const data = JSON.parse(msg);
        if (data.error != undefined)
            $('#paymentError').show();
        else {
            $('#paymentError').hide();
            $('#paymentActive').hide();
            $('#paymentExpired').hide();
            $('#paymentSuccessful').show();
        }
    });
}