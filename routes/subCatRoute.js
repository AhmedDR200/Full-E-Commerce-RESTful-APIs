const express = require('express');

// mergeParams: true is required to access the params of the parent router
const router = express.Router({mergeParams : true});

const{getSubCategories,
     createSubCategory,
     getSubCategory,
     updateSubCategory,
     deleteSubCategory}
= require('../controllers/subCatController');

const{getSubCategoryValidator,
      createSubCategoryValidator,
      updateSubCategoryValidator,
      deleteSubCategoryValidator}
= require('../validators/subCatValidator');




router.route('/')
.get(getSubCategories)
.post(createSubCategoryValidator, createSubCategory);


router.route('/:id')
.get(getSubCategoryValidator, getSubCategory)
.patch(updateSubCategoryValidator, updateSubCategory)
.delete(deleteSubCategoryValidator, deleteSubCategory);


module.exports = router;