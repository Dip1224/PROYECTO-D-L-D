const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Estudiante = sequelize.define('Estudiante', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sexo: {
        type: DataTypes.ENUM('Masculino', 'Femenino', 'Otro'),
        allowNull: false
    },
    especializacion: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'estudiantes',
    timestamps: true
});

module.exports = Estudiante;