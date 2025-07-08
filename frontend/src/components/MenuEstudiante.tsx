export default function MenuEstudiante({ onSelect }: { onSelect: (option: string) => void }) {
  return (
    <nav style={{ display: 'flex', gap: 24, background: '#f5f5f5', padding: '16px 32px', borderRadius: 8, marginBottom: 32 }}>
      <button onClick={() => onSelect('dashboard')}>Inicio</button>
      <button onClick={() => onSelect('clases')}>Mis Clases</button>
      <button onClick={() => onSelect('notas')}>Mis Notas</button>
      <button onClick={() => onSelect('estadisticas')}>Estadísticas</button>
      <button onClick={() => onSelect('perfil')}>Perfil</button>
    </nav>
  );
}