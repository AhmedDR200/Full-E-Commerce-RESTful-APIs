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
                default: 1
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
    },
    totalPriceAfterDiscount: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    versionKey: false,
    timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;