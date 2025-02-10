const CarritoComprasService = require('../services/carrito_compras.service');

const agregarDetalle = async (req, res) => {
    try {
        const detalle = await CarritoComprasService.agregarDetalle(req.body);
        res.status(201).json({ mensaje: 'Detalle agregado al carrito de compras exitosamente', detalle });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarDetalle = async (req, res) => {
    try {
        await CarritoComprasService.eliminarDetalle(req.params.id_carrito, req.params.id_detalle, req.params.id_usuario);
        res.status(200).json({ message: 'Detalle eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const listarDetalles = async (req, res) => {
    try {
        const detalles = await CarritoComprasService.listarDetalles(req.params.id_usuario);
        res.status(200).json(detalles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const listarHistorialCarrito = async (req, res) => {
    try {
        const detalles = await CarritoComprasService.listarHistorial(req.params.id_usuario);
        res.status(200).json(detalles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const vaciarCarrito = async (req, res) => {
    try {
        await CarritoComprasService.vaciarCarrito(req.params.id_usuario);
        res.status(200).json({ message: 'Carrito vaciado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
  agregarDetalle,
  eliminarDetalle,
  listarDetalles,
  listarHistorialCarrito,
  vaciarCarrito
}