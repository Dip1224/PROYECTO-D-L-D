const express = require('express');
const router = express.Router();
const inscripcionesController = require('../controllers/inscripcionesController');

router.get('/', inscripcionesController.obtenerInscripciones);
router.post('/', inscripcionesController.agregarInscripcion);
router.put('/:id', inscripcionesController.editarInscripcion);
router.delete('/:id', inscripcionesController.eliminarInscripcion);

module.exports = router;