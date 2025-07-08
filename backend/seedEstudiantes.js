const { faker } = require('@faker-js/faker');
const mysql = require('mysql2/promise');

async function seedEstudiantes() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '121224D', // ← tu contraseña real
    database: 'plataforma' // ← tu base de datos real
  });

  // Obtén los IDs de especializaciones existentes
  const [especializaciones] = await connection.execute('SELECT id FROM especializaciones');
  const especializacionIds = especializaciones.map(e => e.id);

  for (let i = 0; i < 200; i++) {
    const nombre = faker.person.fullName();
    const edad = faker.number.int({ min: 18, max: 30 });
    const sexo = faker.helpers.arrayElement(['Masculino', 'Femenino']);
    const especializacion_id = faker.helpers.arrayElement(especializacionIds);
    await connection.execute(
      'INSERT INTO estudiantes (nombre, edad, sexo, especializacion_id, fecha_creacion) VALUES (?, ?, ?, ?, NOW())',
      [nombre, edad, sexo, especializacion_id]
    );
  }

  await connection.end();
  console.log('¡Estudiantes insertados!');
}

seedEstudiantes();
