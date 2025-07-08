const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const estudiantesController = require('../controllers/estudiantesController');

router.post('/login', authController.login);
router.get('/:id/notas', estudiantesController.obtenerNotas);
router.get('/:id/clases', estudiantesController.obtenerClases);

module.exports = router;