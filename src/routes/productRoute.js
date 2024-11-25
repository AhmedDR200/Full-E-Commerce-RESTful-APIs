const express = require('express');
const router = express.Router();

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getTopSoldProducts,
    getFirst5Products
} = require('../controllers/productController');

const {
    getProductValidator,
    createProductValidator,
    updateProductValidator,
    deleteProductValidator
} = require('../validators/productValidator');

const { cacheMiddleware } = require("../middlewares/redisMiddleware.js");

const { protect, allowedTo } = require("../controllers/authController");

router.get('/top', getTopSoldProducts);
router.get('/first5', getFirst5Products);

router.route('/')
.get(cacheMiddleware("products"), getProducts)
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