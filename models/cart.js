const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    cartItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: [true, 'Quantity is required'],
            },
            color: {
                type: String,
                required: [true, 'Color is required'],
            },
            price: {
                type: Number,
                required: [true, 'Price is required'],
            },
        },
    ],
    totalCartPrice: {
        type: Number,
        required: [true, 'Total cart price is required'],
    },
    totalPriceAfterDiscount: {
        type: Number,
        required: [true, 'Total price after discount is required'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
}, {
    versionKey: false,
    timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;