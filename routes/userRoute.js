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
    changePassword,
    getLoggedUserData,
    updateLoggedUserPassword,
    updateLoggedUserData,
    deactivateLoggedUser
} = require('../controllers/userController');

const {
    createUserValidator,
    updateUserValidator,
    getUserValidator,
    deleteUserValidator,
    changePasswordValidator,
    updateLoggedUserValidator
} = require('../validators/userValidator')

const { protect, allowedTo } = require("../controllers/authController");


router.get("/getMe",
 protect,
 getLoggedUserData,
 getUser,
);

router.patch("/changeMyPassword",
 protect,
 updateLoggedUserPassword,
);

router.patch("/changeMyData",
 protect,
 updateLoggedUserValidator,
 updateLoggedUserData,
);

router.delete("/deactivateMe",
 protect,
 deactivateLoggedUser,
);

// Admin can access this routes
router.use(protect, allowedTo('admin'))

router.patch(
    "/changePassword/:id",
    changePasswordValidator,
    changePassword
);

router.route('/')
.get(protect, allowedTo('admin'), getUsers)
.post(
    uploadUserImage,
    resizeUserImage,
    createUserValidator,
    createUser
);

router.route('/:id')
.get(
    getUserValidator,
    getUser
)
.patch(
    uploadUserImage,
    resizeUserImage,
    updateUserValidator,
    updateUser
)
.delete(
    deleteUserValidator,
    deleteUser
);



module.exports = router;