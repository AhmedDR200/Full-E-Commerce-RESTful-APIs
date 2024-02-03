// Core Moudles
const path = require('path')

// 3rd Party Moudles
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');

// Main Route
const mountRoutes = require('./routes/mainRoute');

// Utils
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
dotenv.config();

// Express app
const app = express();

// Cors Middleware
app.use(cors());
app.options('*', cors());

// Compression Middleware
app.use(compression());

// Database connection
const dbConnection = require('./config/db');
dbConnection();

// Body Parser Middleware
app.use(express.json());

// Static Files Middleware
app.use(express.static(path.join(__dirname, 'uploads')))

// Morgan Middleware => Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
mountRoutes(app);

// 404 Error Handling Middleware
app.all('*', (req, res, next) => {
    // const err = new Error(`Can't find ${req.originalUrl} on this server`);
    // err.status = 'fail';
    // err.statusCode = 404;
    next(new ApiError(`Can't find ${req.originalUrl} on this server`, 400));
});

// Global Error Handling Middleware
app.use(globalError);

// Server Connection
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server (${process.env.NODE_ENV}) listening at http://localhost:${port}`)
});

// Events => Event Loop => Callback Queue => Event Loop => Event Handler
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err);
    process.exit(1);
});
