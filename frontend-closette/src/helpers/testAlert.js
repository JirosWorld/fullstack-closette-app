function testAlert(data) {
    const onSubmit = data => {
        alert(JSON.stringify(data));
    };
}
export default testAlert;