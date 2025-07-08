const { faker } = require('@faker-js/faker');
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root', // Cambia por tu usuario real
  password: '121224D', // Cambia por tu contraseña real
  database: 'plataforma_nueva'
};

// Lista de nombres de materias/clases típicas
const clasesNombres = [
  'Matemáticas I', 'Matemáticas II', 'Física General', 'Química Básica',
  'Programación I', 'Programación II', 'Algoritmos', 'Bases de Datos',
  'Estadística', 'Contabilidad', 'Derecho Civil', 'Psicología General',
  'Biología', 'Anatomía', 'Microeconomía', 'Macroeconomía',
  'Historia Universal', 'Literatura', 'Educación Física', 'Inglés I',
  'Inglés II', 'Redes de Computadoras', 'Sistemas Operativos',
  'Ingeniería de Software', 'Administración', 'Ética Profesional',
  'Arquitectura de Computadoras', 'Cálculo Diferencial',
  'Cálculo Integral', 'Filosofía'
];

async function seedClases() {
  const connection = await mysql.createConnection(dbConfig);

  // Obtén los IDs de especializaciones y matrículas de profesores existentes
  const [especializaciones] = await connection.execute('SELECT id FROM especializaciones');
  const especializacionIds = especializaciones.map(e => e.id);
  const [profesores] = await connection.execute('SELECT matricula FROM profesores');
  const profesorMatriculas = profesores.map(p => p.matricula);

  for (const nombre of clasesNombres) {
    const descripcion = faker.lorem.sentence();
    const profesor_matricula = faker.helpers.arrayElement(profesorMatriculas);
    const especializacion_id = faker.helpers.arrayElement(especializacionIds);
    await connection.execute(
      'INSERT INTO clases (nombre, descripcion, profesor_matricula, especializacion_id, fecha_creacion) VALUES (?, ?, ?, ?, NOW())',
      [nombre, descripcion, profesor_matricula, especializacion_id]
    );
  }

  await connection.end();
  console.log('¡Clases insertadas!');
}

seedClases();
