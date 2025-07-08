const sequelize = require('../database');

exports.estadisticaSexo = async (req, res) => {
  try {
    const [result] = await sequelize.query(
      'SELECT sexo, COUNT(*) AS total_estudiantes FROM estudiantes GROUP BY sexo'
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadística por sexo' });
  }
};

exports.estadisticaEdad = async (req, res) => {
  try {
    const [result] = await sequelize.query(
      'SELECT edad, COUNT(*) AS total_estudiantes FROM estudiantes GROUP BY edad'
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadística por edad' });
  }
};

exports.promedioEspecializacion = async (req, res) => {
  try {
    const [result] = await sequelize.query(
      `SELECT e2.nombre AS especializacion, AVG(i.nota) AS promedio
       FROM estudiantes est
       JOIN especializaciones e2 ON est.especializacion_id = e2.id
       JOIN inscripciones i ON est.id = i.estudiante_id
       GROUP BY e2.nombre`
    );
    res.json(Array.isArray(result) ? result : []);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener promedio por especialización' });
  }
};