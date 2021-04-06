const expressJwt = require("express-jwt");
require('../config/config')

const User = require("../models/user");

//require access by sign in
exports.requireSignIn = expressJwt({
    secret: process.env.SEED,
    userProperty: "auth",
});

//find user by id
exports.userById = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: "User not found",
            });
        }
        req.profile = user;
        next();
    });
};

//check if the user is auth
exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Access denied",
        });
    }
    next();
};

//favorites 
exports.userFav = (req, res, next) => {
    let fav = [];

    req.body.custompase.audios.forEach((audio) => {
        fav.push({
            _id: audio._id,
            name: audio.name,
            tipo: audio.tipo,
            mp3: audio.mp3,
            active: audio.active
        });
    });
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { fav: fav } },
        { new: true },
        (error) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            }
            next();
        }
    )
}

