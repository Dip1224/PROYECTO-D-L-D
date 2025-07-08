const sequelize = require('../database');

// Obtener todas las clases
exports.obtenerClases = async (req, res) => {
  try {
    const [result] = await sequelize.query('SELECT * FROM clases');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clases' });
  }
};

// Agregar clase
exports.agregarClase = async (req, res) => {
  const { nombre, descripcion, profesor_matricula, especializacion_id } = req.body;
  try {
    const [result] = await sequelize.query(
      'INSERT INTO clases (nombre, descripcion, profesor_matricula, especializacion_id, fecha_creacion) VALUES (?, ?, ?, ?, NOW())',
      { replacements: [nombre, descripcion, profesor_matricula, especializacion_id] }
    );
    console.log('Clase agregada:', { nombre, descripcion, profesor_matricula, especializacion_id, result });
    res.json({ mensaje: 'Clase agregada correctamente', result });
  } catch (error) {
    console.error('Error al agregar clase:', error);
    res.status(500).json({ error: 'Error al agregar clase', detalle: error.message });
  }
};

// Editar clase
exports.editarClase = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, especializacion_id } = req.body;
  try {
    const [result] = await sequelize.query(
      'UPDATE clases SET nombre=?, descripcion=?, especializacion_id=? WHERE id=?',
      { replacements: [nombre, descripcion, especializacion_id, id] }
    );
    console.log('Clase editada:', { id, nombre, descripcion, especializacion_id, result });
    res.json({ mensaje: 'Clase actualizada correctamente', result });
  } catch (error) {
    console.error('Error al editar clase:', error);
    res.status(500).json({ error: 'Error al editar clase', detalle: error.message });
  }
};

// Eliminar clase
exports.eliminarClase = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await sequelize.query('DELETE FROM clases WHERE id=?', { replacements: [id] });
    console.log('Clase eliminada:', { id, result });
    res.json({ mensaje: 'Clase eliminada correctamente', result });
  } catch (error) {
    console.error('Error al eliminar clase:', error);
    res.status(500).json({ error: 'Error al eliminar clase', detalle: error.message });
  }
};