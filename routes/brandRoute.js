const express = require('express');
const router = express.Router();

const {
    getBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand
} = require('../controllers/brandController');

const {
    getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deleteBrandValidator
} = require('../validators/brandValidator');




router.route('/')
.get(getBrands)
.post(createBrandValidator, createBrand);

router.route('/:id')
.get(getBrandValidator, getBrand)
.patch(updateBrandValidator, updateBrand)
.delete(deleteBrandValidator, deleteBrand);



module.exports = router;