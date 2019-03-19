const mongoose = require('mongoose');

const typeSchema = mongoose.Schema({
    name: {
        require: true,
        type: String,
        unique: 1,
        maxlength: 20
    }
});

const Type = mongoose.model('Type', typeSchema);

module.exports = Type;
