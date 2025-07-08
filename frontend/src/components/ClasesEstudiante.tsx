'use client';
import { useEffect, useState } from 'react';

export default function ClasesEstudiante({ estudianteId }: { estudianteId: string | number }) {
  // Asegura que siempre se use string
  const id = String(estudianteId);
  const [clases, setClases] = useState<{ id?: number, nombre: string, horario?: string, profesor?: string }[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/estudiantes/${id}/clases`)
      .then(res => res.json())
      .then(data => {
        // Si no viene el id, lo ignoramos, pero si viene lo usamos
        setClases(data);
      });
  }, [id]);

  if (!clases.length) return <div>No hay clases registradas.</div>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {clases.map((c, i) => (
        <a
          key={c.id || i}
          href={`/dashboard/${c.id || ''}`}
          style={{
            background: '#fff',
            borderRadius: 12,
            padding: 24,
            minWidth: 220,
            boxShadow: '0 2px 8px #0093cc22',
            marginBottom: 16,
            textDecoration: 'none',
            color: '#181c2f',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s',
            display: 'block',
          }}
        >
          <h3 style={{ margin: 0 }}>{c.nombre}</h3>
        </a>
      ))}
    </div>
  );
}