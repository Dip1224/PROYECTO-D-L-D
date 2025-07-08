const { faker } = require('@faker-js/faker');
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root', // Cambia por tu usuario real
  password: '121224D', // Cambia por tu contraseña real
  database: 'plataforma_nueva'
};

// Cantidad de usuarios por rol
const NUM_ESTUDIANTES = 200;
const NUM_PROFESORES = 20;
const NUM_ADMINS = 3;

async function seedUsuarios() {
  const connection = await mysql.createConnection(dbConfig);

  // Obtén los IDs de especializaciones existentes
  const [especializaciones] = await connection.execute('SELECT id FROM especializaciones');
  const especializacionIds = especializaciones.map(e => e.id);

  // Insertar estudiantes
  for (let i = 0; i < NUM_ESTUDIANTES; i++) {
    const matricula = 'E' + faker.string.alphanumeric(7).toUpperCase();
    const usuario = faker.person.fullName();
    const contrasena = faker.internet.password({ length: 10 });
    const especializacion_id = faker.helpers.arrayElement(especializacionIds);
    await connection.execute(
      'INSERT INTO usuarios (matricula, usuario, contrasena, rol, especializacion_id) VALUES (?, ?, ?, ?, ?)',
      [matricula, usuario, contrasena, 'estudiante', especializacion_id]
    );
  }

  // Insertar profesores
  for (let i = 0; i < NUM_PROFESORES; i++) {
    const matricula = 'P' + faker.string.alphanumeric(7).toUpperCase();
    const usuario = faker.person.fullName();
    const contrasena = faker.internet.password({ length: 10 });
    await connection.execute(
      'INSERT INTO usuarios (matricula, usuario, contrasena, rol) VALUES (?, ?, ?, ?)',
      [matricula, usuario, contrasena, 'profesor']
    );
  }

  // Insertar administradores
  for (let i = 0; i < NUM_ADMINS; i++) {
    const matricula = 'A' + faker.string.alphanumeric(7).toUpperCase();
    const usuario = faker.person.fullName();
    const contrasena = faker.internet.password({ length: 10 });
    await connection.execute(
      'INSERT INTO usuarios (matricula, usuario, contrasena, rol) VALUES (?, ?, ?, ?)',
      [matricula, usuario, contrasena, 'admin']
    );
  }

  await connection.end();
  console.log('¡Usuarios insertados!');
}

seedUsuarios();
