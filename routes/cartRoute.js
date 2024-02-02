const express = require('express');
const router = express.Router();

const {
    addItemToCart,
    getUserCart
} = require('../controllers/cartController');


const { protect, allowedTo } = require("../controllers/authController");

router.use(protect, allowedTo('user'))

router.route('/')
.get(getUserCart)
.post(addItemToCart);

// router.route('/:id')
// .get(getCoupon)
// .patch(updateCoupon)
// .delete(deleteCoupon);



module.exports = router;