const sequelize = require('../database');

// Obtener las clases que imparte un docente por su id
exports.obtenerClasesDocente = async (req, res) => {
  const { id } = req.params;
  try {
    const [clases] = await sequelize.query(
      'SELECT id, nombre, descripcion, horario FROM clases WHERE docente_id = ?',
      { replacements: [id] }
    );
    res.json(clases);
  } catch (error) {
    console.error('Error al obtener las clases del docente:', error);
    res.status(500).json({ error: 'Error al obtener las clases del docente' });
  }
};
