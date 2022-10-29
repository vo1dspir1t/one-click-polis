function setCurrentAuto() {
    $.ajax({
        url: "./engine/setCurrentAuto.php",
        method: "POST",
        data: {
            'number_plate': $('#number_plate').inputmask('unmaskedvalue')
        }
    }).done(() => {
        window.location.href = './car.html';
    });
}