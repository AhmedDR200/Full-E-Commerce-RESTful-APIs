const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Coupon name is required'],
        unique: [true, 'Coupon name must be unique'],
    },
    discount: {
        type: Number,
        required: [true, 'Coupon discount is required'],
    },
    expiry: {
        type: Date,
        required: [true, 'Coupon expiry date is required'],
    },
    photos: {
        type: Array,
        default: [],
    },
}, {
    versionKey: false,
    timestamps: true,
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;