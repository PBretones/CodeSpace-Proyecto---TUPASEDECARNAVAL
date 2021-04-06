const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const authorSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    photo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    modalidad: {
        type: ObjectId,
        required: true,
        ref: "Modalidad"
    }

})

module.exports = mongoose.model("Author", authorSchema);