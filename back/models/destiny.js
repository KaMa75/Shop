const mongoose = require('mongoose');

const destinySchema = mongoose.Schema({
    name: {
        require: true,
        type: String,
        unique: 1,
        maxlength: 20
    }
});

const Destiny = mongoose.model('Destiny', destinySchema);

module.exports = Destiny;
