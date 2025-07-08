const sequelize = require('../database');
const bcrypt = require('bcrypt');

// Ver todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const [result] = await sequelize.query('SELECT id, usuario, rol, matricula, especializacion_id FROM usuarios');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Agregar usuario
exports.agregarUsuario = async (req, res) => {
  let { usuario, contrasena, rol, matricula, especializacion_id } = req.body;
  const rolesPermitidos = ['estudiante', 'profesor', 'admin'];
  if (!rolesPermitidos.includes(rol)) {
    return res.status(400).json({ error: 'Rol no permitido' });
  }
  try {
    const hash = await bcrypt.hash(contrasena, 10);
    await sequelize.query(
      'INSERT INTO usuarios (usuario, contrasena, rol, matricula, especializacion_id) VALUES (?, ?, ?, ?, ?)',
      { replacements: [usuario, hash, rol, matricula, especializacion_id || null] }
    );
    return res.json({ mensaje: 'Usuario agregado correctamente' });
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    return res.status(500).json({ error: 'Error al agregar usuario' });
  }
};

// Modificar usuario (cambiar contraseña o rol)
exports.editarUsuario = async (req, res) => {
  const { id } = req.params;
  let { usuario, contrasena, rol, matricula, especializacion_id } = req.body;
  try {
    let query = 'UPDATE usuarios SET ';
    let replacements = [];
    if (usuario) {
      query += 'usuario=?, ';
      replacements.push(usuario);
    }
    if (rol) {
      query += 'rol=?, ';
      replacements.push(rol);
    }
    if (typeof matricula !== 'undefined') {
      query += 'matricula=?, ';
      replacements.push(matricula === '' ? null : matricula);
    }
    if (typeof especializacion_id !== 'undefined') {
      query += 'especializacion_id=?, ';
      replacements.push(especializacion_id === '' ? null : especializacion_id);
    }
    if (contrasena) {
      const hash = await bcrypt.hash(contrasena, 10);
      query += 'contrasena=?, ';
      replacements.push(hash);
    }
    // Quitar la última coma y espacio
    query = query.replace(/, $/, '');
    query += ' WHERE id=?';
    replacements.push(id);

    await sequelize.query(query, { replacements });
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al editar usuario' });
  }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize.query('DELETE FROM usuarios WHERE id=?', { replacements: [id] });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

// Actualizar usuario (editar todos los campos)
exports.actualizarUsuario = async (req, res) => {
  const id = req.params.id;
  let { usuario, contrasena, rol, matricula, especializacion_id } = req.body;
  try {
    const hash = contrasena ? await bcrypt.hash(contrasena, 10) : undefined;
    await sequelize.query(
      'UPDATE usuarios SET usuario = ?, contrasena = ?, rol = ?, matricula = ?, especializacion_id = ? WHERE id = ?',
      { replacements: [usuario, hash, rol, matricula, especializacion_id, id] }
    );
    return res.json({ mensaje: 'Usuario actualizado' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// Script temporal para crear usuario profesor "jaime"
async function crearUsuarioDocente() {
  const usuario = 'jaime';
  const contrasenaPlano = '1212';
  const rol = 'profesor';
  const estudiante_id = null; // No aplica para profesor

  const contrasena = await bcrypt.hash(contrasenaPlano, 10);

  await sequelize.query(
    'INSERT INTO usuarios (usuario, contrasena, rol, estudiante_id) VALUES (?, ?, ?, ?)',
    { replacements: [usuario, contrasena, rol, estudiante_id] }
  );
  console.log('Usuario profesor "jaime" creado');
}
// Descomenta la siguiente línea para ejecutar una vez y luego vuelve a comentarla
// crearUsuarioDocente();