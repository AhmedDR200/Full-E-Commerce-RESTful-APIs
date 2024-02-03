// Core Moudles
const path = require('path')

// 3rd Party Moudles
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');

// Main Route
const mountRoutes = require('./routes/mainRoute');

// Webhook Controller
const { webhookCheckout } = require('./controllers/orderController');

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

// Checkout webhook
app.post('/webhook-checkout',
 express.raw({ type: 'application/json' }),
  webhookCheckout
);

// Database connection
const dbConnection = require('./config/db');
dbConnection();

// Body Parser Middleware => limit the body size to 20kb
app.use(express.json({limit: '20kb'}));

// Prevent HTTP Parameter Pollution Middleware
app.use(hpp({
    // Add the fields that you want to allow duplicate values
    whitelist: [
        "price",
        "ratingsQuantity",
        "ratingsAverage",
        "sold",
        "quantity",
    ]
}));

// Swagger API documentation
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "DEVLANT E-COMMERCE APIS",
            version: "1.0.0",
            description: "API Documentation for Devlant E-commerce Application",
            contact: {
                name: "Ahmed Magdy",
                email: "alshwwhy212@gmail.com",
            }
        },
        servers: [
            {
                url: process.env.BASE_URL, // development server URL
            },
            {
                url: process.env.PROD_URL, // production server URL
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const spacs = swaggerJsdoc(swaggerOptions);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(spacs)
);


// Static Files Middleware
app.use(express.static(path.join(__dirname, 'uploads')))

// Morgan Middleware => Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Data Sanitization against NoSQL Query Injection Middleware
app.use(mongoSanitize());

// Rate Limiting Middleware
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/', limiter);

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
