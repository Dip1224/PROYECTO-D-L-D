const { faker } = require('@faker-js/faker');
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root', // Cambia por tu usuario real
  password: '121224D', // Cambia por tu contraseña real
  database: 'plataforma_nueva'
};

async function seedEstudiantesYProfesores() {
  const connection = await mysql.createConnection(dbConfig);

  // 1. Poblar estudiantes
  const [usuariosEstudiantes] = await connection.execute(
    "SELECT matricula, usuario, especializacion_id FROM usuarios WHERE rol = 'estudiante'"
  );
  for (const u of usuariosEstudiantes) {
    const edad = faker.number.int({ min: 18, max: 30 });
    const sexo = faker.helpers.arrayElement(['Masculino', 'Femenino']);
    await connection.execute(
      'INSERT INTO estudiantes (matricula, nombre, edad, sexo, especializacion_id) VALUES (?, ?, ?, ?, ?)',
      [u.matricula, u.usuario, edad, sexo, u.especializacion_id]
    );
  }

  // 2. Poblar profesores
  const [usuariosProfesores] = await connection.execute(
    "SELECT matricula FROM usuarios WHERE rol = 'profesor'"
  );
  const departamentos = [
    'Matemáticas', 'Física', 'Química', 'Ingeniería', 'Ciencias Sociales',
    'Humanidades', 'Salud', 'Economía', 'Educación', 'Computación'
  ];
  for (const u of usuariosProfesores) {
    const departamento = faker.helpers.arrayElement(departamentos);
    await connection.execute(
      'INSERT INTO profesores (matricula, departamento) VALUES (?, ?)',
      [u.matricula, departamento]
    );
  }

  await connection.end();
  console.log('¡Estudiantes y profesores insertados!');
}

seedEstudiantesYProfesores();
