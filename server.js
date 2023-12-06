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



// Morgan Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body Parser Middleware
app.use(express.json());


// Routes
app.use('/', catsRoutes);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server (${process.env.NODE_ENV}) listening at http://localhost:${port}`)
});