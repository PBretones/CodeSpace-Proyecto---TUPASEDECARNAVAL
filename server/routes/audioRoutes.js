const express = require('express');
const router = express.Router();

const { createAudio, showAudio } = require('../controllers/audioController');

router.post("/audio/create", createAudio);
router.get("/audio/show", showAudio);

module.exports = router;