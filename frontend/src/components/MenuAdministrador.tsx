export default function MenuAdministrador({ onSelect }: { onSelect: (option: string) => void }) {
  return (
    <nav style={{ padding: 24 }}>
      <h2>Menú Administrador</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>
          <button onClick={() => onSelect('inicio')}>
            Inicio
          </button>
        </li>
        <li>
          <button onClick={() => onSelect('gestionar-estudiantes')}>
            Gestionar Estudiantes
          </button>
        </li>
        <li>
          <button onClick={() => onSelect('gestionar-clases')}>
            Gestionar Clases
          </button>
        </li>
        {/* Agrega más opciones si lo necesitas */}
      </ul>
    </nav>
  );
}