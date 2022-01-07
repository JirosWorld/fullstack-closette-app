// let numberString = '';

function parseToDots(numberString) {
    return (parseFloat(numberString).toLocaleString('nl'));
}

// is zelfde als: export default (parseToDots) => `${parseFloat(numberString).toLocaleString('nl')}`;

export default parseToDots;