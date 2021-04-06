const express = require('express');
const News = require('../models/news');

exports.createNews = (req, res) => {
    const news = new News(req.body)
    news.save((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        res.json({ data })
    })
}

exports.showNews = (req, res) => {

    News.find().exec((error, data) => {
        if (error) {
            return res.status(400).json({ error })
        }
        res.json(data)
    })
}

