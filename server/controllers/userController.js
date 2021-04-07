const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signUp = (req, res) => {

    User.findOne({ email: req.body.email }, (error, userDB) => {
        if (error) {
            return res.status(500).json({
                message: "Server Error"
            })
        }
        if (userDB) {
            return res.status(400).json({
                message: "El usuario ya existe"
            })
        }
        const user = new User(req.body);
        user.save((error, user) => {

            if (error) {
                return res.status(400).json({
                    error,
                });
            }
            user.salt = undefined;
            user.hashed_password = undefined;
            res.json({
                user,
            });
        })
    })
}

exports.logIn = (req, res) => {



    const { email, password } = req.body;

    User.findOne({ email }).exec((error, userDB) => {
        if (error || !userDB) {
            return res.status(400).json({
                error: "El usuario no existe",
            });
        }
        if (!userDB.authenticate(password)) {
            return res.status(401).json({
                error: "Email o contraseña incorrectos",
            });
        }
        const token = jwt.sign({
            _id: userDB._id
        },

            process.env.SEED,
            { expiresIn: process.env.TOKEN_EXPIRY }
        );

        return res.json({
            user: userDB,
            token: token
        });
    });

}



exports.showUser = (req, res) => {

    User.find().exec((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        res.json(data)
    })
}


exports.showAllUsers = (req, res) => {

    User.find().populate("user").exec((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        res.json(data)
    })
}

exports.showUserById = (req, res, next, id) => {

    User.findById(id).exec((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        req.user = data;
        next()
    })
}

exports.showOneUser = (req, res) => {
    return res.json(req.profile)
}