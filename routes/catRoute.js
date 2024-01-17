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

const 
{getCategoryValidator,
createCategoryValidator,
updateCategoryValidator,
deleteCategoryValidator} 
= require('../validators/catValidator');



router.route('/')
.get(getCategories)
.post(
    uploadCategoryImage,
    resizeCategoryImage,
    createCategoryValidator,
    createCategory
);


const subCatRoutes = require('./subCatRoute');
router.use('/:catId/subCats', subCatRoutes);

router.route('/:id')
.get(getCategoryValidator,getCategory)
.patch(
    uploadCategoryImage,
    resizeCategoryImage,
    updateCategoryValidator,
    updateCategory
)
.delete(deleteCategoryValidator, deleteCategory);

module.exports = router;