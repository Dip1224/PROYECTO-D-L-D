const { faker } = require('@faker-js/faker');
const mysql = require('mysql2/promise');

// Lista de nombres de materias/clases típicas
const clases = [
  'Matemáticas I',
  'Matemáticas II',
  'Física General',
  'Química Básica',
  'Programación I',
  'Programación II',
  'Algoritmos',
  'Bases de Datos',
  'Estadística',
  'Contabilidad',
  'Derecho Civil',
  'Psicología General',
  'Biología',
  'Anatomía',
  'Microeconomía',
  'Macroeconomía',
  'Historia Universal',
  'Literatura',
  'Educación Física',
  'Inglés I',
  'Inglés II',
  'Redes de Computadoras',
  'Sistemas Operativos',
  'Ingeniería de Software',
  'Administración',
  'Ética Profesional',
  'Arquitectura de Computadoras',
  'Cálculo Diferencial',
  'Cálculo Integral',
  'Filosofía'
];

async function seedClases() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia por tu usuario real
    password: '121224D', // Cambia por tu contraseña real
    database: 'plataforma' // Cambia por el nombre real de tu base de datos
  });

  for (const nombre of clases) {
    const descripcion = faker.lorem.sentence();
    await connection.execute(
      'INSERT INTO clases (nombre, descripcion, fecha_creacion) VALUES (?, ?, NOW())',
      [nombre, descripcion]
    );
  }

  await connection.end();
  console.log('¡Clases insertadas!');
}

seedClases();
