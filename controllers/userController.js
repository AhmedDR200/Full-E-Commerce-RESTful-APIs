const User = require('../models/user');
const factory = require('./handelers')
const asyncHandler = require('express-async-handler');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const {uploadSingleImage} = require('../middlewares/uploadImages')
const ApiError = require('../utils/apiError')
const bcrypt = require('bcryptjs')

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
const updateUser = asyncHandler(
  async (req, res, next) => {
      const doc = await User.findByIdAndUpdate(req.params.id,
      {
        name: req.body.name,
        slug: req.body.slug,
        phone: req.body.phone,
        email: req.body.email,
        profileImg: req.body.profileImg,
        role: req.body.role,
      },
      { new: true});

      if(!doc){
          return next(new ApiError('Not Found', 404));
      }

      res.status(200).json({
          status: 'success',
          data: {doc}
      });
});


// @desc    Change Password
// @route   PATCH /users/changePassword/:id
// @access  Private/Admin
const changePassword = asyncHandler(
  async (req, res, next) => {
      const doc = await User.findByIdAndUpdate(
        req.params.id,
      {
        password: await bcrypt.hash(req.body.password, 12),
        passwordChangedAt: Date.now(),
      },
      {
        new: true
      });

      if(!doc){
          return next(new ApiError('Not Found', 404));
      }

      res.status(200).json({
          status: 'success',
          message: 'Password Changed Successfully',
          data: {doc}
      });
});


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
    resizeUserImage,
    changePassword
};