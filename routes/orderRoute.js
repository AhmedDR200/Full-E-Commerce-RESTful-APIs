const express = require('express');
const router = express.Router();

const {
    createCashOrder
} = require('../controllers/orderController');


const { protect, allowedTo } = require("../controllers/authController");

router.use(protect, allowedTo('user'))

router.route('/:cartId')
.post(createCashOrder)



module.exports = router;