const { check, body } = require('express-validator');
const validetorMiddleware = require('../middlewares/validetorMiddleware');
const Review = require('../models/review');

const getReviewValidator =  [
    check('id')
    .isMongoId()
    .withMessage('Invalid Review ID Provided !')

    ,validetorMiddleware
]


const createReviewValidator = [
    check('title')
    .optional(),

    check('rating')
    .notEmpty()
    .withMessage("Rating is required !")
    .isFloat({min: 1, max: 5})
    .withMessage("Rating must be between 1 and 5 !"),

    // check('user')
    // .isMongoId()
    // .withMessage('Invalid User ID Provided !'),

    check('product')
    .isMongoId()
    .withMessage('Invalid Product ID Provided !')
    .custom((val, { req }) =>
      // Check if logged user create review before
      Review.findOne({ user: req.user._id, product: req.body.product }).then(
        (review) => {
          console.log(review);
          if (review) {
            return Promise.reject(
              new Error('You already created a review before !')
            );
          }
        }
      )
    )

    ,validetorMiddleware
]


const updateReviewValidator = [
    check('title')
    .optional(),

    check('id')
    .isMongoId()
    .withMessage('Invalid Review ID Provided !')
    .custom((val, { req }) =>
      // Check review ownership before update
      Review.findById(val).then((review) => {
        if (!review) {
          return Promise.reject(new Error(`There is no review with id ${val}`));
        }

        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(
            new Error(`Your are not allowed to perform this action`)
          );
        }
      })
    ),
 
    check('rating')
    .notEmpty()
    .withMessage("Rating is required !")
    .isFloat({min: 1, max: 5})
    .withMessage("Rating must be between 1 and 5 !")

    ,validetorMiddleware
]


const deleteReviewValidator = [
    check('id')
    .isMongoId()
    .withMessage('Invalid Review ID Provided !')
    .custom((val, { req }) => {
        // Check review ownership before delete
        if (req.user.role === 'user') {
          return Review.findById(val).then((review) => {
            if (!review) {
              return Promise.reject(
                new Error(`There is no review with id ${val}`)
              );
            }
            if (review.user._id.toString() !== req.user._id.toString()) {
              return Promise.reject(
                new Error(`Your are not allowed to perform this action`)
              );
            }
          });
        }
        return true;
    })

    ,validetorMiddleware
]


module.exports = {
    getReviewValidator,
    createReviewValidator,
    updateReviewValidator,
    deleteReviewValidator
}
