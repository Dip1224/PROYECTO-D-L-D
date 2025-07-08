// filepath: backend/src/controllers/inscripcionesController.js
const sequelize = require('../database');

exports.obtenerInscripciones = async (req, res) => {
  try {
    const [result] = await sequelize.query(`
      SELECT inscripciones.id, estudiantes.matricula AS matricula_estudiante, clases.id AS clase_id, estudiantes.nombre AS estudiante, clases.nombre AS clase, inscripciones.nota, inscripciones.fecha_inscripcion
      FROM inscripciones
      JOIN estudiantes ON estudiantes.matricula = inscripciones.matricula_estudiante
      JOIN clases ON clases.id = inscripciones.clase_id
    `);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener inscripciones' });
  }
};

exports.agregarInscripcion = async (req, res) => {
  const { matricula_estudiante, clase_id, nota } = req.body;
  try {
    await sequelize.query(
      'INSERT INTO inscripciones (matricula_estudiante, clase_id, fecha_inscripcion, nota) VALUES (?, ?, NOW(), ?)',
      { replacements: [matricula_estudiante, clase_id, nota] }
    );
    res.json({ mensaje: 'Inscripción agregada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar inscripción' });
  }
};

exports.editarInscripcion = async (req, res) => {
  const { id } = req.params;
  const { nota } = req.body;
  try {
    await sequelize.query(
      'UPDATE inscripciones SET nota=? WHERE id=?',
      { replacements: [nota, id] }
    );
    res.json({ mensaje: 'Inscripción actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al editar inscripción' });
  }
};

exports.eliminarInscripcion = async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize.query('DELETE FROM inscripciones WHERE id=?', { replacements: [id] });
    res.json({ mensaje: 'Inscripción eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar inscripción' });
  }
};