const User = require('../models/user');
const factory = require('./handelers')
const asyncHandler = require('express-async-handler');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const {uploadSingleImage} = require('../middlewares/uploadImages')

// Image upload
const uploadUserImage = uploadSingleImage("profileImg");


const resizeUserImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  if(req.file){
    await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95})
    .toFile(`uploads/users/${filename}`)
  
   // save the image to DataBase   
    req.body.profileImg = filename;
  }
  
  next();
});


// @desc    Fetch all users
// @route   GET /users
// @access  Private/Admin
const getUsers = factory.getAll(User)


// @desc    create a user
// @route   POST /users
// @access  Private/Admin
const createUser = factory.createOne(User)


// @desc    Fetch a user
// @route   GET /users/:id
// @access  Private/Admin
const getUser = factory.getOne(User)


// @desc    Update a user
// @route   PUT /users/:id
// @access  Private/Admin
const updateUser = factory.updateOne(User)


// @desc    Delete a user
// @route   DELETE /users/:id
// @access  Private/Admin
const deleteUser = factory.deleteOne(User)


module.exports = {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    uploadUserImage,
    resizeUserImage
};