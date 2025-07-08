const express = require('express');
const router = express.Router();
const docentesController = require('../controllers/docentesController');

// Endpoint para obtener las clases de un docente
router.get('/:id/clases', docentesController.obtenerClasesDocente);

module.exports = router;
