# Plataforma de Gestión Universitaria - Backend

Este documento proporciona información sobre la configuración y uso del backend de la Plataforma de Gestión Universitaria.

## Requisitos Previos

- Node.js (versión 14 o superior)
- MySQL (versión 5.7 o superior)
- npm (gestor de paquetes de Node.js)

## Instalación

1. Clona el repositorio:

   ```
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega al directorio del backend:

   ```
   cd plataforma-gestion-universitaria/backend
   ```

3. Instala las dependencias:

   ```
   npm install
   ```

4. Configura la base de datos MySQL. Asegúrate de que el servidor de base de datos esté en funcionamiento y crea una base de datos para la aplicación.

5. Actualiza el archivo `src/db.js` con tus credenciales de base de datos.

## Uso

Para iniciar el servidor, ejecuta el siguiente comando:

```
npm start
```

El servidor se ejecutará en `http://localhost:3000`.

## Estructura del Proyecto

- **src/app.js**: Punto de entrada de la aplicación. Configura el servidor Express y define las rutas.
- **src/db.js**: Maneja la conexión a la base de datos MySQL.
- **src/controllers/estudiantesController.js**: Controlador para manejar operaciones CRUD de estudiantes.
- **src/models/estudiante.js**: Define el modelo de datos para los estudiantes utilizando Sequelize.
- **src/routes/estudiantesRoutes.js**: Define las rutas relacionadas con los estudiantes.
- **src/services/iaService.py**: Contiene funciones para realizar análisis de inteligencia artificial.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva característica'`).
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.