const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const catsRoutes = require('./routes/catRoute');
dotenv.config();

const app = express();

// Database connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL)
.then(() => console.log('DB Connected Successfully ...'))
.catch(err => console.log(err));


// Body Parser Middleware
app.use(express.json());


// Morgan Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


// Routes
app.use('/cats', catsRoutes);


// 404 Error Handling Middleware
app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server`);
    err.status = 'fail';
    err.statusCode = 404;
    next(err);
});


// Global Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(400).json({
        success: false,
        error: err.message
    });
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server (${process.env.NODE_ENV}) listening at http://localhost:${port}`)
});