const express = require('express');
const router = express.Router();

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImages,
    resizeProductImages
} = require('../controllers/productController');

const {
    getProductValidator,
    createProductValidator,
    updateProductValidator,
    deleteProductValidator
} = require('../validators/productValidator');


router.route('/')
.get(getProducts)
.post(
    uploadProductImages,
    resizeProductImages,
    // createProductValidator,
    createProduct
);

router.route('/:id')
.get(getProductValidator, getProduct)
.patch(
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
)
.delete(deleteProductValidator, deleteProduct);


module.exports = router;