function makeDriversObject(number_plate, redirect = false) {
    const local = store.get(number_plate).drivers;
    $.each(local, function (index) {
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
            let local_store = store.get(number_plate);
            local_store.response.drivers[index] = {driver_id: response.id};
            store.add(number_plate, local_store);
            if (redirect)
                window.location.href = './owner.html';
        });
    });
}