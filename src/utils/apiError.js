// Description: This file contains the class for the ApiError object. This object is used to handle errors in the application.
//         The ApiError object is used in the 404 Error Handling Middleware and the Global Error Handling Middleware.
//         The ApiError object is used to differentiate between operational errors and programming errors.
//         The ApiError object is used to send the error message and the status code to the client.

class ApiError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // This is used to differentiate between operational errors and programming errors
    }
};

module.exports = ApiError;