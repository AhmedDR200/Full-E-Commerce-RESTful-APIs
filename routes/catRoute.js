const express = require('express');
const router = express.Router();
const {getCategories, createCategory} = require('../controllers/catController');




router.route('/cats')
.get(getCategories)
.post(createCategory);



module.exports = router;