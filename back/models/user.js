const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const SALT_I = 10;
require('dotenv').config();

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

userSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        bcrypt.genSalt(SALT_I, (err, salt) => {
            if(err) {
                return next(err);
            }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if(err) {
                    return next(err);
                }
                this.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(enteredPassword, callback){
    bcrypt.compare(enteredPassword, this.password, (err, isMatch) => {
        if(err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

userSchema.methods.generateToken = function(callback) {
    let token = jsonwebtoken.sign(this._id.toHexString(), process.env.SECRET);
    this.token = token;
    this.save((err, user) => {
        if(err) {
            return callback(err);
        }
        callback(null, user);
    });
};

userSchema.statics.findByToken = function(token, callback) {
    jsonwebtoken.verify(token, process.env.SECRET, (err, decode) => {
        this.findOne({"_id": decode, "token": token}, (err, user) => {
            if(err) {
                return callback(err);
            }
            callback(null, user);
        });
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
