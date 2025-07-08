const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Especializacion = sequelize.define('Especializacion', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'especializaciones',
  timestamps: false
});

module.exports = Especializacion;