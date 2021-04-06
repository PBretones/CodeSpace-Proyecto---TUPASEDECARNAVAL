const express = require('express');
const Tipo = require('../models/tipo');

exports.createTipo = (req, res) => {
    const tipo = new Tipo(req.body)
    tipo.save((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        res.json({ data })
    })
}

exports.showTipo = (req, res) => {

    Tipo.find().exec((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        res.json(data)
    })
}
