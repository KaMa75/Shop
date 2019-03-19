const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        maxlength: 50
    },
    model: {
        required: true,
        type: String,
        maxlength: 100
    },
    description: {
        required: true,
        type: String,
        maxlength: 100000
    },
    price: {
        required: true,
        type: Number,
        maxlength: 10
    },
    manufacturer: {
        type: Schema.Types.ObjectId,
        ref: 'Manufacturer',
        required: true
    },
    material: {
        type: Schema.Types.ObjectId,
        ref: 'Material',
        required: true
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Type',
        required: true
    },
    destiny: {
        type: Schema.Types.ObjectId,
        ref: 'Destiny',
        required: true
    },
    color: {
        required: true,
        type: Array,
        default: []
    },
    size: {
        required: true,
        type: String,
        maxlength: 20
    },
    healHeigth: {
        type: String,
        maxlength: 10
    },
    available: {
        required: true,
        type: Boolean
    },
    sold: {
        type: Number,
        maxlength: 1000,
        default: 0
    },
    publish: {
        required: true,
        type: Boolean
    },
    images: {
        type: Array,
        default: []
    }
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;