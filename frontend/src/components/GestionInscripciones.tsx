import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GestionInscripciones() {
  const [inscripciones, setInscripciones] = useState<any[]>([]);
  const [estudiantes, setEstudiantes] = useState<any[]>([]);
  const [clases, setClases] = useState<any[]>([]);
  const [form, setForm] = useState({ estudiante_id: '', clase_id: '', nota: '' });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    cargarInscripciones();
    cargarEstudiantes();
    cargarClases();
  }, []);

  const cargarInscripciones = () => {
    axios.get('http://localhost:3001/api/inscripciones')
      .then(res => setInscripciones(res.data));
  };

  const cargarEstudiantes = () => {
    axios.get('http://localhost:3001/api/estudiantes')
      .then(res => setEstudiantes(res.data));
  };

  const cargarClases = () => {
    axios.get('http://localhost:3001/api/clases')
      .then(res => setClases(res.data));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      axios.put(`http://localhost:3001/api/inscripciones/${editId}`, { nota: form.nota })
        .then(() => {
          cargarInscripciones();
          setEditId(null);
          setForm({ estudiante_id: '', clase_id: '', nota: '' });
        });
    } else {
      axios.post('http://localhost:3001/api/inscripciones', form)
        .then(() => {
          cargarInscripciones();
          setForm({ estudiante_id: '', clase_id: '', nota: '' });
        });
    }
  };

  const eliminarInscripcion = (id: number) => {
    axios.delete(`http://localhost:3001/api/inscripciones/${id}`)
      .then(() => cargarInscripciones());
  };

  const editarInscripcion = (insc: any) => {
    setEditId(insc.id);
    setForm({
      estudiante_id: insc.estudiante_id,
      clase_id: insc.clase_id,
      nota: insc.nota
    });
  };

  return (
    <div>
      <h2>Gestión de Inscripciones</h2>
      <form onSubmit={handleSubmit}>
        {!editId && (
          <>
            <select name="estudiante_id" value={form.estudiante_id} onChange={handleChange} required>
              <option value="">Selecciona estudiante</option>
              {estudiantes.map((e: any) => (
                <option key={e.matricula || e.id} value={e.matricula || e.id}>{e.nombre}</option>
              ))}
            </select>
            <select name="clase_id" value={form.clase_id} onChange={handleChange} required>
              <option value="">Selecciona clase</option>
              {clases.map((c: any) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </>
        )}
        <input name="nota" type="number" placeholder="Nota" value={form.nota} onChange={handleChange} required />
        <button type="submit">{editId ? 'Actualizar Nota' : 'Agregar Inscripción'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ estudiante_id: '', clase_id: '', nota: '' }); }}>Cancelar</button>}
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Estudiante</th><th>Clase</th><th>Nota</th><th>Fecha</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inscripciones.map((i: any) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.estudiante}</td>
              <td>{i.clase}</td>
              <td>{i.nota}</td>
              <td>{i.fecha_inscripcion?.slice(0, 10)}</td>
              <td>
                <button onClick={() => editarInscripcion(i)}>Editar Nota</button>
                <button onClick={() => eliminarInscripcion(i.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}