const express = require('express');
const router = express.Router();
const clasesController = require('../controllers/clasesController');

// Obtener todas las clases
router.get('/', clasesController.obtenerClases);

// Agregar clase
router.post('/', clasesController.agregarClase);

// Editar clase
router.put('/:id', clasesController.editarClase);

// Eliminar clase
router.delete('/:id', clasesController.eliminarClase);

module.exports = router;