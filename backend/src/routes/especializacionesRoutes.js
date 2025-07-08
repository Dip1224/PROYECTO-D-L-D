const express = require('express');
const router = express.Router();
const especializacionesController = require('../controllers/especializacionesController');

router.get('/', especializacionesController.obtenerEspecializaciones);

module.exports = router;
