import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EstadisticasProfesor = () => {
  const [claseId, setClaseId] = useState('');
  const [estadisticas, setEstadisticas] = useState<any[]>([]);
  const [clases, setClases] = useState<any[]>([]);

  useEffect(() => {
    const profesor_matricula = localStorage.getItem('matricula');
    if (profesor_matricula) {
      axios.get(`/api/clases?profesor_matricula=${profesor_matricula}`)
        .then(res => setClases(res.data));
    }
  }, []);

  const cargarEstadisticas = () => {
    if (claseId) {
      axios.get(`/api/clases/${claseId}/estadisticas`)
        .then(res => setEstadisticas(res.data));
    }
  };

  return (
    <div>
      <h2>Estadísticas de la Clase</h2>
      <select value={claseId} onChange={e => setClaseId(e.target.value)}>
        <option value="">Selecciona una clase</option>
        {clases.map(clase => (
          <option key={clase.id} value={clase.id}>{clase.nombre}</option>
        ))}
      </select>
      <button onClick={cargarEstadisticas} disabled={!claseId}>Ver Estadísticas</button>
      <table>
        <thead>
          <tr>
            <th>Rango de Notas</th>
            <th>Total de Estudiantes</th>
          </tr>
        </thead>
        <tbody>
          {estadisticas.map(est => (
            <tr key={est.rango_notas}>
              <td>{est.rango_notas}</td>
              <td>{est.total_estudiantes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstadisticasProfesor;
