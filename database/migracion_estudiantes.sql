-- MIGRACIÓN: Cambiar estructura de la tabla estudiantes para que sea compatible con Sequelize y el backend

-- 1. Renombrar la tabla original para respaldo
RENAME TABLE estudiantes TO estudiantes_old;

-- 2. Crear la nueva tabla estudiantes con los campos correctos
CREATE TABLE estudiantes (
    matricula VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    sexo ENUM('Masculino', 'Femenino') NOT NULL,
    especializacion_id INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (especializacion_id) REFERENCES especializaciones(id)
);

-- 3. Migrar los datos antiguos (ajusta según tus datos reales)
-- NOTA: Esto asume que puedes mapear especializacion (texto) a especializacion_id
-- Ejemplo de migración (debes adaptar según tus datos reales):
-- INSERT INTO estudiantes (matricula, nombre, edad, sexo, especializacion_id, fecha_creacion)
-- SELECT id, nombre, edad, sexo, (SELECT id FROM especializaciones WHERE nombre = estudiantes_old.especializacion), fecha_creacion FROM estudiantes_old;

-- 4. Elimina la tabla antigua si todo está correcto
-- DROP TABLE estudiantes_old;

-- 5. Ajusta las tablas relacionadas (inscripciones, etc.) para que usen matricula como FK
-- ALTER TABLE inscripciones DROP FOREIGN KEY ...;
-- ALTER TABLE inscripciones CHANGE estudiante_id matricula_estudiante VARCHAR(20);
-- ALTER TABLE inscripciones ADD CONSTRAINT fk_inscripcion_estudiante FOREIGN KEY (matricula_estudiante) REFERENCES estudiantes(matricula);

-- Repite para cualquier otra tabla que relacione estudiantes por id.
