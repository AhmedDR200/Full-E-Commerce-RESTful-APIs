const express = require('express');
const router = express.Router();
const { param, validationResult } = require('express-validator');
const {getCategories,
       createCategory,
       getCategory,
       updateCategory,
       deleteCategory} = require('../controllers/catController');




router.route('/')
.get(getCategories)
.post(createCategory);


router.route('/:id')
.get(param('id')
       .isMongoId()
       .withMessage('Invalid ID')
       , (req, res) =>{
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
          }else{
          res.send('ok');
          }
       }
,getCategory)

.patch(updateCategory)
.delete(deleteCategory);

module.exports = router;