import React, { useState } from 'react';
import axios from 'axios';

const UsuarioForm = () => {
  const [form, setForm] = useState({
    usuario: '',
    rol: '',
    contrasena: '',
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let estudiante_id = null;
      if (form.rol === 'estudiante') {
        // Aquí deberías asignar el id correspondiente si aplica
        // estudiante_id = ...;
      }
      await axios.post('/api/usuarios', {
        usuario: form.usuario,
        contrasena: form.contrasena,
        rol: form.rol,
        estudiante_id: estudiante_id
      });
      setMensaje('Usuario agregado correctamente');
      setForm({
        usuario: '',
        rol: '',
        contrasena: '',
      });
    } catch (error) {
      setMensaje('Error al agregar usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usuario">Usuario</label>
        <input
          type="text"
          id="usuario"
          name="usuario"
          value={form.usuario}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="rol">Rol</label>
        <select
          name="rol"
          value={form.rol}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un rol</option>
          <option value="estudiante">Estudiante</option>
          <option value="docente">Docente</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div>
        <label htmlFor="contrasena">Contraseña</label>
        <input
          type="password"
          id="contrasena"
          name="contrasena"
          value={form.contrasena}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Agregar Usuario</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
};

export default UsuarioForm;