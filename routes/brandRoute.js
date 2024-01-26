const express = require('express');
const router = express.Router();

const {
    getBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand,
    uploadBrandImage,
    resizeBrandImage
} = require('../controllers/brandController');

const {
    getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deleteBrandValidator
} = require('../validators/brandValidator');

const { protect, allowedTo } = require("../controllers/authController");


router.route('/')
.get(getBrands)
.post(
    protect,
    allowedTo('admin'),
    uploadBrandImage,
    resizeBrandImage,
    createBrandValidator,
    createBrand
);

router.route('/:id')
.get(getBrandValidator, getBrand)
.patch(
    protect,
    allowedTo('admin'),
    uploadBrandImage,
    resizeBrandImage,
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