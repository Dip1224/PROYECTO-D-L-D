import React, { useState } from 'react';
import axios from 'axios';

interface PerfilFormProps {
  datos: {
    matricula: string;
    nombre: string;
    edad: number;
    sexo: string;
    especializacion_id: number;
  };
  onClose: () => void;
  onUpdate: (nuevoPerfil: any) => void;
}

const PerfilForm: React.FC<PerfilFormProps> = ({ datos, onClose, onUpdate }) => {
  const [form, setForm] = useState({ ...datos });
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');
    // Validación simple frontend
    if (!form.nombre || !form.edad || !form.sexo || !form.especializacion_id) {
      setMensaje('Todos los campos son obligatorios');
      setLoading(false);
      return;
    }
    const payload = {
      nombre: form.nombre,
      edad: form.edad,
      sexo: form.sexo,
      especializacion_id: form.especializacion_id
    };
    try {
      await axios.put(`/api/estudiantes/${form.matricula}`, payload);
      setMensaje('Perfil actualizado correctamente');
      onUpdate({ ...form });
      setTimeout(() => {
        setMensaje('');
        onClose();
      }, 1000);
    } catch (error: any) {
      setMensaje(error?.response?.data?.error || 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'rgba(255,255,255,0.98)',
        borderRadius: 18,
        boxShadow: '0 4px 32px #0093cc22',
        padding: 24,
        minWidth: 260,
        maxWidth: 320,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        animation: 'fadeIn 0.5s',
      }}
    >
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0093cc', marginBottom: 8, textAlign: 'center', letterSpacing: 1 }}>Editar Perfil</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontWeight: 600, color: '#222' }}>Nombre</label>
        <input name="nombre" value={form.nombre} onChange={handleChange} style={{ border: '1.5px solid #e0e7ef', borderRadius: 8, padding: '10px 12px', fontSize: 16, outline: 'none', transition: 'border 0.2s' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontWeight: 600, color: '#222' }}>Edad</label>
        <input name="edad" type="number" value={form.edad} onChange={handleChange} style={{ border: '1.5px solid #e0e7ef', borderRadius: 8, padding: '10px 12px', fontSize: 16, outline: 'none', transition: 'border 0.2s' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontWeight: 600, color: '#222' }}>Sexo</label>
        <select name="sexo" value={form.sexo} onChange={handleChange} style={{ border: '1.5px solid #e0e7ef', borderRadius: 8, padding: '10px 12px', fontSize: 16, outline: 'none', transition: 'border 0.2s', background: '#f7fafc' }}>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontWeight: 600, color: '#222' }}>Especialización ID</label>
        <input name="especializacion_id" type="number" value={form.especializacion_id} onChange={handleChange} style={{ border: '1.5px solid #e0e7ef', borderRadius: 8, padding: '10px 12px', fontSize: 16, outline: 'none', transition: 'border 0.2s' }} />
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <button type="submit" style={{ background: '#0093cc', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 16, boxShadow: '0 2px 8px #0093cc22', cursor: 'pointer', flex: 1, transition: 'background 0.2s' }} disabled={loading}>
          Guardar
        </button>
        <button type="button" style={{ background: '#e0e7ef', color: '#222', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer', flex: 1, transition: 'background 0.2s' }} onClick={() => { setMensaje(''); onClose(); }}>
          Cancelar
        </button>
      </div>
      {mensaje && <div style={{ marginTop: 8, color: mensaje.includes('correctamente') ? '#009c3b' : '#e63946', fontWeight: 600, textAlign: 'center' }}>{mensaje}</div>}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </form>
  );
};

export default PerfilForm;
