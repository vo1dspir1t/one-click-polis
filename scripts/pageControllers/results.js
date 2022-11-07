$(document).ready(() => {
    let number_plate;
    $.get("./engine/getCurrentAuto.php", (data) => {number_plate = data;}).done(function () {
        loadData(number_plate);
        getResultsFromCompanies(number_plate);
    });

    $(document).on('click', 'button[status=success]', function () {
        saveCurrentCompany(number_plate, $(this), true);
    });
});