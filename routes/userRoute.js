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



router.route('/')
.get(getUsers)
.post(
    uploadUserImage,
    resizeUserImage,
    // createUserValidator,
    createUser
);

router.route('/:id')
.get(getUser)
.patch(
    uploadUserImage,
    resizeUserImage,
    // updateUserValidator,
    updateUser
)
.delete(deleteUser);



module.exports = router;