const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const newsSchema = new mongoose.Schema({

    title: {
        type: String,
        unique: true,
        required: true
    },
    subtitle: {
        type: String,

    },
    body: {
        type: String,
        unique: true,
        required: true
    },
    picture: {
        type: String
    },
    id: {
        type: Number,
        unique: true,
        required: true
    }
})

module.exports = mongoose.model("News", newsSchema);