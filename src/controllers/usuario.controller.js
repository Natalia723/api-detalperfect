const UsuarioService = require('../services/usuario.service');

const crearUsuario = async (req, res) => {
  try {
    const usuario = await UsuarioService.crearUsuario(req.body);
    res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const autenticarUsuario = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;
    const datos = await UsuarioService.autenticarUsuario(usuario, contraseña);
    res.status(200).json({ mensaje: 'Autenticación exitosa', usuario: datos });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioActualizado = await UsuarioService.actualizarUsuario(id, req.body);
    res.status(200).json({ mensaje: 'Usuario actualizado correctamente', usuario: usuarioActualizado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await UsuarioService.obtenerUsuarioPorId(id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  crearUsuario,
  autenticarUsuario,
  actualizarUsuario,
  obtenerUsuarioPorId
};
