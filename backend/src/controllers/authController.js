const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { usuario, contrasena } = req.body;
  try {
    console.log('Intento de login:', usuario, contrasena);

    const user = await Usuario.findOne({ where: { usuario } });
    console.log('Usuario encontrado:', user);
    if (!user) {
      console.log('No se encontró el usuario');
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    const valid = await bcrypt.compare(contrasena, user.contrasena);
    console.log('¿Contraseña válida?', valid);
    if (!valid) {
      console.log('Contraseña incorrecta');
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    console.log('Rol del usuario:', user.rol);

    // Buscar nombre según el rol
    let nombre = '';
    if (user.rol === 'profesor') {
      // Usar el campo usuario de la tabla usuarios como nombre visible
      nombre = user.usuario;
      res.json({
        id: user.id,
        usuario: user.usuario,
        matricula: user.matricula,
        rol: user.rol,
        nombre
      });
      return;
    } else if (user.rol === 'estudiante') {
      const { Estudiante, Inscripcion, Clase, Especializacion } = require('../models');
      // Buscar estudiante y su especialización (por FK o por nombre, según tu base)
      const est = await Estudiante.findOne({ where: { matricula: user.matricula } });
      console.log('Estudiante encontrado:', est);
      let especializacionNombre = '';
      if (est && est.especializacion_id) {
        const esp = await Especializacion.findOne({ where: { id: est.especializacion_id } });
        especializacionNombre = esp ? esp.nombre : '';
        console.log('Especialización encontrada:', esp);
      }
      // Buscar materias inscritas
      const inscripciones = await Inscripcion.findAll({ where: { matricula_estudiante: user.matricula } });
      console.log('Inscripciones encontradas:', inscripciones);
      let materias = [];
      if (inscripciones && inscripciones.length > 0) {
        const claseIds = inscripciones.map(i => i.clase_id);
        const clases = await Clase.findAll({ where: { id: claseIds } });
        materias = clases.map(c => c.nombre);
        console.log('Clases encontradas:', clases);
      }
      res.json({
        id: user.id,
        usuario: user.usuario,
        matricula: user.matricula,
        rol: user.rol,
        nombre: est ? est.nombre : '',
        sexo: est ? est.sexo : '',
        edad: est ? est.edad : '',
        especializacion: especializacionNombre,
        correo: est && est.correo ? est.correo : '',
        materias
      });
      return;
    } else {
      nombre = user.usuario;
    }

    res.json({
      id: user.id,
      usuario: user.usuario,
      matricula: user.matricula,
      rol: user.rol,
      nombre
    });
  } catch (err) {
    console.error('Error en el login:', err);
    res.status(500).json({ mensaje: 'Error en el login', error: err });
  }
};