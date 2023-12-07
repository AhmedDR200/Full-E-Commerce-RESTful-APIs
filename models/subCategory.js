const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: [true, 'Sub Category name must be unique'],
        minleangth: [2, 'Sub Category name must be at least 3 characters long'],
        maxleangth: [35, 'Sub Category name must be at most 20 characters long'],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Sub Category must belong to a Category']
    }
},
{
    timestamps: true,
    versionKey: false
});


const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;