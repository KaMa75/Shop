const mongoose = require('mongoose');

const materialSchema = mongoose.Schema({
    name: {
        require: true,
        type: String,
        unique: 1,
        maxlength: 20
    }
});

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;
