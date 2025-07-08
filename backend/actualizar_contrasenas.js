const sequelize = require('./src/database');
const bcrypt = require('bcrypt');

async function actualizarContrasenas() {
  // Selecciona todos los usuarios
  const [usuarios] = await sequelize.query('SELECT id, contrasena FROM usuarios');
  for (const usuario of usuarios) {
    // Si la contraseña NO es un hash bcrypt (no empieza por $2b$)
    if (!usuario.contrasena.startsWith('$2b$')) {
      const hash = await bcrypt.hash(usuario.contrasena, 10);
      await sequelize.query(
        'UPDATE usuarios SET contrasena = ? WHERE id = ?',
        { replacements: [hash, usuario.id] }
      );
      console.log(`Contraseña actualizada para usuario id ${usuario.id}`);
    }
  }
  console.log('¡Actualización completa!');
  process.exit();
}

actualizarContrasenas();