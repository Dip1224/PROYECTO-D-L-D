const { faker } = require('@faker-js/faker');
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '121224D',
  database: 'plataforma_nueva'
};

const NUM_INSCRIPCIONES = 400;

async function seedInscripciones() {
  try {
    const connection = await mysql.createConnection(dbConfig);

    // Obtén matrículas de estudiantes y clases existentes
    const [estudiantes] = await connection.execute('SELECT matricula FROM estudiantes');
    const [clases] = await connection.execute('SELECT id FROM clases');
    const estudianteMatriculas = estudiantes.map(e => e.matricula);
    const claseIds = clases.map(c => c.id);

    // Usar un Set para evitar duplicados
    const combinaciones = new Set();
    let insertados = 0;
    let intentos = 0;
    while (insertados < NUM_INSCRIPCIONES && intentos < NUM_INSCRIPCIONES * 5) {
      const matricula_estudiante = faker.helpers.arrayElement(estudianteMatriculas);
      const clase_id = faker.helpers.arrayElement(claseIds);
      const key = `${matricula_estudiante}-${clase_id}`;
      if (combinaciones.has(key)) {
        intentos++;
        continue;
      }
      combinaciones.add(key);
      const fecha_inscripcion = faker.date.between({ from: '2023-01-01', to: '2025-07-01' });
      const nota = faker.number.float({ min: 0, max: 100, precision: 0.01 });
      await connection.execute(
        'INSERT INTO inscripciones (matricula_estudiante, clase_id, fecha_inscripcion, nota) VALUES (?, ?, ?, ?)',
        [matricula_estudiante, clase_id, fecha_inscripcion, nota]
      );
      insertados++;
      intentos++;
    }

    await connection.end();
    console.log(`¡Inscripciones insertadas! Total: ${insertados}`);
  } catch (error) {
    console.error('Error al insertar inscripciones:', error.message);
  }
}

seedInscripciones();
