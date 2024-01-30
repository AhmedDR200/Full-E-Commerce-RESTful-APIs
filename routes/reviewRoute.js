const express = require('express');
const router = express.Router({ mergeParams: true });

const {
    getReview,
    getReviews,
    createReview,
    updateReview,
    deleteReview,
    createFilterObj,
    setProdIdToBody
} = require('../controllers/reviewController.js.js');

const {
    createReviewValidator,
    updateReviewValidator,
    deleteReviewValidator,
    getReviewValidator
} = require('../validators/reviewValidator.js');

const { protect, allowedTo } = require("../controllers/authController.js");


router.route('/')
.get(createFilterObj, getReviews)
.post(
    protect,
    allowedTo('user'),
    setProdIdToBody,
    createReviewValidator,
    createReview
);

router.route('/:id')
.get(getReviewValidator, getReview)
.patch(
    protect,
     allowedTo('user'),
    updateReviewValidator,
    updateReview
)
.delete(
    protect,
    allowedTo('admin', 'user'),
    deleteReviewValidator,
    deleteReview
);



module.exports = router;