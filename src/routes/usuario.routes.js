const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');

router.post('/registro', UsuarioController.crearUsuario);
router.post('/login', UsuarioController.autenticarUsuario);
router.put('/:id', UsuarioController.actualizarUsuario);
router.get('/:id', UsuarioController.obtenerUsuarioPorId);

module.exports = router;
