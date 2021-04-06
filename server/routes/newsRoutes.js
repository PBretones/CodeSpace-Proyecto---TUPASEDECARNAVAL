const express = require('express');
const router = express.Router();

const { createNews, showNews } = require('../controllers/newsController');

router.post("/news/create", createNews);
router.get("/news/show", showNews);

module.exports = router;