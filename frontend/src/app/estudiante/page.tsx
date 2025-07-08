
"use client";


import React, { useState } from 'react';
import MenuEstudiante from '../../components/MenuEstudiante';
import NotasEstudiante from '../../components/NotasEstudiante';

// Nuevo componente para mostrar clases como tarjetas y detalles
function ClasesInicioEstudiante({ estudianteId }: { estudianteId: string }) {
  const [clases, setClases] = useState<any[]>([]);
  const [claseSeleccionada, setClaseSeleccionada] = useState<any | null>(null);

  React.useEffect(() => {
    fetch(`http://localhost:3001/api/estudiantes/${estudianteId}/clases`)
      .then(res => res.json())
      .then(setClases);
  }, [estudianteId]);

  if (!clases.length) return <div>No hay clases registradas.</div>;

  if (claseSeleccionada) {
    // Aquí puedes mostrar más detalles, por ahora solo nombre y descripción
    return (
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0093cc22' }}>
        <button onClick={() => setClaseSeleccionada(null)} style={{ marginBottom: 16 }}>&larr; Volver a mis clases</button>
        <h2>{claseSeleccionada.nombre}</h2>
        <p>{claseSeleccionada.descripcion}</p>
        {/* Aquí puedes agregar unidades, materiales, profesor, etc. */}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {clases.map((clase, i) => (
        <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 24, minWidth: 220, boxShadow: '0 2px 8px #0093cc22', cursor: 'pointer' }}
          onClick={() => setClaseSeleccionada(clase)}>
          <h3 style={{ margin: 0 }}>{clase.nombre}</h3>
          <p style={{ color: '#666', fontSize: 15 }}>{clase.descripcion}</p>
        </div>
      ))}
    </div>
  );
}


export default function EstudiantePage() {
  const [selected, setSelected] = useState('clases'); // Ahora "clases" es la vista por defecto
  const estudianteId = typeof window !== 'undefined' ? localStorage.getItem('matricula') || '' : '';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f7fafc', color: '#181c2f' }}>
      <div style={{ minWidth: 260, background: '#fff', boxShadow: '2px 0 12px 0 #0093cc11', padding: '32px 0' }}>
        <MenuEstudiante onSelect={setSelected} />
      </div>
      <main style={{ flex: 1, padding: '48px 32px' }}>
        {selected === 'clases' && (
          <ClasesInicioEstudiante estudianteId={estudianteId} />
        )}
        {selected === 'notas' && (
          <NotasEstudiante estudianteId={estudianteId} />
        )}
        {/* Aquí puedes agregar más vistas según la opción seleccionada */}
      </main>
    </div>
  );
}
