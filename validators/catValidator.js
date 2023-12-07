const { check } = require('express-validator');
const validetorMiddleware = require('../middlewares/validetorMiddleware');


const getCategoryValidator =  [
    check('id')
    .isMongoId()
    .withMessage('Invalid Category ID Provided !')
    ,validetorMiddleware
]


module.exports = getCategoryValidator;