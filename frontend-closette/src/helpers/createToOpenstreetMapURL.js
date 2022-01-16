// functie om breedtegraad/lengtegraad link naar OpenstreetMap Kaart te converteren

function createMapURL(latitude,longitude) {
    return ('https://www.openstreetmap.org/?mlat=' + latitude + '&mlon=' + longitude + '&zoom=15');
}

export default createMapURL;