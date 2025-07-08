'use client';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  // Paleta de colores según el tema
  const colors = theme === 'dark'
    ? {
        background: 'linear-gradient(120deg, #101426 60%, #0093cc 100%)',
        card: '#181c2f',
        text: '#fff',
        inputBg: '#23273a',
        inputBorder: '#0093cc',
        button: 'linear-gradient(90deg, #0093cc 60%, #f7d774 100%)',
        buttonText: '#181c2f',
        link: '#4bc5e6',
      }
    : {
        background: 'linear-gradient(120deg, #f7fafc 60%, #b2e6ff 100%)',
        card: '#fff',
        text: '#181c2f',
        inputBg: '#f7fafc',
        inputBorder: '#0093cc',
        button: 'linear-gradient(90deg, #0093cc 60%, #f7d774 100%)',
        buttonText: '#181c2f',
        link: '#0093cc',
      };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: user, contrasena: pass }),
      });

      if (!res.ok) {
        // Error de autenticación
        alert('Usuario o contraseña incorrectos');
        return;
      }

      const data = await res.json();
      localStorage.setItem('role', data.rol);
      localStorage.setItem('matricula', data.matricula);
      if (data.nombre) {
        localStorage.setItem('nombre', data.nombre);
      }
      if (data.sexo) {
        localStorage.setItem('sexo', data.sexo);
      }
      if (data.edad) {
        localStorage.setItem('edad', data.edad);
      }
      if (data.especializacion) {
        localStorage.setItem('especializacion', data.especializacion);
      }
      if (data.correo) {
        localStorage.setItem('correo', data.correo);
      }
      if (data.materias) {
        localStorage.setItem('materias', Array.isArray(data.materias) ? data.materias.join(',') : data.materias);
      }
      // Redirige según el rol
      if (data.rol === 'profesor') {
        window.location.href = '/dashboard';
      } else if (data.rol === 'admin') {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.background,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4vw 2vw',
      transition: 'background 0.3s',
    }}>
      {/* Flechita para volver */}
      <button
        onClick={() => router.back()}
        style={{
          position: 'fixed',
          top: 24,
          left: 24,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          zIndex: 20,
        }}
        title="Volver"
      >
        <svg width="36" height="36" fill="none" stroke={colors.text} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 30l-10-10 10-10" />
        </svg>
      </button>
      <form
        onSubmit={handleSubmit}
        style={{
          background: colors.card,
          padding: '40px 32px',
          borderRadius: 18,
          boxShadow: '0 8px 32px 0 #0093cc44',
          minWidth: 320,
          maxWidth: 380,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          color: colors.text,
          transition: 'background 0.3s, color 0.3s',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <img
            src="/logo-universidad.png"
            alt="Logo Universidad"
            width={70}
            height={70}
            style={{
              borderRadius: 12,
              background: theme === 'dark' ? '#fff' : '#181c2f',
              marginBottom: 12,
              boxShadow: '0 2px 8px 0 #0093cc33',
            }}
          />
          <h2 style={{
            color: '#0093cc',
            fontWeight: 700,
            fontSize: 28,
            margin: 0,
            letterSpacing: -1,
          }}>
            Iniciar Sesión
          </h2>
        </div>
        <label style={{ color: colors.text, fontWeight: 500, fontSize: 17 }}>
          Usuario o correo
          <input
            type="text"
            value={user}
            onChange={e => setUser(e.target.value)}
            required
            style={{
              width: '100%',
              marginTop: 6,
              padding: '10px 14px',
              borderRadius: 8,
              border: `1.5px solid ${colors.inputBorder}`,
              fontSize: 16,
              outline: 'none',
              marginBottom: 4,
              background: colors.inputBg,
              color: colors.text,
              transition: 'border 0.2s, background 0.3s, color 0.3s',
            }}
            placeholder="Ingresa tu usuario o correo"
          />
        </label>
        <label style={{ color: colors.text, fontWeight: 500, fontSize: 17 }}>
          Contraseña
          <div style={{ position: 'relative' }}>
            <input
              type={showPass ? 'text' : 'password'}
              value={pass}
              onChange={e => setPass(e.target.value)}
              required
              style={{
                width: '100%',
                marginTop: 6,
                padding: '10px 14px',
                borderRadius: 8,
                border: `1.5px solid ${colors.inputBorder}`,
                fontSize: 16,
                outline: 'none',
                background: colors.inputBg,
                color: colors.text,
                transition: 'border 0.2s, background 0.3s, color 0.3s',
              }}
              placeholder="Ingresa tu contraseña"
            />
            <span
              onClick={() => setShowPass(v => !v)}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#0093cc',
                fontSize: 18,
                userSelect: 'none',
              }}
              title={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPass ? '🙈' : '👁️'}
            </span>
          </div>
        </label>
        <button
          type="submit"
          style={{
            background: colors.button,
            color: colors.buttonText,
            fontWeight: 700,
            fontSize: 18,
            border: 'none',
            borderRadius: 8,
            padding: '12px 0',
            marginTop: 10,
            cursor: 'pointer',
            boxShadow: '0 2px 12px 0 #0093cc33',
            transition: 'background 0.2s, color 0.2s, transform 0.2s',
          }}
          onMouseOver={e => {
            (e.currentTarget as HTMLButtonElement).style.background = '#0093cc';
            (e.currentTarget as HTMLButtonElement).style.color = '#f7d774';
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.04)';
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLButtonElement).style.background = colors.button;
            (e.currentTarget as HTMLButtonElement).style.color = colors.buttonText;
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          }}
        >
          Acceder
        </button>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <a href="#" style={{ color: colors.link, textDecoration: 'underline', fontSize: 15 }}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        {/* Botón de modo claro/oscuro opcional en login */}
        <button
          type="button"
          onClick={toggleTheme}
          style={{
            marginTop: 10,
            background: 'transparent',
            color: colors.text,
            border: `1.5px solid ${colors.inputBorder}`,
            borderRadius: 8,
            padding: '8px 0',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s, border 0.2s',
          }}
        >
          {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
        </button>
      </form>
    </div>
  );
}