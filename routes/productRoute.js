const express = require('express');
const router = express.Router();

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const {
    getProductValidator,
    createProductValidator,
    updateProductValidator,
    deleteProductValidator
} = require('../validators/productValidator');


router.route('/')
.get(getProducts)
.post(createProductValidator, createProduct);

router.route('/:id')
.get(getProductValidator, getProduct)
.patch(updateProductValidator, updateProduct)
.delete(deleteProductValidator, deleteProduct);


module.exports = router;