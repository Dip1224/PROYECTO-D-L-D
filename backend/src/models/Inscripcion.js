const { DataTypes } = require('sequelize');
const sequelize = require('../database');


const Inscripcion = sequelize.define('Inscripcion', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  matricula_estudiante: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: {
      model: 'estudiantes',
      key: 'matricula'
    }
  },
  clase_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clases',
      key: 'id'
    }
  },
  fecha_inscripcion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  nota: { type: DataTypes.DECIMAL(5,2), allowNull: true }
}, {
  tableName: 'inscripciones',
  timestamps: false
});

module.exports = Inscripcion;