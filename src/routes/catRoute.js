const express = require('express');
const router = express.Router();

const 
{getCategories,
createCategory,
getCategory,
updateCategory,
deleteCategory,} 
= require('../controllers/catController');

const { cacheMiddleware } = require("../middlewares/redisMiddleware.js");

const { protect, allowedTo } = require("../controllers/authController");

const 
{getCategoryValidator,
createCategoryValidator,
updateCategoryValidator,
deleteCategoryValidator} 
= require('../validators/catValidator');



router.route('/')
.get(cacheMiddleware("cats"), getCategories)
.post(
    protect,
    allowedTo('admin'),
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
    updateCategoryValidator,
    updateCategory
)
.delete(
    protect,
    allowedTo('admin'),
    deleteCategoryValidator,
    deleteCategory);

module.exports = router;