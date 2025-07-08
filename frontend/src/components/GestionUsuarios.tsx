import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [form, setForm] = useState({ usuario: '', contrasena: '', rol: '', matricula: '', especializacion_id: '' });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = () => {
    axios.get('http://localhost:3001/api/usuarios')
      .then(res => setUsuarios(res.data));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      axios.put(`http://localhost:3001/api/usuarios/${editId}`, form)
        .then(() => {
          cargarUsuarios();
          setEditId(null);
          setForm({ usuario: '', contrasena: '', rol: '', matricula: '', especializacion_id: '' });
        });
    } else {
      axios.post('http://localhost:3001/api/usuarios', form)
        .then(() => {
          cargarUsuarios();
          setForm({ usuario: '', contrasena: '', rol: '', matricula: '', especializacion_id: '' });
        });
    }
  };

  const eliminarUsuario = (id: number) => {
    axios.delete(`http://localhost:3001/api/usuarios/${id}`)
      .then(() => cargarUsuarios());
  };

  const editarUsuario = (usuario: any) => {
    setEditId(usuario.id);
    setForm({
      usuario: usuario.usuario,
      contrasena: usuario.contrasena,
      rol: usuario.rol,
      matricula: usuario.matricula || '',
      especializacion_id: usuario.especializacion_id || '',
    });
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <form onSubmit={handleSubmit}>
        <input name="usuario" placeholder="Usuario" value={form.usuario} onChange={handleChange} required />
        <input name="contrasena" type="password" placeholder="Contraseña" value={form.contrasena} onChange={handleChange} required />
        <input name="matricula" placeholder="Matrícula" value={form.matricula} onChange={handleChange} required />
        <input name="especializacion_id" placeholder="Especialización (opcional)" value={form.especializacion_id} onChange={handleChange} />
        <select name="rol" value={form.rol} onChange={handleChange} required>
          <option value="">Rol</option>
          <option value="admin">Administrador</option>
          <option value="profesor">Profesor</option>
          <option value="estudiante">Estudiante</option>
        </select>
        <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ usuario: '', contrasena: '', rol: '', matricula: '', especializacion_id: '' }); }}>Cancelar</button>}
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Usuario</th><th>Matrícula</th><th>Rol</th><th>Especialización</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u: any) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.usuario}</td>
              <td>{u.matricula}</td>
              <td>{u.rol}</td>
              <td>{u.especializacion_id}</td>
              <td>
                <button onClick={() => editarUsuario(u)}>Editar</button>
                <button onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}