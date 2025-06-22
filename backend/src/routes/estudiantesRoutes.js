const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');

// Ruta para obtener todos los estudiantes
router.get('/', estudiantesController.obtenerEstudiantes);

// Ruta para crear un nuevo estudiante
router.post('/', estudiantesController.crearEstudiante);

// Ruta para actualizar un estudiante existente
router.put('/:id', estudiantesController.actualizarEstudiante);

// Ruta para eliminar un estudiante
router.delete('/:id', estudiantesController.eliminarEstudiante);

module.exports = router;