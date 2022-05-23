const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
// Start the server by telling it which port to use. I am using port 3000 on my local environment; however, Heroku will assign a port for your app after deploying it, so both cases should be covered.
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// Make sure your index.html file is served, in case the user requests a resource currently not in the public folder
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
app.listen(port, () => {
    console.log('Server is up!');
});