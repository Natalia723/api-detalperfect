class Producto {
  constructor(id_producto, id_grupo_producto, description, precio, estado, cantidad) {
    this.id_producto = id_producto;
    this.id_grupo_producto = id_grupo_producto;
    this.description = description;
    this.precio = precio;
    this.estado = estado;
    this.cantidad = cantidad;
  }
}

module.exports = Producto;
