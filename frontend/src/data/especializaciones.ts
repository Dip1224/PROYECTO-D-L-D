// Archivo auxiliar para cargar especializaciones desde el backend
import axios from 'axios';

export async function fetchEspecializaciones() {
  const res = await axios.get('http://localhost:3001/api/especializaciones');
  return res.data;
}
