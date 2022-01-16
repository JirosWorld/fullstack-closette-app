// functie om grote duizendtallen nederlandse puntnotatie te geven

function parseToDots(numberString) {
    return (parseFloat(numberString).toLocaleString('nl'));
}

// is zelfde als: export default (parseToDots) => `${parseFloat(numberString).toLocaleString('nl')}`;`https://www.openstreetmap.org/?mlat=${toiletEntry && toiletEntry.latitude}&mlon=${toiletEntry && toiletEntry.longitude}&zoom=15}`

export default parseToDots;