const ProductoService = require('../services/producto.service');

const crearProducto = async (req, res) => {
  try {
    const producto = await ProductoService.crearProducto(req.body);
    res.status(201).json({ mensaje: 'Producto creado exitosamente', producto });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const productoActualizado = await ProductoService.actualizarProducto(id, req.body);
    res.status(200).json({ mensaje: 'Producto actualizado correctamente', producto: productoActualizado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await ProductoService.obtenerProductoPorId(id);
    res.status(200).json(producto);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const listarProductos = async (req, res) => {
  try {
    const productos = await ProductoService.listarProductos();
    res.status(200).json(productos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await ProductoService.eliminarProducto(id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  crearProducto,
  actualizarProducto,
  obtenerProductoPorId,
  listarProductos,
  eliminarProducto
};
