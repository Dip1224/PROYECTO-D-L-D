const { Estudiante, Especializacion } = require('../models');
const db = require('../db'); // Asegúrate de tener esto arriba
const sequelize = require('../database');

// Crear un nuevo estudiante
exports.crearEstudiante = async (req, res) => {
    try {
        const { nombre, edad, sexo, especializacion_id } = req.body;
        const nuevoEstudiante = await Estudiante.create({ nombre, edad, sexo, especializacion_id });
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el estudiante', error });
    }
};

// Obtener todos los estudiantes (incluyendo el nombre de la especialización)
exports.obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll({
      include: [{ model: Especializacion, as: 'especializacion', attributes: ['id', 'nombre'] }]
    });
    res.json(estudiantes);
  } catch (error) {
    console.error('Error real al obtener estudiantes:', error);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
};

// Agregar estudiante (SQL directa, adaptada)
exports.agregarEstudiante = async (req, res) => {
  const { nombre, edad, sexo, especializacion_id } = req.body;
  try {
    await sequelize.query(
      'INSERT INTO estudiantes (nombre, edad, sexo, especializacion_id) VALUES (?, ?, ?, ?)',
      { replacements: [nombre, edad, sexo, especializacion_id] }
    );
    res.json({ mensaje: 'Estudiante agregado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar estudiante' });
  }
};

// Editar estudiante por matrícula
exports.editarEstudiante = async (req, res) => {
  const { matricula } = req.params;
  const { nombre, edad, sexo, especializacion_id } = req.body;
  console.log('Intentando actualizar estudiante:', { matricula, nombre, edad, sexo, especializacion_id });
  try {
    const [result] = await sequelize.query(
      'UPDATE estudiantes SET nombre=?, edad=?, sexo=?, especializacion_id=? WHERE matricula=?',
      { replacements: [nombre, edad, sexo, especializacion_id, matricula] }
    );
    console.log('Resultado del UPDATE:', result);
    if (result.affectedRows === 0 || result.changedRows === 0) {
      return res.status(404).json({ error: 'No se encontró el estudiante o no hubo cambios' });
    }
    res.json({ mensaje: 'Estudiante actualizado correctamente' });
  } catch (error) {
    console.error('Error al editar estudiante:', error);
    res.status(500).json({ error: error.message || 'Error al editar estudiante' });
  }
};

// Eliminar estudiante
exports.eliminarEstudiante = async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize.query('DELETE FROM estudiantes WHERE id=?', { replacements: [id] });
    res.json({ mensaje: 'Estudiante eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar estudiante' });
  }
};

exports.obtenerNotas = (req, res) => {
  const id = req.params.id;
  console.log('Buscando notas para matrícula:', id);
  db.query(
    'SELECT c.nombre, i.nota FROM inscripciones i JOIN clases c ON i.clase_id = c.id WHERE i.matricula_estudiante = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error('Error al obtener notas:', err);
        return res.status(500).json({ error: 'Error al obtener notas' });
      }
      res.json(results);
    }
  );
};

exports.obtenerClases = (req, res) => {
  const matricula = req.params.id;
  db.query(
    'SELECT c.id, c.nombre FROM inscripciones i JOIN clases c ON i.clase_id = c.id WHERE i.matricula_estudiante = ?',
    [matricula],
    (err, results) => {
      if (err) {
        console.error('Error al obtener clases:', err);
        return res.status(500).json({ error: 'Error al obtener clases' });
      }
      res.json(results);
    }
  );
};

// Distribución por sexo
exports.estadisticaSexo = (req, res) => {
  db.query(
    'SELECT sexo, COUNT(*) AS total FROM estudiantes GROUP BY sexo',
    (err, results) => {
      if (err) {
        console.error('Error al obtener estadística sexo:', err);
        return res.status(500).json({ error: 'Error al obtener estadística sexo' });
      }
      res.json(results);
    }
  );
};

// Distribución por edad
exports.estadisticaEdad = (req, res) => {
  db.query(
    'SELECT edad, COUNT(*) AS total FROM estudiantes GROUP BY edad',
    (err, results) => {
      if (err) {
        console.error('Error al obtener estadística edad:', err);
        return res.status(500).json({ error: 'Error al obtener estadística edad' });
      }
      res.json(results);
    }
  );
};

// Promedio por materia
exports.promedioMateria = (req, res) => {
  db.query(
    `SELECT c.nombre AS materia, AVG(i.nota) AS promedio
     FROM inscripciones i
     JOIN clases c ON i.clase_id = c.id
     GROUP BY c.nombre`,
    (err, results) => {
      if (err) {
        console.error('Error al obtener promedio por materia:', err);
        return res.status(500).json({ error: 'Error al obtener promedio por materia' });
      }
      res.json(results);
    }
  );
};