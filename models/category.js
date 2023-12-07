const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: [true, 'Category name must be unique'],
    minleangth: [3, 'Category name must be at least 3 characters long'],
    maxleangth: [35, 'Category name must be at most 20 characters long'],
    trim: true,
  },
  slug:{
    type: String,
    lowercase: true,
  }
},{
  versionKey: false,
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;