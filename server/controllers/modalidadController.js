const express = require('express');
const Modalidad = require('../models/modalidad');

exports.createModalidad = (req, res) => {
    const modalidad = new Modalidad(req.body)
    modalidad.save((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        res.json({ data })
    })
}

exports.showAllModalidad = (req, res) => {

    Modalidad.find().exec((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        res.json(data)
    })
}

exports.showModalidadById = (req, res, next, id) => {

    Modalidad.findById(id).exec((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        req.modalidad = data;
        next()
    })
}

exports.showOneModalidad = (req, res) => {

    return res.json(req.modalidad)
}

