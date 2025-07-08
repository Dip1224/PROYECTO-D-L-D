const sequelize = require('../database');

// Obtener las clases que imparte un profesor por su matrícula
exports.obtenerClasesProfesor = async (req, res) => {
  const { matricula } = req.params;
  try {
    // Asegúrate de que la consulta es correcta y que el campo 'horario' exista en la tabla 'clases'
    const clases = await sequelize.query(
      'SELECT id, nombre, descripcion, fecha_creacion FROM clases WHERE profesor_matricula = ?',
      { replacements: [matricula], type: sequelize.QueryTypes.SELECT }
    );
    // Siempre devolver un array
    res.json(Array.isArray(clases) ? clases : [clases]);
  } catch (error) {
    console.error(error);  // Asegúrate de ver el error si algo sale mal
    res.status(500).json({ error: 'Error al obtener las clases del profesor' });
  }
};
