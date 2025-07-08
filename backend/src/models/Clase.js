const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Clase = sequelize.define('Clase', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  profesor_matricula: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: {
      model: 'profesores',
      key: 'matricula'
    }
  },
  especializacion_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'especializaciones',
      key: 'id'
    }
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'clases',
  timestamps: false
});

module.exports = Clase;