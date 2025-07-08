import React from 'react';

export default function DashboardEstudiante({ nombre, clases, promedio }: { nombre: string, clases: number, promedio: number }) {
  return (
    <div>
      <h2>¡Bienvenido, {nombre}!</h2>
      <div style={{ display: 'flex', gap: 24 }}>
        <div>
          <h3>Clases inscritas</h3>
          <p>{clases}</p>
        </div>
        <div>
          <h3>Promedio general</h3>
          <p>{promedio}</p>
        </div>
      </div>
      <div style={{ marginTop: 24 }}>
        <button>Ver mis clases</button>
        <button>Ver notas</button>
        <button>Ver estadísticas</button>
      </div>
    </div>
  );
}
