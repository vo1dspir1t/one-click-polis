function saveOwnerObjectToStorage(number_plate) {

    // store.add(number_plate, {owner: object});
}

function loadOwnerObjectFromStorage(number_plate) {
    const ownerObject = store.get(number_plate);

    try {

    } catch (e) {
        console.log(e);
        store.add(number_plate, {owner: [{}]});
    }
}