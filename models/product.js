const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Product name is required'],
        unique: [true, 'Product name must be unique'],
        minleangth: [3, 'Product name must be at least 3 characters long'],
        maxleangth: [100, 'Product name must be at most 20 characters long'],
        trim: true,
    },
    slug:{
        type: String,
        lowercase: true,
    },
    price:{
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Product price must be at least 0'],
        max: [100000, 'Product price must be at most 100000'],
    },
    priceAfterDiscount:{
        type: Number,
        default: 0,
    },
    description:{
        type: String,
        required: [true, 'Product description is required'],
        minleangth: [20, 'Product description must be at least 10 characters long'],
        maxleangth: [1000, 'Product description must be at most 1000 characters long'],
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Product category is required'],
    },
    subcategories:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
        },
    ],
    brand:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    quantity:{
        type: Number,
        required: [true, 'Product quantity is required'],
        min: [0, 'Product quantity must be at least 0'],
        max: [100000, 'Product quantity must be at most 100000'],
    },
    sold:{
        type: Number,
        default: 0,
    },
    colors:{
        type: [String],
        enum: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    },
    imageCover:{
        type: String,
        required: [true, 'Product imageCover is required'],
    },
    images:[String],
    ratingsAverage:{
        type: Number,
        default: 1.0,
        min: [1, 'Product rating must be at least 1'],
        max: [5, 'Product rating must be at most 5'],
    },
    ratingsQuantity:{
        type: Number,
        default: 0,
    },
    },
    {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// virtual populate
productSchema.virtual("reviews", {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id'
});

// Populate category, subcategories and brand with Mongoose middleware
productSchema.pre(/^find/, function(next){
    this.populate({
        path: 'category',
        select: 'name'
    }).populate({
        path: 'subcategories',
        select: 'name'
    }).populate({
        path: 'brand',
        select: 'name'
    });
    next();
});

const setImageURL = (doc) => {
    // return image base url + image name
    if (doc.imageCover) {
        const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
        doc.imageCover = imageUrl;
    }
    if (doc.images) {
        const images = [];
        doc.images.forEach((image) => {
            const imageUrl = `${process.env.BASE_URL}/products/${image}`;
            images.push(imageUrl);
        });
        doc.images = images; // Update the doc.images property with the new array of image URLs
    }
};

// With FindAll, FindOne and Update
productSchema.post('init',(doc) =>{
  setImageURL(doc);
});
// With Create
productSchema.post('save', (doc) =>{
  setImageURL(doc);
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;