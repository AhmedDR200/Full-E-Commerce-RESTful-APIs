const express = require('express');
const router = express.Router();

const {
    addItemToCart
} = require('../controllers/cartController');


const { protect, allowedTo } = require("../controllers/authController");

router.use(protect, allowedTo('user'))

router.route('/')
// .get(getAllCoupons)
.post(addItemToCart);

// router.route('/:id')
// .get(getCoupon)
// .patch(updateCoupon)
// .delete(deleteCoupon);



module.exports = router;