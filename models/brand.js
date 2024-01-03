const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Brand name is required'],
    unique: [true, 'Brand name must be unique'],
    minleangth: [3, 'Brand name must be at least 3 characters long'],
    maxleangth: [35, 'Brand name must be at most 20 characters long'],
    trim: true,
  },
  slug:{
    type: String,
    lowercase: true,
  },
  image:{
    type: String
  },
},
{
  versionKey: false,
  timestamps: true
});


const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;