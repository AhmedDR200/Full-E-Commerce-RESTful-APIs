const express = require('express');
const router = express.Router();

const {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    uploadUserImage,
    resizeUserImage
} = require('../controllers/userController');

const {
    createUserValidator,
    updateUserValidator,
    getUserValidator,
    deleteUserValidator
} = require('../validators/userValidator')

router.route('/')
.get(getUsers)
.post(
    uploadUserImage,
    resizeUserImage,
    createUserValidator,
    createUser
);

router.route('/:id')
.get(getUserValidator,getUser)
.patch(
    uploadUserImage,
    resizeUserImage,
    updateUserValidator,
    updateUser
)
.delete(deleteUserValidator,deleteUser);



module.exports = router;