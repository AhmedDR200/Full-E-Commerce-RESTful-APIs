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
  },
  image:{
    type: String,
  },
},
{
  versionKey: false,
  timestamps: true
});

const setImageURL = (doc) => {
    // return image base url + image name
    if(doc.image){
      const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`
      doc.image = imageUrl;
    }
};
// With FindAll, FindOne and Update
categorySchema.post('init',(doc) =>{
  setImageURL(doc);
});
// With Create
categorySchema.post('save', (doc) =>{
  setImageURL(doc);
});


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;