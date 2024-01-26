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

const { protect, allowedTo } = require("../controllers/authController");


router.route('/')
.get(getProducts)
.post(
    protect,
    allowedTo('admin'),
    uploadProductImages,
    resizeProductImages,
    // createProductValidator,
    createProduct
);

router.route('/:id')
.get(getProductValidator, getProduct)
.patch(
    protect,
    allowedTo('admin'),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
)
.delete(
    protect,
    allowedTo('admin'),
    deleteProductValidator,
    deleteProduct
);


module.exports = router;