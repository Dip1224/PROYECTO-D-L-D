# Plataforma de Gestión Universitaria

## Descripción General
Plataforma web para la gestión universitaria que permite el acceso de usuarios con roles de administrador, docente y estudiante. Los docentes pueden gestionar y consultar las clases que imparten; los estudiantes pueden inscribirse en materias, consultar sus notas y clases. El sistema incluye paneles visuales con gráficos estadísticos (tipo pastel y de barras) para el análisis académico y administrativo.

## Tecnologías Utilizadas
- **Frontend:** Next.js, TypeScript, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, Sequelize
- **Base de datos:** MySQL
- **Big Data/IA:** Python

## Estructura del Proyecto
```
plataforma-gestion-universitaria/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── database.js
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── app/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
├── ia-bigdata/
│   ├── analisis/
│   ├── modelos/
│   └── requirements.txt
├── database/
│   └── *.sql
└── README.md
```

## Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd plataforma-gestion-universitaria
```

### 2. Backend
```bash
cd backend
npm install
npm start
```

### 3. Frontend
```bash
cd ../frontend
npm install
npm run dev
```

### 4. IA/Big Data (opcional)
```bash
cd ../ia-bigdata
pip install -r requirements.txt
```

### 5. Base de datos
- Importa los archivos `.sql` de la carpeta `database/` en tu gestor MySQL.
- Configura las credenciales en `backend/src/database.js` si es necesario.

## Características
- Autenticación y roles (admin, docente, estudiante)
- Gestión de clases y especializaciones
- Inscripción de estudiantes
- Visualización de notas y clases
- Gráficos estadísticos (pastel y barras)
- Panel de administración

## Herramientas y Entorno de Desarrollo
- Visual Studio Code
- Node.js
- MySQL
- Git

## Formato de Entrega
- Informe
- Código fuente
- Presentación

---

> Desarrollado por el equipo de la Universidad, 2025.
