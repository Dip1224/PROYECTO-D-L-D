const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root', // Cambia por tu usuario si es diferente
    password: '121224D', // Cambia por tu contraseña real
    database: 'plataforma_nueva' // El nombre correcto de tu base de datos
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos como ID ' + connection.threadId);
});

module.exports = connection;