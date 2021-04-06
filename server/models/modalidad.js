const mongoose = require('mongoose');
const modalidadSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }

})

module.exports = mongoose.model("Modalidad", modalidadSchema);