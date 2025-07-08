import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClasesProfesor = () => {
  const [clases, setClases] = useState<any[]>([]);

  useEffect(() => {
    // Aquí deberías obtener la matrícula del profesor autenticado
    const profesor_matricula = localStorage.getItem('matricula');
    if (profesor_matricula) {
      axios.get(`/api/clases?profesor_matricula=${profesor_matricula}`)
        .then(res => setClases(res.data));
    }
  }, []);

  return (
    <div>
      <h2>Mis Clases</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Especialización</th>
            <th>Fecha de creación</th>
          </tr>
        </thead>
        <tbody>
          {clases.map(clase => (
            <tr key={clase.id}>
              <td>{clase.id}</td>
              <td>{clase.nombre}</td>
              <td>{clase.descripcion}</td>
              <td>{clase.especializacion_id}</td>
              <td>{clase.fecha_creacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClasesProfesor;
