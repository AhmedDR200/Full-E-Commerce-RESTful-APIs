const express = require('express');

// mergeParams: true is required to access the params of the parent router
const router = express.Router({mergeParams : true});

const{getSubCategories,
     createSubCategory,
     getSubCategory,
     updateSubCategory,
     deleteSubCategory,
     setCatIdToBody}
= require('../controllers/subCatController');

const{getSubCategoryValidator,
      createSubCategoryValidator,
      updateSubCategoryValidator,
      deleteSubCategoryValidator}
= require('../validators/subCatValidator');

const { protect, allowedTo } = require("../controllers/authController");



router.route('/')
.get(getSubCategories)
.post(
      protect,
      allowedTo('admin'),
      setCatIdToBody,
      createSubCategoryValidator,
      createSubCategory
);


router.route('/:id')
.get(getSubCategoryValidator, getSubCategory)
.patch(
      protect,
      allowedTo('admin'),
      updateSubCategoryValidator,
      updateSubCategory)
.delete(
      protect,
      allowedTo('admin'),
      deleteSubCategoryValidator,
      deleteSubCategory
);


module.exports = router;