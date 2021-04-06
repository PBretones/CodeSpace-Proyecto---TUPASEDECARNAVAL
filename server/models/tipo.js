const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const tipoSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        trim: true
    },
    author: {
        type: ObjectId,
        required: true,
        trim: true,
        ref: "Author"
    },
    picture: {
        type: String
    },
    final: {
        type: Boolean
    },
    modalidad: {
        type: ObjectId,
        ref: "Modalidad",
        required: true
    }

})

module.exports = mongoose.model("Tipo", tipoSchema);