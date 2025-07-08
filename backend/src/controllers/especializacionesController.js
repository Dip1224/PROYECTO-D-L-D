const { Especializacion } = require('../models');

exports.obtenerEspecializaciones = async (req, res) => {
  try {
    const especializaciones = await Especializacion.findAll();
    res.json(especializaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener especializaciones' });
  }
};
