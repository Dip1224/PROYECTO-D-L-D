const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');


// Ruta para obtener todos los estudiantes
router.get('/', estudiantesController.obtenerEstudiantes);

// Ruta para crear un nuevo estudiante
router.post('/', estudiantesController.agregarEstudiante);

// Ruta para actualizar un estudiante existente
router.put('/:matricula', estudiantesController.editarEstudiante);

// Ruta para eliminar un estudiante
router.delete('/:id', estudiantesController.eliminarEstudiante);

// Ruta para obtener las notas de un estudiante
router.get('/:id/notas', estudiantesController.obtenerNotas);

// Ruta para obtener las clases de un estudiante
router.get('/:id/clases', estudiantesController.obtenerClases);

// Ruta para obtener estadísticas de estudiantes
router.get('/estadisticas/sexo', estudiantesController.estadisticaSexo);
router.get('/estadisticas/edad', estudiantesController.estadisticaEdad);
router.get('/estadisticas/promedio-materia', estudiantesController.promedioMateria);

module.exports = router;