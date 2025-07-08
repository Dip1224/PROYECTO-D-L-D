-- Poblar especialización con id=9 si no existe
INSERT INTO especializaciones (id, nombre, descripcion, fecha_creacion)
VALUES (9, 'Ingeniería en Sistemas', 'Especialización de ejemplo para pruebas', NOW())
ON DUPLICATE KEY UPDATE nombre=nombre;

-- Poblar una clase de ejemplo
INSERT INTO clases (id, nombre, descripcion, fecha_creacion, profesor_matricula, especializacion_id)
VALUES (1, 'Matemáticas Avanzadas', 'Clase de ejemplo', NOW(), 'PROF123', 9)
ON DUPLICATE KEY UPDATE nombre=nombre;

-- Poblar inscripción para EMPVTXZY en la clase 1
INSERT INTO inscripciones (matricula_estudiante, clase_id, fecha_inscripcion)
VALUES ('EMPVTXZY', 1, NOW());
