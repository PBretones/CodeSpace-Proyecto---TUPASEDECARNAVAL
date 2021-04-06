const express = require('express');
const { Custompase, Audiopase } = require('../models/customPase');


exports.createCustomPase = (req, res) => {

    req.body.custompase.user = req.profile;
    const custompase = new Custompase(req.body.custompase);
    custompase.save((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        res.json(data);
    })

}
exports.deleteCustomPase = (req, res, next) => {

    Custompase.findOneAndDelete({ _id: req.custompase._id }).exec((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        res.json(data)
    })
}

exports.showAllPases = (req, res) => {

    Custompase.find().exec((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        res.json(data)
    })
}

exports.paseById = (req, res, next, id) => {
    Custompase.findById(id).exec((error, data) => {
        if (error || !data) {
            return res.status(400).json({
                error: "Pase not found",
            });
        }
        req.profile = data;
        next();
    });
}


exports.deletePase = (req, res, next) => {
    let pase = req.custompase;
    console.log(pase);
    pase.remove((error,) => {
        if (error) {
            return res.status(400).json({
                error,
            });
        }
        res.json({
            message: "Pase was deleted successfully",
        });
        next();
    });
};


exports.showOnePase = (req, res) => {

    return res.json(req.custompase)
}
