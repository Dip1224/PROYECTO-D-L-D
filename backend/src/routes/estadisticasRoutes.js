const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticasController');

router.get('/sexo', estadisticasController.estadisticaSexo);
router.get('/edad', estadisticasController.estadisticaEdad);
router.get('/promedio-especializacion', estadisticasController.promedioEspecializacion);

module.exports = router;