const express = require('express');
const Author = require('../models/author');

exports.createAuthor = (req, res) => {
    const author = new Author(req.body)
    author.save((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        res.json({ data })
    })
}

exports.showAllAuthors = (req, res) => {

    Author.find().populate("modalidad").exec((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        res.json(data)
    })
}

exports.showAuthorById = (req, res, next, id) => {

    Author.findById(id).exec((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        req.author = data;
        next()
    })
}

exports.showOneAuthor = (req, res) => {

    return res.json(req.author)
}