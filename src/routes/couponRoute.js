const express = require('express');
const router = express.Router();

const {
    getAllCoupons,
    getCoupon,
    createCoupon,
    updateCoupon,
    deleteCoupon
} = require('../controllers/couponController');


const { protect, allowedTo } = require("../controllers/authController");

router.use(protect, allowedTo('admin'))

router.route('/')
.get(getAllCoupons)
.post(createCoupon);

router.route('/:id')
.get(getCoupon)
.patch(updateCoupon)
.delete(deleteCoupon);



module.exports = router;