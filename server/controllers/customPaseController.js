const express = require('express');
const { Custompase } = require('../models/customPase');




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
    var id = req.params.id;
    Custompase.findOneAndDelete({ 'tpdc.custompase._id': id })
        .then(
            res.send({
                message: "Tutorial was deleted successfully!"
            })
        )
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
    next();
};




exports.showAllPases = (req, res) => {

    Custompase.find().exec((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        res.json(data)
    })
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


