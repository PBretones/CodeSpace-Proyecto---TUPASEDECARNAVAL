const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const audiopaseSchema = new mongoose.Schema({
    song: {
        type: ObjectId,
        ref: "Audio"
    },
    name: {
        type: String,
        ref: "Audio"
    },
    mp3: {
        type: String,
        ref: "Audio"
    },
    picture: {
        type: String,
        ref: "Tipo",
    }

})

const Audiopase = mongoose.model("Audiopase", audiopaseSchema);

const custompaseSchema = new mongoose.Schema({
    tipo: {
        type: String
    },
    year: {
        type: Number,
    },
    audios: [audiopaseSchema],
    user: {
        type: ObjectId,
        ref: "User"
    },
    picture: {
        type: String
    }


})
const Custompase = mongoose.model("Custompase", custompaseSchema);

module.exports = { Custompase, Audiopase };