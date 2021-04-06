const express = require('express');
const router = express.Router();

const { createTipo, showTipo, showAuthor } = require('../controllers/tipoController');

router.post("/tipo/create", createTipo);
router.get("/tipo/show", showTipo);
/* router.get("/tipo/show/:author", showAuthor); */

module.exports = router;