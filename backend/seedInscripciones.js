const { faker } = require('@faker-js/faker');
const mysql = require('mysql2/promise');

async function seedInscripciones() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia por tu usuario real
    password: '121224D', // Cambia por tu contraseña real
    database: 'plataforma' // Cambia por el nombre real de tu base de datos
  });

  // Obtén los IDs de estudiantes y clases existentes
  const [estudiantes] = await connection.execute('SELECT id FROM estudiantes');
  const [clases] = await connection.execute('SELECT id FROM clases');
  const estudianteIds = estudiantes.map(e => e.id);
  const claseIds = clases.map(c => c.id);

  // Genera 300 inscripciones aleatorias
  for (let i = 0; i < 300; i++) {
    const estudiante_id = faker.helpers.arrayElement(estudianteIds);
    const clase_id = faker.helpers.arrayElement(claseIds);
    const fecha_inscripcion = faker.date.between({ from: '2023-01-01', to: '2025-07-01' });
    const nota = faker.number.float({ min: 0, max: 100, precision: 0.01 });
    await connection.execute(
      'INSERT INTO inscripciones (estudiante_id, clase_id, fecha_inscripcion, nota) VALUES (?, ?, ?, ?)',
      [estudiante_id, clase_id, fecha_inscripcion, nota]
    );
  }

  await connection.end();
  console.log('¡Inscripciones insertadas!');
}

seedInscripciones();
