const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Profesor = sequelize.define('Profesor', {
  matricula: {
    type: DataTypes.STRING(20),
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  departamento: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'profesores',
  timestamps: false
});

module.exports = Profesor;
