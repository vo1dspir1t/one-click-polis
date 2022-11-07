function patchAgreement(number_plate, redirect = false) {
    const local = store.get(number_plate);
    const patch_agreement = {
        insured_object: local.response.insured_objects.insured_objects_id
    }

    $.post("../../engine/API/patch_agreement.php", {
        patch_agreement: patch_agreement,
        agreement_id: local.response.agreement.agreement_id
    }).done((msg)=>{
        let local_store = store.get(number_plate);
        const response = JSON.parse(msg);
        if (response.error !== undefined)
            location.reload();
        local_store.response.agreement = {agreement_id: response.id}
        store.add(number_plate, local_store);
        $('button[name=next]').removeClass('disabled').addClass('btn-success').removeClass('btn-secondary').html(`Продолжить`);
        if (redirect)
            window.location.href = './results.html';
    });
}