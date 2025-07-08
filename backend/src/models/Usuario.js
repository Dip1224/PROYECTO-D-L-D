const { DataTypes } = require('sequelize');
const sequelize = require('../database');


const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  matricula: { type: DataTypes.STRING(20), allowNull: false },
  usuario: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  contrasena: { type: DataTypes.STRING(255), allowNull: false },
  rol: { type: DataTypes.ENUM('estudiante', 'profesor', 'admin'), allowNull: false },
  especializacion_id: { type: DataTypes.INTEGER, allowNull: true },
  creado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;