const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Estudiante = sequelize.define('Estudiante', {
  matricula: {
    type: DataTypes.STRING(20),
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sexo: {
    type: DataTypes.ENUM('Masculino', 'Femenino'),
    allowNull: false
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  especializacion_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'especializaciones',
      key: 'id'
    }
  },
  foto_perfil: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'estudiantes',
  timestamps: false
});


// Asociaciones
const Especializacion = require('./Especializacion');
Estudiante.belongsTo(Especializacion, {
  foreignKey: 'especializacion_id',
  as: 'especializacion'
});

module.exports = Estudiante;

