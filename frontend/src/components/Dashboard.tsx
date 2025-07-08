'use client';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useState, useRef } from 'react';
import PerfilForm from './PerfilForm';
import NotasEstudiante from './NotasEstudiante';
import ClasesEstudiante from './ClasesEstudiante';
import EstadisticasEstudiante from './EstadisticasEstudiante';
import MenuEstudiante from './MenuEstudiante';
import MenuAdministrador from './MenuAdministrador';
import GestionEstudiantes from './GestionEstudiantes';
import GestionClases from './GestionClases';
import GestionUsuarios from './GestionUsuarios';
import GestionInscripciones from './GestionInscripciones';
import EstadisticasGlobales from './EstadisticasGlobales';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import ClasesProfesor from './ClasesProfesor';
Chart.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const [selected, setSelected] = useState(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('role');
      if (role === 'estudiante' || role === 'profesor') {
        return 'clases';
      }
    }
    return 'inicio';
  });
  const [isClient, setIsClient] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [userProfile, setUserProfile] = useState<{
    nombre: string;
    matricula: string;
    correo: string;
    rol: string;
    especializacion: string;
    especializacion_id?: number;
    sexo: string;
    edad: string | number;
    materias: string[];
    horasServicio: number;
    horasMeta: number;
  }>({
    nombre: '',
    matricula: '',
    correo: '',
    rol: '',
    especializacion: '',
    especializacion_id: 1,
    sexo: '',
    edad: '',
    materias: [],
    horasServicio: 0,
    horasMeta: 100,
  });
  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    }
    if (profileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileMenuOpen]);

  useEffect(() => {
    if (showProfile && typeof window !== 'undefined') {
      setUserProfile({
        nombre: localStorage.getItem('nombre') || 'Usuario',
        matricula: localStorage.getItem('matricula') || '',
        correo: localStorage.getItem('correo') || '',
        rol: localStorage.getItem('role') || '',
        especializacion: localStorage.getItem('especializacion') || '',
        sexo: localStorage.getItem('sexo') || '',
        edad: localStorage.getItem('edad') || '',
        materias: (localStorage.getItem('materias') || '').split(',').filter(Boolean),
        horasServicio: Number(localStorage.getItem('horasServicio') || 0),
        horasMeta: 100,
      });
    }
  }, [showProfile]);

  if (!isClient) return null;

  // Leer datos reales del usuario desde localStorage
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;
  const nombre = typeof window !== 'undefined' ? localStorage.getItem('nombre') : 'Usuario';
  // Usar la matrícula guardada en el login
  const estudianteId = typeof window !== 'undefined' ? localStorage.getItem('matricula') || '' : '';

  // Opciones de menú según el rolff
  // Estado para el menú hamburguesa
  const menu = [
    ...(role === 'admin'
      ? [
          { key: 'estudiantes', label: 'Gestionar Estudiantes' },
          { key: 'clases', label: 'Gestionar Clases' },
          { key: 'inscripciones', label: 'Gestionar Inscripciones' },
          { key: 'usuarios', label: 'Gestionar Usuarios' },
          { key: 'estadisticas', label: 'Estadísticas Globales' },
        ]
      : []),
    ...(role === 'estudiante'
      ? [
          { key: 'notas', label: 'Mis Notas' },
          { key: 'clases', label: 'Mis Clases' },
          { key: 'estadisticas', label: 'Mis Estadísticas' },
          // { key: 'perfil', label: 'Perfil' }, // Eliminado
        ]
      : []),
    ...(role === 'profesor'
      ? [
          { key: 'clases', label: 'Mis Clases' },
          // Puedes agregar más opciones para profesor aquí
        ]
      : []),
  ];

  // Función para cerrar sesión
  function handleLogout() {
    localStorage.clear();
    window.location.href = '/';
  }

  // Paleta de colores según el tema
  const colors = theme === 'dark'
    ? {
        background: '#101426',
        card: '#181c2f',
        text: '#fff',
        nav: '#181c2f',
        navActive: '#0093cc',
      }
    : {
        background: '#f7fafc',
        card: '#fff',
        text: '#181c2f',
        nav: '#e6f3fa',
        navActive: '#0093cc',
      };

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.background,
      display: 'flex',
      color: colors.text,
      transition: 'background 0.3s, color 0.3s',
      position: 'relative',
      flexDirection: 'column',
    }}>
      {/* Barra superior */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: 64,
        background: colors.card,
        boxShadow: '0 2px 12px #0093cc11',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        zIndex: 110,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Botón hamburguesa en la barra superior */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 8,
              padding: 0,
            }}
            aria-label="Abrir menú"
          >
            <span style={{
              width: 30,
              height: 4,
              background: colors.text,
              borderRadius: 2,
              marginBottom: 5,
              transition: '0.3s',
              transform: menuOpen ? 'rotate(45deg) translateY(10px)' : 'none',
            }} />
            <span style={{
              width: 30,
              height: 4,
              background: colors.text,
              borderRadius: 2,
              marginBottom: 5,
              opacity: menuOpen ? 0 : 1,
              transition: '0.3s',
            }} />
            <span style={{
              width: 30,
              height: 4,
              background: colors.text,
              borderRadius: 2,
              transition: '0.3s',
              transform: menuOpen ? 'rotate(-45deg) translateY(-10px)' : 'none',
            }} />
          </button>
          {/* Logo universidad con fondo rectangular */}
          <div style={{
            width: 72,
            height: 56,
            background: '#fff',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 8px #0093cc22',
            padding: 4,
          }}>
            <img src="/logo-universidad.png" alt="Logo Universidad" style={{ width: 64, height: 52, objectFit: 'contain', borderRadius: 10 }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 24, color: colors.text }}>
            Plataforma Universitaria
          </div>
        </div>
        {/* Botón perfil esquina superior derecha (ya está aquí) */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: colors.card,
              border: '2px solid #0093cc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px #0093cc22',
              cursor: 'pointer',
              padding: 0,
            }}
            aria-label="Perfil"
          >
            <span style={{ fontSize: 22, color: colors.text }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0093cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20c0-2.2 3.6-4 6-4s6 1.8 6 4"/></svg>
            </span>
          </button>
          {profileMenuOpen && (
            <div ref={profileMenuRef} style={{
              position: 'absolute',
              top: 54,
              right: 0,
              background: colors.card,
              borderRadius: 12,
              boxShadow: '0 2px 16px #0093cc22',
              minWidth: 180,
              padding: '12px 0',
              zIndex: 102,
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
            }}>
            <button style={{...menuItemStyle, color: colors.text}} onClick={() => setShowProfile(true)}>Ver perfil</button>
            <button style={{...menuItemStyle, color: colors.text}} onClick={() => alert('Cambiar idioma (no implementado)')}>Idioma</button>
            <button style={{...menuItemStyle, color: colors.text}} onClick={() => alert('Calendario (no implementado)')}>Calendario</button>
            <button style={{...menuItemStyle, color: colors.text, borderBottom: 'none'}} onClick={toggleTheme}>Cambiar tema</button>
          </div>
          )}
        </div>
      </header>
      {/* Espacio para la barra superior */}
      <div style={{ height: 64 }} />

      {/* Botón hamburguesa */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          position: 'fixed',
          top: 24,
          left: 24,
          zIndex: 100,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          width: 40,
          height: 40,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        aria-label="Abrir menú"
      >
        <span style={{
          width: 30,
          height: 4,
          background: colors.text,
          borderRadius: 2,
          marginBottom: 5,
          transition: '0.3s',
          transform: menuOpen ? 'rotate(45deg) translateY(10px)' : 'none',
        }} />
        <span style={{
          width: 30,
          height: 4,
          background: colors.text,
          borderRadius: 2,
          marginBottom: 5,
          opacity: menuOpen ? 0 : 1,
          transition: '0.3s',
        }} />
        <span style={{
          width: 30,
          height: 4,
          background: colors.text,
          borderRadius: 2,
          transition: '0.3s',
          transform: menuOpen ? 'rotate(-45deg) translateY(-10px)' : 'none',
        }} />
      </button>

      {/* Panel de navegación lateral animado */}
      <nav style={{
        width: 220,
        background: colors.nav,
        padding: '32px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        boxShadow: '2px 0 12px 0 #0093cc11',
        minHeight: '100vh',
        position: 'fixed',
        top: 0,
        left: menuOpen ? 0 : -220,
        zIndex: 99,
        transition: 'left 0.3s',
      }}>
        <div style={{ fontWeight: 700, fontSize: 22, textAlign: 'center', marginBottom: 32 }}>
          Menú
        </div>
        {menu.map(item => (
          <motion.button
            key={item.key}
            onClick={() => { setSelected(item.key); setMenuOpen(false); }}
            whileHover={{ scale: 1.08, backgroundColor: "#00bfff", color: "#fff" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              background: selected === item.key ? colors.navActive : 'transparent',
              color: selected === item.key ? '#fff' : colors.text,
              border: 'none',
              borderRadius: 8,
              padding: '12px 24px',
              margin: '0 16px',
              fontWeight: 500,
              fontSize: 17,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            {item.label}
          </motion.button>
        ))}
        {/* Botón cerrar sesión al fondo */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: 'auto',
            background: '#ff4d4f',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 24px',
            marginLeft: 16,
            marginRight: 16,
            marginBottom: 16,
            fontWeight: 600,
            fontSize: 17,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #ff4d4f22',
            transition: 'background 0.2s',
          }}
        >
          Cerrar sesión
        </button>
      </nav>

      {/* Contenido principal desplazable */}
      <main style={{
        flex: 1,
        padding: '48px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        marginLeft: menuOpen ? 220 : 0,
        transition: 'margin-left 0.3s',
        width: '100%',
      }}>
        {/* Bienvenida solo en 'Mis Clases' para estudiante o profesor */}
        <motion.div
          key={selected === 'clases' && (role === 'estudiante' || role === 'profesor') ? 'bienvenida' : 'no-bienvenida'}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: selected === 'clases' && (role === 'estudiante' || role === 'profesor') ? 1 : 0, y: selected === 'clases' && (role === 'estudiante' || role === 'profesor') ? 0 : -20 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          style={{
            pointerEvents: selected === 'clases' && (role === 'estudiante' || role === 'profesor') ? 'auto' : 'none',
            height: selected === 'clases' && (role === 'estudiante' || role === 'profesor') ? 'auto' : 0,
            overflow: 'hidden',
            marginBottom: selected === 'clases' && (role === 'estudiante' || role === 'profesor') ? 24 : 0,
            display: selected === 'clases' && (role === 'estudiante' || role === 'profesor') ? 'block' : 'none',
          }}
        >
          <div style={{
            background: colors.card,
            borderRadius: 16,
            padding: '20px 20px',
            boxShadow: '0 2px 16px 0 #0093cc22',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 4,
            maxWidth: 420,
          }}>
            <h2 style={{ margin: 0, fontSize: 24 }}>
              {`👋 ¡Hola, ${nombre}!`}
            </h2>
            <div style={{ fontSize: 16, marginTop: 4, color: colors.text, fontWeight: 500 }}>
              {role === 'profesor'
                ? 'Bienvenido a tu panel docente. Aquí puedes ver y gestionar tus clases.'
                : 'Bienvenido a tu panel. Usa el menú para comenzar.'}
            </div>
          </div>
        </motion.div>

        {/* Renderizar el contenido según la opción seleccionada */}
        <section style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: 300 }}>
          <motion.div
            key={selected}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            {selected === 'notas' && estudianteId && <NotasEstudiante estudianteId={estudianteId} />}
            {selected === 'clases' && role === 'admin' && <GestionClases />}
            {selected === 'clases' && role === 'estudiante' && estudianteId && <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}><ClasesEstudiante estudianteId={estudianteId} /></div>}
            {selected === 'clases' && role === 'profesor' && estudianteId && <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}><ClasesProfesor profesorId={estudianteId} /></div>}
            {selected === 'estadisticas' && role === 'admin' && <EstadisticasGlobales />}
            {selected === 'estadisticas' && <EstadisticasEstudiante />}
            {/* Eliminadas opciones antiguas para estudiante */}
            {selected === 'config' && <div>Configuración administrativa</div>}
            {selected === 'inicio' && <div>Selecciona una opción del menú para ver información.</div>}
            {role === 'admin' && selected === 'estudiantes' && <GestionEstudiantes />}
            {role === 'admin' && selected === 'usuarios' && <GestionUsuarios />}
            {selected === 'inscripciones' && role === 'admin' && <GestionInscripciones />}
          </motion.div>
        </section>
      </main>

      {/* Modal de perfil animado, grande y alineado a la derecha */}
      {showProfile && (
        <>
          {/* Fondo difuminado */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.25)',
            backdropFilter: 'blur(4px)',
            zIndex: 199,
          }} />
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '480px',
              maxWidth: '98vw',
              height: '100vh',
              background: colors.card,
              boxShadow: '-8px 0 32px #0093cc33',
              zIndex: 200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '56px 32px 32px 32px',
              borderTopLeftRadius: 32,
              borderBottomLeftRadius: 32,
              overflowY: 'auto',
            }}
          >
            <button onClick={() => setShowProfile(false)} style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', fontSize: 28, color: '#888', cursor: 'pointer' }}>&times;</button>
            <div style={{ width: 180, height: 180, background: '#fff', borderRadius: 36, boxShadow: '0 2px 12px #0093cc22', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
              <img src="/logo-universidad.png" alt="Perfil" style={{ width: 150, height: 150, objectFit: 'contain', borderRadius: 24 }} />
            </div>
            <h2 style={{ margin: 0, fontSize: 36, color: colors.text, textAlign: 'center' }}>{userProfile.nombre}</h2>
            <div style={{ color: '#0093cc', fontWeight: 700, marginBottom: 18, fontSize: 22 }}>{userProfile.rol === 'estudiante' ? 'Estudiante' : userProfile.rol}</div>
            <div style={{ width: '100%', maxWidth: 340, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 8 }}>
              {editProfile && userProfile.rol === 'estudiante' ? (
                <PerfilForm
                  datos={{
                    matricula: userProfile.matricula,
                    nombre: userProfile.nombre,
                    edad: Number(userProfile.edad),
                    sexo: userProfile.sexo,
                    especializacion_id: userProfile.especializacion_id || 1,
                  }}
                  onClose={() => setEditProfile(false)}
                  onUpdate={(nuevoPerfil) => {
                    setUserProfile((prev) => ({
                      ...prev,
                      ...nuevoPerfil,
                      edad: String(nuevoPerfil.edad),
                    }));
                    // Actualiza localStorage para reflejar los cambios
                    localStorage.setItem('nombre', nuevoPerfil.nombre);
                    localStorage.setItem('edad', String(nuevoPerfil.edad));
                    localStorage.setItem('sexo', nuevoPerfil.sexo);
                    localStorage.setItem('especializacion_id', String(nuevoPerfil.especializacion_id));
                    setEditProfile(false); // Cierra el modal tras actualizar
                  }}
                />
              ) : (
                <>
                  {userProfile.rol === 'estudiante' && (
                    <>
                      <div style={{ color: colors.text, fontSize: 17 }}><b>Sexo:</b> {userProfile.sexo || <span style={{color:'#bbb'}}>No disponible</span>}</div>
                      <div style={{ color: colors.text, fontSize: 17 }}><b>Edad:</b> {userProfile.edad || <span style={{color:'#bbb'}}>No disponible</span>}</div>
                      <div style={{ color: colors.text, fontSize: 17 }}><b>Matrícula:</b> {userProfile.matricula || <span style={{color:'#bbb'}}>No disponible</span>}</div>
                      <div style={{ color: colors.text, fontSize: 17 }}><b>Especialización:</b> {userProfile.especializacion || <span style={{color:'#bbb'}}>No disponible</span>}</div>
                      <div style={{ color: colors.text, fontSize: 17 }}><b>Correo:</b> {userProfile.correo || <span style={{color:'#bbb'}}>No disponible</span>}</div>
                      <div style={{ color: colors.text, fontSize: 17 }}><b>Materias inscritas:</b> {userProfile.materias.length > 0 ? userProfile.materias.join(', ') : <span style={{color:'#bbb'}}>No disponible</span>}</div>
                      <button onClick={() => setEditProfile(true)} style={{marginTop: 12, background: '#0093cc', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer'}}>Editar perfil</button>
                    </>
                  )}
                  {userProfile.rol === 'profesor' && (
                    <>
                      <div style={{ color: colors.text, fontSize: 17 }}><b>Nombre:</b> {userProfile.nombre || <span style={{color:'#bbb'}}>No disponible</span>}</div>
                      <div style={{ color: colors.text, fontSize: 17 }}><b>Matrícula:</b> {userProfile.matricula || <span style={{color:'#bbb'}}>No disponible</span>}</div>
                      <div style={{ color: colors.text, fontSize: 17 }}><b>Usuario:</b> {userProfile.correo || <span style={{color:'#bbb'}}>No disponible</span>}</div>
                      <div style={{ color: colors.text, fontSize: 17 }}><b>Rol:</b> Profesor</div>
                    </>
                  )}
                  {userProfile.rol === 'admin' && (
                    <>
                      <div style={{ color: colors.text, fontSize: 17 }}><b>Nombre:</b> {userProfile.nombre || <span style={{color:'#bbb'}}>No disponible</span>}</div>
                      <div style={{ color: colors.text, fontSize: 17 }}><b>Usuario:</b> {userProfile.correo || <span style={{color:'#bbb'}}>No disponible</span>}</div>
                      <div style={{ color: colors.text, fontSize: 17 }}><b>Rol:</b> Administrador</div>
                    </>
                  )}
                </>
              )}
            </div>
            {/* Espaciador más grande para separar los datos del gráfico */}
            <div style={{ height: 64 }} />
            {/* Gráfico circular de horas de servicio al final del modal */}
            <div style={{ width: 180, margin: '48px auto 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontWeight: 600, color: colors.text, marginBottom: 8 }}>Horas de servicio social</div>
              <Doughnut
                data={{
                  labels: ['Completadas', 'Restantes'],
                  datasets: [{
                    data: [userProfile.horasServicio, Math.max(0, userProfile.horasMeta - userProfile.horasServicio)],
                    backgroundColor: ['#0093cc', '#e6f3fa'],
                    borderWidth: 2,
                  }],
                }}
                options={{
                  cutout: '70%',
                  plugins: {
                    legend: { display: false },
                  },
                  animation: { animateRotate: true, animateScale: true },
                }}
                style={{ maxWidth: 160, maxHeight: 160 }}
              />
              <div style={{ position: 'absolute', marginTop: -110, fontSize: 28, fontWeight: 700, color: '#0093cc', width: 180, textAlign: 'center', pointerEvents: 'none' }}>
                {userProfile.horasServicio} / {userProfile.horasMeta}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

const menuItemStyle = {
  background: 'none',
  border: 'none',
  color: '#181c2f', // color base para modo claro
  fontSize: 16,
  padding: '12px 24px',
  textAlign: 'left' as const,
  cursor: 'pointer',
  borderBottom: '1px solid #eee',
  outline: 'none',
  width: '100%',
  transition: 'background 0.2s, color 0.2s',
};

// En EstadisticasEstudiante.tsx, agregar gráficos interactivos de notas, promedios y edad para el estudiante.