const pool = require('../config/db');

class ProductoService {
  static async crearProducto(producto) {
    const { id_grupo_producto, description, precio, estado, cantidad } = producto;
    
    const [resultado] = await pool.query(
      'INSERT INTO productos (id_grupo_producto, description, precio, estado, cantidad) VALUES (?, ?, ?, ?, ?)',
      [id_grupo_producto, description, precio, estado, cantidad]
    );

    return { id_producto: resultado.insertId, ...producto };
  }

  static async actualizarProducto(id_producto, datos) {
    const { id_grupo_producto, description, precio, estado, cantidad } = datos;

    await pool.query(
      'UPDATE productos SET id_grupo_producto=?, description=?, precio=?, estado=?, cantidad=? WHERE id_producto=?',
      [id_grupo_producto, description, precio, estado, cantidad, id_producto]
    );

    return { id_producto, ...datos };
  }

  static async obtenerProductoPorId(id_producto) {
    const [producto] = await pool.query(
      'SELECT * FROM productos WHERE id_producto=?', [id_producto]
    );

    if (producto.length === 0) {
      throw new Error('Producto no encontrado');
    }

    return producto[0];
  }

  static async listarProductos() {
    const [productos] = await pool.query(
      'SELECT * FROM productos WHERE estado = "Activo"'
    );
    return productos;
  }

  static async eliminarProducto(id_producto) {
    await pool.query(
      'UPDATE productos SET estado="Inactivo" WHERE id_producto=?',
      [id_producto]
    );
    return { mensaje: 'Producto eliminado correctamente' };
  }
}

module.exports = ProductoService;
