const pool = require('../config/db');
const bcrypt = require('bcrypt');

class UsuarioService {
  static async crearUsuario(usuario) {
    const { nombres, apellidos, correo, celular, usuario: username, contraseña, id_rol } = usuario;

    // Verificar si el usuario ya existe
    const [existe] = await pool.query('SELECT id_usuario FROM usuarios WHERE usuario = ? OR correo = ?', [username, correo]);
    if (existe.length > 0) {
      throw new Error('El usuario o correo ya están registrados');
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Insertar usuario
    const [resultado] = await pool.query(
      'INSERT INTO usuarios (nombres, apellidos, correo, celular, usuario, contraseña, fecha_creacion, id_rol) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)',
      [nombres, apellidos, correo, celular, username, hashedPassword, id_rol]
    );

    return { id_usuario: resultado.insertId, ...usuario, contraseña: undefined };
  }

  static async autenticarUsuario(username, contraseña) {
    const [usuario] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [username]);
    
    if (usuario.length === 0) {
      throw new Error('Usuario no encontrado');
    }

    const valido = await bcrypt.compare(contraseña, usuario[0].contraseña);
    if (!valido) {
      throw new Error('Contraseña incorrecta');
    }

    return { id_usuario: usuario[0].id_usuario, nombres: usuario[0].nombres, usuario: usuario[0].usuario };
  }

  static async actualizarUsuario(id, datos) {
    const { nombres, apellidos, correo, celular, usuario, id_rol } = datos;
    await pool.query(
      'UPDATE usuarios SET nombres=?, apellidos=?, correo=?, celular=?, usuario=?, fecha_actualizacion=NOW(), id_rol=? WHERE id_usuario=?',
      [nombres, apellidos, correo, celular, usuario, id_rol, id]
    );
    return { id_usuario: id, ...datos };
  }

  static async obtenerUsuarioPorId(id) {
    const [usuario] = await pool.query('SELECT U.id_usuario, U.nombres, U.apellidos, U.correo, U.celular, U.usuario, U.fecha_creacion, U.fecha_actualizacion, U.id_rol, TU.rol FROM usuarios AS U INNER JOIN tipo_usuario AS TU ON TU.id_rol = U.id_rol WHERE id_usuario=?;', [id]);
    
    if (usuario.length === 0) {
      throw new Error('Usuario no encontrado');
    }
    
    return usuario[0];
  }
}

module.exports = UsuarioService;
