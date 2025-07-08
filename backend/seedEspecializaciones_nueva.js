const { faker } = require('@faker-js/faker');
const mysql = require('mysql2/promise');

// Configura tus datos de conexión aquí
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '121224D',
  database: 'plataforma_nueva'
};

// 1. ESPECIALIZACIONES
const especializaciones = [
  { nombre: 'Ingeniería en Sistemas', descripcion: 'Carrera enfocada en el desarrollo y gestión de sistemas informáticos.' },
  { nombre: 'Medicina', descripcion: 'Estudio de las ciencias de la salud y la atención médica.' },
  { nombre: 'Derecho', descripcion: 'Formación en leyes y procesos jurídicos.' },
  { nombre: 'Psicología', descripcion: 'Estudio del comportamiento y la mente humana.' },
  { nombre: 'Administración de Empresas', descripcion: 'Gestión y dirección de organizaciones empresariales.' },
  { nombre: 'Contaduría Pública', descripcion: 'Carrera dedicada a la gestión y auditoría de recursos financieros.' },
  { nombre: 'Ingeniería Civil', descripcion: 'Diseño y construcción de infraestructuras civiles.' },
  { nombre: 'Arquitectura', descripcion: 'Planificación y diseño de edificaciones y espacios urbanos.' },
  { nombre: 'Educación', descripcion: 'Formación de profesionales en la enseñanza.' },
  { nombre: 'Enfermería', descripcion: 'Atención y cuidado de la salud de las personas.' }
];

async function seedEspecializaciones() {
  const connection = await mysql.createConnection(dbConfig);
  for (const esp of especializaciones) {
    await connection.execute(
      'INSERT INTO especializaciones (nombre, descripcion, fecha_creacion) VALUES (?, ?, NOW())',
      [esp.nombre, esp.descripcion]
    );
  }
  await connection.end();
  console.log('¡Especializaciones insertadas!');
}

seedEspecializaciones();
