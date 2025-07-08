const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('plataforma_nueva', 'root', '121224D', {
  host: 'localhost',
  dialect: 'mysql'
});

// Importar modelos
const Estudiante = require('./Estudiante');
const Especializacion = require('./Especializacion');
const Profesor = require('./Profesor');
const Clase = require('./Clase');
const Inscripcion = require('./Inscripcion');
const Usuario = require('./Usuario');

// Aquí puedes definir asociaciones si lo deseas

module.exports = {
  sequelize,
  Estudiante,
  Especializacion,
  Profesor,
  Clase,
  Inscripcion,
  Usuario
};