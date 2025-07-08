'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Clase = {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
  especializacion_id?: number;
};

export default function ClasesProfesor({ profesorId }: { profesorId: string | number }) {
  const id = String(profesorId);
  const [clases, setClases] = useState<Clase[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState(false);
  const [editClase, setEditClase] = useState<Clase | null>(null);
  const [form, setForm] = useState({ nombre: '', descripcion: '', especializacion_id: '' });
  const [especializaciones, setEspecializaciones] = useState<{ id: number, nombre: string }[]>([]);
  // Cargar especializaciones al montar el componente
  useEffect(() => {
    axios.get('http://localhost:3001/api/especializaciones')
      .then(res => setEspecializaciones(res.data))
      .catch(() => setEspecializaciones([]));
  }, []);

  const fetchClases = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3001/api/profesores/${id}/clases`);
      const data = await res.json();
      const clasesArray = Array.isArray(data) ? data : [data];
      setClases(clasesArray);
    } catch (err) {
      setError('Hubo un problema al cargar las clases.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddClase = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:3001/api/clases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, profesor_matricula: id, especializacion_id: Number(form.especializacion_id) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'No se pudo agregar la clase.');
        console.error('Error al agregar clase:', data);
        return;
      }
      setShowForm(false);
      setForm({ nombre: '', descripcion: '', especializacion_id: '' });
      await fetchClases();
    } catch (err) {
      setError('No se pudo agregar la clase.');
      console.error('Error al agregar clase:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (claseId: number) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta clase?')) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3001/api/clases/${claseId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'No se pudo eliminar la clase.');
        console.error('Error al eliminar clase:', data);
        return;
      }
      await fetchClases();
    } catch (err) {
      setError('No se pudo eliminar la clase.');
      console.error('Error al eliminar clase:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (clase: Clase) => {
    setEditClase(clase);
    setForm({ nombre: clase.nombre, descripcion: clase.descripcion, especializacion_id: clase.especializacion_id ? String(clase.especializacion_id) : '' });
    setShowForm(true);
  };

  const handleUpdateClase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editClase) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3001/api/clases/${editClase.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, especializacion_id: Number(form.especializacion_id) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'No se pudo actualizar la clase.');
        console.error('Error al actualizar clase:', data);
        return;
      }
      setEditClase(null);
      setShowForm(false);
      setForm({ nombre: '', descripcion: '', especializacion_id: '' });
      await fetchClases();
    } catch (err) {
      setError('No se pudo actualizar la clase.');
      console.error('Error al actualizar clase:', err);
    } finally {
      setLoading(false);
    }
  };


  // Muestra un mensaje de carga mientras las clases se obtienen
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0, marginRight: 16 }}>Mis Clases</h2>
        <button
          onClick={() => { setShowForm(true); setEditClase(null); }}
          style={{
            background: '#0093cc', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, fontSize: 24, cursor: 'pointer', marginRight: 8
          }}
          title="Agregar clase"
        >+
        </button>
      </div>

      {showForm && (
        <form onSubmit={editClase ? handleUpdateClase : handleAddClase} style={{ marginBottom: 24, background: '#f4f4f4', padding: 16, borderRadius: 8 }}>
          <input
            name="nombre"
            placeholder="Nombre de la clase"
            value={form.nombre}
            onChange={handleInputChange}
            required
            style={{ marginRight: 8, padding: 4 }}
          />
          <input
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleInputChange}
            required
            style={{ marginRight: 8, padding: 4 }}
          />
          <select
            name="especializacion_id"
            value={form.especializacion_id}
            onChange={handleInputChange}
            required
            style={{ marginRight: 8, padding: 4 }}
          >
            <option value="">Selecciona especialización</option>
            {especializaciones.map((esp) => (
              <option key={esp.id} value={esp.id}>{esp.nombre}</option>
            ))}
          </select>
          <button type="submit" style={{ background: '#0093cc', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', marginRight: 8 }}>
            {editClase ? 'Actualizar' : 'Agregar'}
          </button>
          <button type="button" onClick={() => { setShowForm(false); setEditClase(null); setForm({ nombre: '', descripcion: '', especializacion_id: '' }); }} style={{ background: '#ccc', border: 'none', borderRadius: 4, padding: '4px 12px' }}>Cancelar</button>
        </form>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {clases.map((c) => (
          <div
            key={c.id}
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 24,
              minWidth: 220,
              boxShadow: '0 2px 8px #0093cc22',
              marginBottom: 16,
              textDecoration: 'none',
              color: '#181c2f',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s',
              display: 'block',
              position: 'relative',
            }}
          >
            <h3 style={{ margin: 0 }}>{c.nombre}</h3>
            <div style={{ color: '#0093cc', fontWeight: 500, marginTop: 8 }}>
              Fecha de creación: {new Date(c.fecha_creacion).toLocaleDateString()}
            </div>
            <p style={{ color: '#757575', marginTop: 4 }}>{c.descripcion}</p>
            <button
              onClick={() => handleEdit(c)}
              style={{ position: 'absolute', top: 8, right: 40, background: 'none', border: 'none', color: '#0093cc', fontSize: 18, cursor: 'pointer' }}
              title="Editar clase"
            >✎</button>
            <button
              onClick={() => handleDelete(c.id)}
              style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', color: '#e74c3c', fontSize: 18, cursor: 'pointer' }}
              title="Eliminar clase"
            >−</button>
          </div>
        ))}
      </div>
      {!clases.length && <div>No tienes clases asignadas.</div>}
    </div>
  );
}
