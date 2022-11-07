$(document).ready(() => {
    let number_plate;
    $.get("./engine/getCurrentAuto.php", (data) => {number_plate = data;}).done(function () {
        loadData(number_plate);
        getResultsFromCompanies(number_plate);
    });

    $('button[status=success]').click(() => {
        window.location.href = './paymentResult.html';
    });
});