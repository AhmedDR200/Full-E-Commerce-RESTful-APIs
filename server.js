const express = require('express');
const app = express();




app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});






const port = 3000;
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});