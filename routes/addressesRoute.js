const express = require('express');
const router = express.Router();

const { addToAddresses,
        removeFromAddresses,
        getLoggedUserAddresses }
= require('../controllers/addressController');
const { protect, allowedTo } = require("../controllers/authController");

router.use(protect, allowedTo('user'));

router.route('/')
.post(addToAddresses)
.get(getLoggedUserAddresses);

router.delete('/:id', removeFromAddresses);

module.exports = router;