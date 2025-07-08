const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('plataforma_nueva', 'root', '121224D', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

module.exports = sequelize;