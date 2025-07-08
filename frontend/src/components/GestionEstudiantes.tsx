import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchEspecializaciones } from '../data/especializaciones';

export default function GestionEstudiantes() {
  const [estudiantes, setEstudiantes] = useState<any[]>([]);
  const [especializaciones, setEspecializaciones] = useState<any[]>([]);
  const [form, setForm] = useState({ nombre: '', edad: '', sexo: '', especializacion_id: '' });
  const [editId, setEditId] = useState<number | null>(null);

  // Cargar estudiantes

  useEffect(() => {
    cargarEstudiantes();
    fetchEspecializaciones().then(setEspecializaciones);
  }, []);

  const cargarEstudiantes = () => {
    axios.get('http://localhost:3001/api/estudiantes')
      .then(res => setEstudiantes(res.data));
  };

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Agregar o editar estudiante
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      axios.put(`http://localhost:3001/api/estudiantes/${editId}`, form)
        .then(() => {
          cargarEstudiantes();
          setEditId(null);
          setForm({ nombre: '', edad: '', sexo: '', especializacion_id: '' });
        });
    } else {
      axios.post('http://localhost:3001/api/estudiantes', form)
        .then(() => {
          cargarEstudiantes();
          setForm({ nombre: '', edad: '', sexo: '', especializacion_id: '' });
        });
    }
  };

  // Eliminar estudiante
  const eliminarEstudiante = (id: number) => {
    axios.delete(`http://localhost:3001/api/estudiantes/${id}`)
      .then(() => cargarEstudiantes());
  };

  // Editar estudiante (cargar datos en el formulario)
  const editarEstudiante = (est: any) => {
    setEditId(est.id);
    setForm({
      nombre: est.nombre,
      edad: est.edad,
      sexo: est.sexo,
      especializacion_id: est.especializacion?.id || ''
    });
  };

  return (
    <div>
      <h2>Gestión de Estudiantes</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="edad" type="number" placeholder="Edad" value={form.edad} onChange={handleChange} required />
        <select name="sexo" value={form.sexo} onChange={handleChange} required>
          <option value="">Sexo</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
        <select name="especializacion_id" value={form.especializacion_id} onChange={handleChange} required>
          <option value="">Especialización</option>
          {especializaciones.map((esp) => (
            <option key={esp.id} value={esp.id}>{esp.nombre}</option>
          ))}
        </select>
        <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ nombre: '', edad: '', sexo: '', especializacion_id: '' }); }}>Cancelar</button>}
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Edad</th><th>Sexo</th><th>Especialización</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((est: any) => (
            <tr key={est.id}>
              <td>{est.id}</td>
              <td>{est.nombre}</td>
              <td>{est.edad}</td>
              <td>{est.sexo}</td>
              <td>{est.especializacion?.nombre || ''}</td>
              <td>
                <button onClick={() => editarEstudiante(est)}>Editar</button>
                <button onClick={() => eliminarEstudiante(est.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}