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


exports.deleteCustomPase = (req, res) => {
    Custompase.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            } else {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};




exports.showAllPases = (req, res) => {

    Custompase.find().exec((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        res.json(data)
    })
}

exports.paseById = (req, res, next, id) => {
    Custompase.findByIdAndDelete(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: "Pase not found",
            });
        }
        req.profile = user;
        next();
    });
}


exports.deletePase = (req, res, next) => {
    let pase = req.custompase;
    console.log(pase);
    pase.remove((error) => {
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
