const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 40
    },
    street: {
        type: String,
        required: true,
        maxlength: 40
    },
    houseNumber: {
        type: String,
        required: true,
        maxlength: 10
    },
    postCode: {
        type: String,
        required: true,
        maxlength: 10
    },
    city: {
        type: String,
        required: true,
        maxlength: 40
    },
    country: {
        type: String,
        required: true,
        maxlength: 40,
        default: 'Polska'
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
