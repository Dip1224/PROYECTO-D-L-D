import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InscripcionesProfesor = () => {
  const [claseId, setClaseId] = useState('');
  const [inscripciones, setInscripciones] = useState<any[]>([]);
  const [clases, setClases] = useState<any[]>([]);

  useEffect(() => {
    const profesor_matricula = localStorage.getItem('matricula');
    if (profesor_matricula) {
      axios.get(`/api/clases?profesor_matricula=${profesor_matricula}`)
        .then(res => setClases(res.data));
    }
  }, []);

  const cargarInscripciones = () => {
    if (claseId) {
      axios.get(`/api/clases/${claseId}/inscripciones`)
        .then(res => setInscripciones(res.data));
    }
  };

  return (
    <div>
      <h2>Inscripciones de Estudiantes</h2>
      <select value={claseId} onChange={e => setClaseId(e.target.value)}>
        <option value="">Selecciona una clase</option>
        {clases.map(clase => (
          <option key={clase.id} value={clase.id}>{clase.nombre}</option>
        ))}
      </select>
      <button onClick={cargarInscripciones} disabled={!claseId}>Ver Inscripciones</button>
      <table>
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nombre</th>
            <th>Fecha de inscripción</th>
          </tr>
        </thead>
        <tbody>
          {inscripciones.map(insc => (
            <tr key={insc.matricula_estudiante}>
              <td>{insc.matricula_estudiante}</td>
              <td>{insc.nombre_estudiante}</td>
              <td>{insc.fecha_inscripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InscripcionesProfesor;
