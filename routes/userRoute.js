const express = require('express');
const router = express.Router();

const {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    uploadUserImage,
    resizeUserImage,
    changePassword
} = require('../controllers/userController');

const {
    createUserValidator,
    updateUserValidator,
    getUserValidator,
    deleteUserValidator,
    changePasswordValidator
} = require('../validators/userValidator')

const { protect, allowedTo } = require("../controllers/authController");

router.patch(
 "/changePassword/:id",
 changePasswordValidator,
 changePassword
)

router.route('/')
.get(protect, allowedTo('admin'), getUsers)
.post(
    protect,
    allowedTo('admin'),
    uploadUserImage,
    resizeUserImage,
    createUserValidator,
    createUser
);

router.route('/:id')
.get(
    protect,
    allowedTo('admin'),
    getUserValidator,
    getUser)
.patch(
    protect,
    allowedTo('admin'),
    uploadUserImage,
    resizeUserImage,
    updateUserValidator,
    updateUser
)
.delete(
    protect,
    allowedTo('admin'),
    deleteUserValidator,
    deleteUser
);



module.exports = router;