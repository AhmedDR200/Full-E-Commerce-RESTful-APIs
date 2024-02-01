const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true, "name required"]
    },
    slug:{
        type: String,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: true,
        lowercase: true
    },
    phone:String,
    profileImg:String,

    password: {
        type: String,
        required: [true, "password required"],
        minlength: [6, "Too short password"]
    },
    
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    active: {
        type: Boolean,
        default: true,
    },
    // child referance => one to many rel
    wishlist:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    }]
},{
    timestamps: true,
    versionKey: false
});

// Hashing Password => Mongoose Schema
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;