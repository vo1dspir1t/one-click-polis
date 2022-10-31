function saveDriversObjectToStorage(number_plate) {
    let DriversArray = [];
    $('.drivers .driver').each(function () {
        let birthDate;
        try {
            birthDate = new Date($(this).find('input[name=birth_date]').inputmask('unmaskedvalue')).toISOString().substr(0, 10);
        } catch (e) {
            birthDate = null;
        }

        let drivingExperienceStarted;
        try {
            drivingExperienceStarted = new Date($(this).find('input[name=driving_experience_started]').inputmask('unmaskedvalue')).toISOString().substr(0, 10);
        } catch (e) {
            drivingExperienceStarted = null;
        }

        let driverLicenseIssue;
        try {
            if ($(this).find('input[name=yearOnly]').is(':checked'))
                driverLicenseIssue = $(this).find('input[name=driving_experience_started]').inputmask('unmaskedvalue') + '-12-31';
            else
                driverLicenseIssue = null;

        } catch (e) {
            driverLicenseIssue = null;
        }

        const driverObject = {
            first_name: $(this).find('input[name=first_name]').val(),
            last_name: $(this).find('input[name=last_name]').val(),
            patronymic: $(this).find('input[name=patronymic]').val(),
            birth_date: birthDate,
            driving_experience_started: drivingExperienceStarted,
            driver_licenses: [{
                credential_type: "DRIVER_LICENSE",
                number: $(this).find('input[name=driver_licenses_numbers]').inputmask('unmaskedvalue').substr(0, 4),
                series: $(this).find('input[name=driver_licenses_numbers]').inputmask('unmaskedvalue').substr(4, 6),
                issue_date: driverLicenseIssue
            }],
            additional_parameters: {
                is_owner: $(this).find('input[type=radio]').is(':checked'),
                year_only: $(this).find('input[name=yearOnly]').is(':checked'),
                license_changed: $(this).find('input[name=license_changed]').is(':checked')
            }
        }

        if (driverObject.additional_parameters.is_owner) {
            const ownerObject = {
                first_name: driverObject.first_name,
                last_name: driverObject.last_name,
                patronymic: driverObject.patronymic,
                birth_date: driverObject.birth_date
            }
            store.add(number_plate, {owner: ownerObject});
        }

        DriversArray.push(driverObject);
    });
    store.add(number_plate, {drivers: DriversArray});
}

function loadDriversObjectFromStorage(number_plate) {
    const driversObject = store.get(number_plate);

    try {
        $('.input-group .form-select').val(driversObject.drivers.length);
        cloneDriver(driversObject.drivers.length);
        $(document).find('.driver').each(function (index) {
            $(this).find('input[type=radio]').prop('checked', driversObject.drivers[index].additional_parameters.is_owner);
            $(this).find('input[name=yearOnly]').prop('checked', driversObject.drivers[index].additional_parameters.year_only);
            $(this).find('input[name=license_changed]').prop('checked', driversObject.drivers[index].additional_parameters.license_changed);
            if (driversObject.drivers[index].additional_parameters.license_changed)
                toggleDriverChangedLicense($(this).find('.alert'));

            let birthDate;
            try {
                if (driversObject.drivers[index].birth_date == null)
                    birthDate = null;
                else
                    birthDate = new Date(driversObject.drivers[index].birth_date).toLocaleString();
            } catch (e) {
                birthDate = null;
            }

            let drivingExperienceStarted;
            try {
                if (driversObject.drivers[index].additional_parameters.year_only) {
                    drivingExperienceStarted = (driversObject.drivers[index].driving_experience_started).substr(0, 4);
                    setCheckboxInput($(this).find('input[name=yearOnly]'));
                } else {
                    if (driversObject.drivers[index].driving_experience_started == null)
                        driverLicenseIssue = null;
                    else
                        drivingExperienceStarted = new Date(driversObject.drivers[index].driving_experience_started).toLocaleString();

                }
            } catch (e) {
                drivingExperienceStarted = null;
            }

            let driverLicenseIssue;
            try {
                if (driversObject.drivers[index].additional_parameters.year_only) {
                    driverLicenseIssue = (driversObject.drivers[index].driver_licenses[0].issue_date).substr(0, 4);
                    setCheckboxInput($(this).find('input[name=yearOnly]'));
                } else {
                    if (driversObject.drivers[index].driver_licenses[0].issue_date == null)
                        driverLicenseIssue = null;
                    else
                        driverLicenseIssue = new Date(driversObject.drivers[index].driver_licenses[0].issue_date).toLocaleString();
                }
            } catch (e) {
                driverLicenseIssue = null;
            }

            $(this).find('input[name=last_name]').val(driversObject.drivers[index].last_name);
            $(this).find('input[name=first_name]').val(driversObject.drivers[index].first_name);
            $(this).find('input[name=patronymic]').val(driversObject.drivers[index].patronymic);

            $(this).find('input[name=birth_date]').val(birthDate);
            $(this).find('input[name=driver_licenses_numbers]').val(driversObject.drivers[index].driver_licenses[0].number + driversObject.drivers[index].driver_licenses[0].series);
            $(this).find('input[name=driving_experience_started]').val(drivingExperienceStarted);
            $(this).find('input[name=previous_last_name]').val();
            $(this).find('input[name=previous_driver_licenses_numbers]').val();
        });
    } catch (e) {
        console.log(e);
        store.add(number_plate, {drivers: [{}]});
    }
}