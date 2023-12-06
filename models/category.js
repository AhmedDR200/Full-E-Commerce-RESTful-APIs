const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
     type: String,
     required: true 
  }
},{
  versionKey: false,
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
