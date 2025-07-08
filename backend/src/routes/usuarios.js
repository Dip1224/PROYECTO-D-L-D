const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.obtenerUsuarios);
router.post('/', usuariosController.agregarUsuario);
router.put('/:id', usuariosController.editarUsuario);
router.delete('/:id', usuariosController.eliminarUsuario);

module.exports = router;