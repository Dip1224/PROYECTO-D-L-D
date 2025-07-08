import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function EstadisticasGlobales() {
  const [sexo, setSexo] = useState<any[]>([]);
  const [edad, setEdad] = useState<any[]>([]);
  const [especializacion, setEspecializacion] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/estadisticas/sexo')
      .then(res => res.json()).then(setSexo);
    fetch('http://localhost:3001/api/estadisticas/edad')
      .then(res => res.json()).then(setEdad);
    fetch('http://localhost:3001/api/estadisticas/promedio-especializacion')
      .then(res => res.json()).then(setEspecializacion);
  }, []);

  return (
    <div>
      <h2>Estadísticas Globales</h2>
      <div style={{ maxWidth: 400, margin: '0 auto' }}>
        <h3>Distribución por Sexo</h3>
        <Pie data={{
          labels: sexo.map((s: any) => s.sexo),
          datasets: [{
            data: sexo.map((s: any) => s.total_estudiantes),
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
          }]
        }} />
      </div>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h3>Distribución por Edad</h3>
        <Bar data={{
          labels: edad.map((e: any) => e.edad),
          datasets: [{
            label: 'Estudiantes',
            data: edad.map((e: any) => e.total_estudiantes),
            backgroundColor: '#36A2EB'
          }]
        }} />
      </div>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h3>Promedio por Especialización</h3>
        <Bar data={{
          labels: Array.isArray(especializacion) ? especializacion.map((e: any) => e.especializacion) : [],
          datasets: [{
            label: 'Promedio',
            data: Array.isArray(especializacion) ? especializacion.map((e: any) => e.promedio) : [],
            backgroundColor: '#FF6384'
          }]
        }} />
      </div>
    </div>
  );
}