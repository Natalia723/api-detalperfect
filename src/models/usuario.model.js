class Usuario {
  constructor(id, nombres, apellidos, correo, celular, usuario, contraseña, fecha_creacion, fecha_actualizacion, id_rol) {
    this.id_usuario = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.correo = correo;
    this.celular = celular;
    this.usuario = usuario;
    this.contraseña = contraseña;
    this.fecha_creacion = fecha_creacion;
    this.fecha_actualizacion = fecha_actualizacion;
    this.id_rol = id_rol;
  }
}

module.exports = Usuario;
