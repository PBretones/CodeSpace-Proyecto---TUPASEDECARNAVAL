const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const audioSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    mp3: {
        type: String,
        unique: true,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Audio", audioSchema);