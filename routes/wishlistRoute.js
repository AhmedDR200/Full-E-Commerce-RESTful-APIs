const express = require('express');
const router = express.Router();

const { addToWishlist } = require('../controllers/wishlistController');
const { protect, allowedTo } = require("../controllers/authController");

router.post('/',
 protect,
 allowedTo('user'),
 addToWishlist
);


module.exports = router;