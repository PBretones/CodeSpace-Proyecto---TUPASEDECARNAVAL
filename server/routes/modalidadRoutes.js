const express = require('express');
const router = express.Router();

const { createModalidad, showAllModalidad, showOneModalidad, showModalidadById } = require('../controllers/modalidadController');

router.get("/modalidad/show", showAllModalidad);
router.get("/modalidad/:modalidadId", showOneModalidad);
router.post("/modalidad/create", createModalidad);
router.param("modalidadId", showModalidadById);

module.exports = router;