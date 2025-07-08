'use client';
import { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function EstadisticasEstudiante() {
  const [sexo, setSexo] = useState([]);
  const [edad, setEdad] = useState([]);
  const [materia, setMateria] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/estudiantes/estadisticas/sexo').then(r => r.json()).then(setSexo);
    fetch('http://localhost:3001/api/estudiantes/estadisticas/edad').then(r => r.json()).then(setEdad);
    fetch('http://localhost:3001/api/estudiantes/estadisticas/promedio-materia').then(r => r.json()).then(setMateria);
  }, []);

  return (
    <div>
      <h3>Estadísticas</h3>
      <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <div>
          <h4>Distribución por sexo</h4>
          <Pie data={{
            labels: sexo.map((s: any) => s.sexo),
            datasets: [{ data: sexo.map((s: any) => s.total), backgroundColor: ['#0093cc', '#ff6384'] }]
          }} />
        </div>
        <div>
          <h4>Distribución por edad</h4>
          <Bar data={{
            labels: edad.map((e: any) => e.edad),
            datasets: [{ label: 'Estudiantes', data: edad.map((e: any) => e.total), backgroundColor: '#0093cc' }]
          }} />
        </div>
        <div>
          <h4>Promedio por materia</h4>
          <Bar data={{
            labels: materia.map((m: any) => m.materia),
            datasets: [{ label: 'Promedio', data: materia.map((m: any) => m.promedio), backgroundColor: '#ff6384' }]
          }} />
        </div>
      </div>
    </div>
  );
}