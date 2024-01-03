const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Product name is required'],
        unique: [true, 'Product name must be unique'],
        minleangth: [3, 'Product name must be at least 3 characters long'],
        maxleangth: [35, 'Product name must be at most 20 characters long'],
        trim: true,
    },
    slug:{
        type: String,
        required: [true, 'Product slug is required'],
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
    subcategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory'
    },
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
        required: [true, 'Product colors is required'],
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
    timestamps: true
});

const Product = mongoose.model('Brand', productSchema);
module.exports = Product;
