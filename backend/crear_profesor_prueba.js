const sequelize = require('./src/database');

async function crearUsuarioYProfesor() {
  const matricula = '12345';
  const usuario = {
    matricula,
    usuario: 'profesorprueba',
    contrasena: '123456',
    rol: 'profesor',
    especializacion_id: null
  };
  try {
    // Insertar usuario
    await sequelize.query(
      'INSERT INTO usuarios (matricula, usuario, contrasena, rol, especializacion_id) VALUES (?, ?, ?, ?, ?)',
      { replacements: [usuario.matricula, usuario.usuario, usuario.contrasena, usuario.rol, usuario.especializacion_id] }
    );
    // Insertar profesor
    await sequelize.query(
      'INSERT INTO profesores (matricula, departamento) VALUES (?, ?)',
      { replacements: [usuario.matricula, 'Departamento de Prueba'] }
    );
    console.log('Usuario y profesor de prueba creados correctamente.');
  } catch (error) {
    console.error('Error al crear usuario/profesor:', error);
  } finally {
    await sequelize.close();
  }
}

crearUsuarioYProfesor();
