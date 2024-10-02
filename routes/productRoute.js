const express = require('express');
const router = express.Router();

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getTopSoldProducts
} = require('../controllers/productController');

const {
    getProductValidator,
    createProductValidator,
    updateProductValidator,
    deleteProductValidator
} = require('../validators/productValidator');

const { protect, allowedTo } = require("../controllers/authController");

router.get('/top', getTopSoldProducts);

router.route('/')
.get(getProducts)
.post(
    protect,
    allowedTo('admin'),
    createProductValidator,
    createProduct
);

// nested route
const reviewsRoute = require('./reviewRoute')
router.use('/:prodId/reviews', reviewsRoute);

router.route('/:id')
.get(getProductValidator, getProduct)
.patch(
    protect,
    allowedTo('admin'),
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