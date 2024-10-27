const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    cartItems : [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
            },
            color: {
                type: String,
            },
            price: {
                type: Number,
            },
        },
    ],
    taxPrice : {
        type: Number,
        default: 0.0
    },
    shippingPrice : {
        type: Number,
        default: 0.0
    },
    totalOrderPrice : {
        type: Number,
        default: 0.0
    },
    paymentMethodType : {
        type: String,
        enum : ['CASH', 'CARD'],
        default: 'CASH'
    },
    isPaid : {
        type: Boolean,
        default: false
    },
    paidAt : {
        type: Date
    },
    isDelivered : {
        type: Boolean,
        default: false
    },
    deliveredAt : {
        type: Date
    },
    shippingAddress: {
        details: String,
        phone: String,
        city: String,
        postalCode: Number,
    }
},{
    versionKey: false,
    timestamps: true,
});

orderSchema.pre(/^find/, function(next){
    this.populate({
        path: "user",
        select: " name profileImg email phone"
    })
    .populate({
        path: "cartItems.product",
        select: "title"
    });
    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;