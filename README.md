# Plataforma de Gestión Universitaria con Integración de IA y Big Data

## Descripción del Proyecto
Este proyecto consiste en desarrollar una plataforma web para la gestión de estudiantes, clases y especializaciones en una universidad. La plataforma incluye funcionalidades de inteligencia artificial (IA) para predecir el rendimiento académico de los estudiantes y de Big Data para analizar grandes volúmenes de datos, generando informes avanzados y reportes interactivos.

## Estructura del Proyecto
El proyecto está dividido en tres componentes principales:

1. **Backend**: Implementado en Node.js y Express.js, maneja la lógica de la aplicación y la conexión a la base de datos MySQL.
2. **Frontend**: Desarrollado con React.js, proporciona una interfaz de usuario interactiva y atractiva.
3. **IA y Big Data**: Utiliza Python y bibliotecas como Scikit-learn y Apache Spark para realizar análisis de datos y predicciones.

## Tecnologías Utilizadas
- **Frontend**:
  - HTML5, CSS3, JavaScript
  - React.js
  - Chart.js o D3.js

- **Backend**:
  - Node.js
  - Express.js
  - MySQL
  - Sequelize (opcional)

- **IA y Big Data**:
  - Python
  - Scikit-learn o TensorFlow
  - Apache Spark (opcional)
  - Pandas

## Instalación
Para configurar el proyecto, sigue estos pasos:

1. **Clona el repositorio**:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```

2. **Instala las dependencias del backend**:
   Navega a la carpeta `backend` y ejecuta:
   ```
   npm install
   ```

3. **Configura la base de datos**:
   Asegúrate de tener MySQL instalado y crea una base de datos. Luego, ejecuta el script `esquema.sql` en la carpeta `database` para crear las tablas necesarias.

4. **Inicia el servidor backend**:
   Desde la carpeta `backend`, ejecuta:
   ```
   node src/app.js
   ```

5. **Instala las dependencias del frontend**:
   Navega a la carpeta `frontend` y ejecuta:
   ```
   npm install
   ```

6. **Inicia la aplicación frontend**:
   Desde la carpeta `frontend`, ejecuta:
   ```
   npm start
   ```

## Uso
Una vez que el servidor y la aplicación frontend estén en funcionamiento, podrás acceder a la plataforma a través de tu navegador en `http://localhost:3000`. Desde allí, podrás gestionar estudiantes, clases y especializaciones, así como visualizar reportes interactivos.

## Contribuciones
Las contribuciones son bienvenidas. Si deseas colaborar, por favor abre un issue o envía un pull request.

## Licencia
Este proyecto está bajo la Licencia MIT.