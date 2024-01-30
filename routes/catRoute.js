const express = require('express');
const router = express.Router();

const 
{getCategories,
createCategory,
getCategory,
updateCategory,
deleteCategory,
uploadCategoryImage,
resizeCategoryImage} 
= require('../controllers/catController');

const { protect, allowedTo } = require("../controllers/authController");

const 
{getCategoryValidator,
createCategoryValidator,
updateCategoryValidator,
deleteCategoryValidator} 
= require('../validators/catValidator');



router.route('/')
.get(getCategories)
.post(
    protect,
    allowedTo('admin'),
    uploadCategoryImage,
    resizeCategoryImage,
    createCategoryValidator,
    createCategory
);

// nested route
const subCatRoutes = require('./subCatRoute');
router.use('/:catId/subCats', subCatRoutes);

router.route('/:id')
.get(getCategoryValidator,getCategory)
.patch(
    protect,
    allowedTo('admin'),
    uploadCategoryImage,
    resizeCategoryImage,
    updateCategoryValidator,
    updateCategory
)
.delete(
    protect,
    allowedTo('admin'),
    deleteCategoryValidator,
    deleteCategory);

module.exports = router;