const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/producto.controller');

router.post('/', ProductoController.crearProducto);
router.put('/:id', ProductoController.actualizarProducto);
router.get('/:id', ProductoController.obtenerProductoPorId);
router.get('/', ProductoController.listarProductos);
router.delete('/:id', ProductoController.eliminarProducto);

module.exports = router;
