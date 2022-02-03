// functie om grote duizendtallen nederlandse puntnotatie te geven

function parseToDots(numberString) {
    return (parseFloat(numberString).toLocaleString('nl'));
}

export default parseToDots;