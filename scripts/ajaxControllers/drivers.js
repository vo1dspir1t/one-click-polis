// Получение данных водителей
function getDriversData() {
    let number_plate;
    $.get("./engine/getCurrentAuto.php", (data) => {number_plate = data;}).done(function () {
        if (store.has(number_plate))
            loadDriversObjectFromStorage(number_plate);
    });
}