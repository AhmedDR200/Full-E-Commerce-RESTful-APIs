const express = require('express');
const router = express.Router();

const {
    createCashOrder,
    getAllOrders,
    filterOrderForLoggedUser,
    getOrder,
    updateOrderToPaid,
    updateOrderToDelivred
} = require('../controllers/orderController');


const { protect, allowedTo } = require("../controllers/authController");


router.route('/:cartId')
.post(
    protect,
    allowedTo("user"),
    createCashOrder
)

router.route('/')
.get(
    protect,
    allowedTo("admin", "user"),
    filterOrderForLoggedUser,
    getAllOrders
)

router.get('/:id',
 protect,
 allowedTo("admin"),
 getOrder
)

router.put('/:id/pay',
 protect,
 allowedTo("admin"),
 updateOrderToPaid
);

router.put('/:id/deliver',
 protect,
 allowedTo("admin"),
 updateOrderToDelivred
);


module.exports = router;