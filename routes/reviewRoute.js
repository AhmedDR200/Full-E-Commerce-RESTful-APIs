const express = require('express');
const router = express.Router();

const {
    getReview,
    getReviews,
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/reviewController.js.js');

// const {
//     getBrandValidator,
//     createBrandValidator,
//     updateBrandValidator,
//     deleteBrandValidator
// } = require('../validators/brandValidator');

const { protect, allowedTo } = require("../controllers/authController.js");


router.route('/')
.get(getReviews)
.post(
    protect,
    allowedTo('user'),
    // createBrandValidator,
    createReview
);

router.route('/:id')
.get(getReview)
.patch(
    protect,
     allowedTo('user'),
    // updateBrandValidator,
    updateReview
)
.delete(
    protect,
    allowedTo('admin', 'user'),
    // deleteBrandValidator,
    deleteReview
);



module.exports = router;