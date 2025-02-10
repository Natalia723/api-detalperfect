const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito_compras.controller');

// Rutas para el carrito de compras
router.post('/agregar', carritoController.agregarDetalle);
router.delete('/eliminar/detalle/:id_detalle/carrito/:id_carrito/usuario/:id_usuario', carritoController.eliminarDetalle);
router.get('/listar/:id_usuario', carritoController.listarDetalles);
router.get('/listar-historial/:id_usuario', carritoController.listarHistorialCarrito);
router.delete('/vaciar/:id_usuario', carritoController.vaciarCarrito);

module.exports = router;