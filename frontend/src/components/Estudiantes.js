import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Estudiantes = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [sexo, setSexo] = useState('');
    const [especializacion, setEspecializacion] = useState('');

    useEffect(() => {
        obtenerEstudiantes();
    }, []);

    const obtenerEstudiantes = async () => {
        try {
            const response = await axios.get('/api/estudiantes');
            setEstudiantes(response.data);
        } catch (error) {
            console.error('Error al obtener estudiantes:', error);
        }
    };

    const agregarEstudiante = async (e) => {
        e.preventDefault();
        try {
            const nuevoEstudiante = { nombre, edad, sexo, especializacion };
            await axios.post('/api/estudiantes', nuevoEstudiante);
            obtenerEstudiantes();
            limpiarFormulario();
        } catch (error) {
            console.error('Error al agregar estudiante:', error);
        }
    };

    const limpiarFormulario = () => {
        setNombre('');
        setEdad('');
        setSexo('');
        setEspecializacion('');
    };

    const eliminarEstudiante = async (id) => {
        try {
            await axios.delete(`/api/estudiantes/${id}`);
            obtenerEstudiantes();
        } catch (error) {
            console.error('Error al eliminar estudiante:', error);
        }
    };

    return (
        <div>
            <h2>Gestión de Estudiantes</h2>
            <form onSubmit={agregarEstudiante}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Edad"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    required
                />
                <select value={sexo} onChange={(e) => setSexo(e.target.value)} required>
                    <option value="">Seleccione Sexo</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>
                <input
                    type="text"
                    placeholder="Especialización"
                    value={especializacion}
                    onChange={(e) => setEspecializacion(e.target.value)}
                    required
                />
                <button type="submit">Agregar Estudiante</button>
            </form>
            <ul>
                {estudiantes.map((estudiante) => (
                    <li key={estudiante.id}>
                        {estudiante.nombre} - {estudiante.edad} años - {estudiante.sexo} - {estudiante.especializacion}
                        <button onClick={() => eliminarEstudiante(estudiante.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Estudiantes;