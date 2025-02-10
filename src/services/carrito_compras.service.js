const pool = require('../config/db');

class CarritoComprasService {
  static async agregarDetalle(detalle) {
    const query = 'INSERT INTO carrito_compras (id_usuario, id_detalle, id_detalle_personalizado, fecha) VALUES (?, ?, NULL, ?)';
    const values = [detalle.id_usuario, detalle.id_detalle, new Date()];
   const [resultado] = await pool.query(query, values);
    return { id_carrito: resultado.insertId, id_usuario: detalle.id_usuario, id_detalle: detalle.id_detalle };
  }

  static async eliminarDetalle(id_carrito, id_detalle, id_usuario) {
    const query = 'DELETE FROM carrito_compras WHERE id_carrito = ? AND id_detalle = ? AND id_usuario = ?';
    return pool.execute(query, [id_carrito, id_detalle, id_usuario]);
  }

  static async listarDetalles(id_usuario) {
    const query = `
            SELECT c.id_carrito, d.id_detalle, d.nombre, d.descuento, d.valor, c.id_usuario, 
            JSON_ARRAYAGG(JSON_OBJECT('id_producto', p.id_producto, 'nombre', p.description)) AS productos
            FROM carrito_compras c
            JOIN detalles d ON c.id_detalle = d.id_detalle
            JOIN productos_detalle pd ON d.id_detalle = pd.id_detalle
            JOIN productos p ON pd.id_producto = p.id_producto
            WHERE c.id_usuario = ?
            GROUP BY c.id_carrito, d.id_detalle, d.nombre, d.descuento, d.valor, c.id_usuario`;
    const [result] = await pool.execute(query, [id_usuario]);
    return result;
  }

  static async listarHistorial(id_usuario) {
    const query = `
            SELECT c.id_compras, d.id_detalle, d.nombre, d.descuento, d.valor, c.id_usuario, c.fecha_compra,
            JSON_ARRAYAGG(JSON_OBJECT('id_producto', p.id_producto, 'nombre', p.description)) AS productos
            FROM historial_compras c
            JOIN detalles d ON c.id_detalle = d.id_detalle
            JOIN productos_detalle pd ON d.id_detalle = pd.id_detalle
            JOIN productos p ON pd.id_producto = p.id_producto
            WHERE c.id_usuario = ?
            GROUP BY c.id_compras, d.id_detalle, d.nombre, d.descuento, d.valor, c.id_usuario;`;
    const [result] = await pool.execute(query, [id_usuario]);
    return result;
  }

  static async vaciarCarrito(id_usuario) {
    const query = 'DELETE FROM carrito_compras WHERE id_usuario = ?';
    return pool.execute(query, [id_usuario]);
  }
}

module.exports = CarritoComprasService;