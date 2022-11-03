function makeDriversObject(number_plate, redirect = false) {
    const local = store.get(number_plate).drivers;
    let response_drivers = [];
    $.each(local, function () {
        const driverObject = {
            first_name: this.first_name,
            last_name: this.last_name,
            patronymic: this.patronymic,
            birth_date: this.birth_date,
            driving_experience_started: this.driving_experience_started,
            driver_licenses: this.driver_licenses
        }

        $.post("../../engine/API/drivers.php", {
            driverObject: driverObject
        }).done((msg)=>{
            const response = JSON.parse(msg);
            const driver = {
                driverObject_id: response.id
            }
            response_drivers.push(driver);
            console.log(driver)
        });
    });

    let local_store = store.get(number_plate);
    local_store.response['drivers'] = response_drivers;
    store.add(number_plate, local_store);
    console.log(response_drivers)
    if (redirect)
        window.location.href = './owner.html';
}