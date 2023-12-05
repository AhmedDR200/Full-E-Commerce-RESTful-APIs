const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config();

const app = express();

// Morgan Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}



app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});






const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server (${process.env.NODE_ENV}) listening at http://localhost:${port}`)
});