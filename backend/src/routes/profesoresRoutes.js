const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesoresController');

// Endpoint para obtener las clases de un profesor
router.get('/:matricula/clases', profesoresController.obtenerClasesProfesor);

module.exports = router;
