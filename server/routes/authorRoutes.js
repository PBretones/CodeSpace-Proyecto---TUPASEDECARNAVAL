const express = require('express');
const router = express.Router();

const { createAuthor, showOneAuthor, showAuthorById, showAllAuthors } = require('../controllers/authorController');


router.get("/author/show", showAllAuthors);
router.get("/author/:authorId", showOneAuthor);
router.post("/author/create", createAuthor);
router.param("authorId", showAuthorById);

module.exports = router;