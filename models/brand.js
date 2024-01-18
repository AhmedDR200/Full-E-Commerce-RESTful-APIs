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


const setImageURL = (doc) => {
  // return image base url + image name
  if(doc.image){
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`
    doc.image = imageUrl;
  }
};

// With FindAll, FindOne and Update
brandSchema.post('init',(doc) =>{
setImageURL(doc);
});

// With Create
brandSchema.post('save', (doc) =>{
setImageURL(doc);
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;