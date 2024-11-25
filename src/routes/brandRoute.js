const express = require('express');
const router = express.Router();

const {
    getBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand,
} = require('../controllers/brandController');

const {
    getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deleteBrandValidator
} = require('../validators/brandValidator');

const { cacheMiddleware } = require("../middlewares/redisMiddleware.js");
const { protect, allowedTo } = require("../controllers/authController");


router.route('/')
.get(cacheMiddleware("brands"), getBrands)
.post(
    protect,
    allowedTo('admin'),
    createBrandValidator,
    createBrand
);

router.route('/:id')
.get(getBrandValidator, getBrand)
.patch(
    protect,
    allowedTo('admin'),
    updateBrandValidator,
    updateBrand
)
.delete(
    protect,
    allowedTo('admin'),
    deleteBrandValidator,
    deleteBrand
);



module.exports = router;