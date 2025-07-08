import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotasProfesor = () => {
  const [claseId, setClaseId] = useState('');
  const [notas, setNotas] = useState<any[]>([]);
  const [clases, setClases] = useState<any[]>([]);

  useEffect(() => {
    const profesor_matricula = localStorage.getItem('matricula');
    if (profesor_matricula) {
      axios.get(`/api/clases?profesor_matricula=${profesor_matricula}`)
        .then(res => setClases(res.data));
    }
  }, []);

  const cargarNotas = () => {
    if (claseId) {
      axios.get(`/api/clases/${claseId}/notas`)
        .then(res => setNotas(res.data));
    }
  };

  return (
    <div>
      <h2>Notas de Estudiantes</h2>
      <select value={claseId} onChange={e => setClaseId(e.target.value)}>
        <option value="">Selecciona una clase</option>
        {clases.map(clase => (
          <option key={clase.id} value={clase.id}>{clase.nombre}</option>
        ))}
      </select>
      <button onClick={cargarNotas} disabled={!claseId}>Ver Notas</button>
      <table>
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nombre</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          {notas.map(nota => (
            <tr key={nota.matricula_estudiante}>
              <td>{nota.matricula_estudiante}</td>
              <td>{nota.nombre_estudiante}</td>
              <td>{nota.nota}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotasProfesor;
