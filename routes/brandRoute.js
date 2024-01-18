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




router.route('/')
.get(getBrands)
.post(
    uploadBrandImage,
    resizeBrandImage,
    createBrandValidator,
    createBrand
);

router.route('/:id')
.get(getBrandValidator, getBrand)
.patch(
    uploadBrandImage,
    resizeBrandImage,
    updateBrandValidator,
    updateBrand
)
.delete(deleteBrandValidator, deleteBrand);



module.exports = router;