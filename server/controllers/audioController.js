const express = require('express');
const Audio = require('../models/audio');

exports.createAudio = (req, res) => {
    const audio = new Audio(req.body)
    audio.save((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        res.json({ data })
    })
}

exports.showAudio = (req, res) => {

    Audio.find().exec((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        res.json(data)
    })
}

