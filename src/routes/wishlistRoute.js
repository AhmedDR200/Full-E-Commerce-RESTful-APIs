const express = require('express');
const router = express.Router();

const { addToWishlist,
        removeFromWishlist,
        getLoggedUserWishlist }
= require('../controllers/wishlistController');
const { protect, allowedTo } = require("../controllers/authController");

router.use(protect, allowedTo('user'));

router.route('/')
.post(addToWishlist)
.get(getLoggedUserWishlist);

router.delete('/:prodId', removeFromWishlist);

module.exports = router;