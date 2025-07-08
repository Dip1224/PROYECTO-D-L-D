const express = require('express');
const bodyParser = require('body-parser');
const estudiantesRoutes = require('./routes/estudiantesRoutes');
const authRoutes = require('./routes/authRoutes');
const clasesRoutes = require('./routes/clasesRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const inscripcionesRoutes = require('./routes/inscripcionesRoutes');
const estadisticasRoutes = require('./routes/estadisticasRoutes');
const especializacionesRoutes = require('./routes/especializacionesRoutes');
const profesoresRoutes = require('./routes/profesoresRoutes');
const docentesRoutes = require('./routes/docentesRoutes');
const sequelize = require('./database');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Rutas
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api', authRoutes);
app.use('/api/clases', clasesRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/inscripciones', inscripcionesRoutes);
app.use('/api/estadisticas', estadisticasRoutes);
app.use('/api/especializaciones', especializacionesRoutes);
app.use('/api/profesores', profesoresRoutes);

// Nueva ruta para docentes
app.use('/api/docentes', docentesRoutes);

// Ruta raíz para comprobar que el backend funciona
app.get('/', (req, res) => {
  res.send('¡Backend funcionando correctamente!');
});

// Conexión a la base de datos con Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

