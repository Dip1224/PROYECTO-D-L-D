'use client';
import { useEffect, useState } from 'react';

export default function NotasEstudiante({ estudianteId }: { estudianteId: string | number }) {
  console.log('ID recibido en NotasEstudiante:', estudianteId);

  const [notas, setNotas] = useState<{ nombre: string, nota: string | number }[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/estudiantes/${estudianteId}/notas`)
      .then(res => res.json())
      .then(setNotas);
  }, [estudianteId]);

  if (!notas.length) return <div>No hay notas registradas.</div>;

  const promedio = notas.length
    ? (notas.reduce((acc, n) => acc + parseFloat(n.nota as string), 0) / notas.length).toFixed(2)
    : '0.00';

  return (
    <div>
      <h3>Mis Notas</h3>
      <table>
        <thead>
          <tr>
            <th>Clase</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((n, i) => (
            <tr key={i}>
              <td>{n.nombre}</td>
              <td>{parseFloat(n.nota as string).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>Promedio general: <b>{promedio}</b></div>
    </div>
  );
}