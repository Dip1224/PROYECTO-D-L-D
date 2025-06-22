const Estudiante = require('../models/estudiante');

// Crear un nuevo estudiante
exports.crearEstudiante = async (req, res) => {
    try {
        const { nombre, edad, sexo, especializacion } = req.body;
        const nuevoEstudiante = await Estudiante.create({ nombre, edad, sexo, especializacion });
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el estudiante', error });
    }
};

// Obtener todos los estudiantes
exports.obtenerEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll();
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los estudiantes', error });
    }
};

// Actualizar un estudiante
exports.actualizarEstudiante = async (req, res) => {
    const { id } = req.params;
    const { nombre, edad, sexo, especializacion } = req.body;
    try {
        const estudiante = await Estudiante.findByPk(id);
        if (!estudiante) {
            return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        }
        await estudiante.update({ nombre, edad, sexo, especializacion });
        res.status(200).json(estudiante);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el estudiante', error });
    }
};

// Eliminar un estudiante
exports.eliminarEstudiante = async (req, res) => {
    const { id } = req.params;
    try {
        const estudiante = await Estudiante.findByPk(id);
        if (!estudiante) {
            return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        }
        await estudiante.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el estudiante', error });
    }
};