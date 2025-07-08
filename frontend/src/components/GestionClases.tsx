import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GestionClases() {
  const [clases, setClases] = useState<any[]>([]);
  const [form, setForm] = useState({ nombre: '', descripcion: '', fecha_creacion: '' });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    cargarClases();
  }, []);

  const cargarClases = () => {
    axios.get('http://localhost:3001/api/clases')
      .then(res => setClases(res.data));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      axios.put(`http://localhost:3001/api/clases/${editId}`, form)
        .then(() => {
          cargarClases();
          setEditId(null);
          setForm({ nombre: '', descripcion: '', fecha_creacion: '' });
        });
    } else {
      axios.post('http://localhost:3001/api/clases', form)
        .then(() => {
          cargarClases();
          setForm({ nombre: '', descripcion: '', fecha_creacion: '' });
        });
    }
  };

  const eliminarClase = (id: number) => {
    axios.delete(`http://localhost:3001/api/clases/${id}`)
      .then(() => cargarClases());
  };

  const editarClase = (clase: any) => {
    setEditId(clase.id);
    setForm({
      nombre: clase.nombre,
      descripcion: clase.descripcion,
      fecha_creacion: clase.fecha_creacion?.slice(0, 10) || ''
    });
  };

  return (
    <div>
      <h2>Gestión de Clases</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />
        <input name="fecha_creacion" type="date" value={form.fecha_creacion} onChange={handleChange} required />
        <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ nombre: '', descripcion: '', fecha_creacion: '' }); }}>Cancelar</button>}
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Descripción</th><th>Fecha de creación</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clases.map((clase: any) => (
            <tr key={clase.id}>
              <td>{clase.id}</td>
              <td>{clase.nombre}</td>
              <td>{clase.descripcion}</td>
              <td>{clase.fecha_creacion?.slice(0, 10)}</td>
              <td>
                <button onClick={() => editarClase(clase)}>Editar</button>
                <button onClick={() => eliminarClase(clase.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}