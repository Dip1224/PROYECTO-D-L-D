import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Graficos from './Graficos';

const Dashboard = () => {
    const [estadisticas, setEstadisticas] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/estadisticas');
                setEstadisticas(response.data);
            } catch (error) {
                console.error('Error al obtener las estadísticas:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard">
            <h1>Dashboard de Gestión Universitaria</h1>
            {estadisticas ? (
                <div>
                    <h2>Estadísticas Generales</h2>
                    <p>Total de Estudiantes: {estadisticas.totalEstudiantes}</p>
                    <p>Promedio de Edad: {estadisticas.promedioEdad}</p>
                    <p>Total de Clases: {estadisticas.totalClases}</p>
                    <Graficos data={estadisticas.graficos} />
                </div>
            ) : (
                <p>Cargando estadísticas...</p>
            )}
        </div>
    );
};

export default Dashboard;