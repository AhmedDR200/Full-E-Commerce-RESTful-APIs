const express = require('express');
const router = express.Router();
const {getCategories,
       createCategory,
       getCategory,
       updateCategory,
       deleteCategory} = require('../controllers/catController');
const getCategoryValidator = require('../validators/catValidator');



router.route('/')
.get(getCategories)
.post(createCategory);


router.route('/:id')
.get(getCategoryValidator,getCategory)

.patch(updateCategory)
.delete(deleteCategory);

module.exports = router;