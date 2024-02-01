const express = require('express');
const router = express.Router();

const { addToWishlist,
        removeFromWishlist }
= require('../controllers/wishlistController');
const { protect, allowedTo } = require("../controllers/authController");

router.post('/',
 protect,
 allowedTo('user'),
 addToWishlist
);

router.delete('/:prodId',
 protect,
 allowedTo('user'),
 removeFromWishlist
);

module.exports = router;