'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

// Animación de fondo tipo partículas (canvas)
function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: { x: number; y: number; r: number; dx: number; dy: number }[] = [];
    const numParticles = 80;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 1,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
      });
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.globalAlpha = 0.6;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#7b61ff';
        ctx.shadowColor = '#7b61ff';
        ctx.shadowBlur = 8;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      }
      ctx.restore();
      animationFrameId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

// SVG animado (puedes reemplazarlo por tu propio SVG animado)
function AnimatedSVG() {
  return (
    <svg width="260" height="200" viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="40" width="200" height="120" rx="18" fill="#181c2f" stroke="#7b61ff" strokeWidth="3" />
      <rect x="50" y="60" width="160" height="20" rx="6" fill="#7b61ff">
        <animate attributeName="width" values="160;100;160" dur="2s" repeatCount="indefinite" />
      </rect>
      <rect x="50" y="90" width="120" height="16" rx="5" fill="#fff">
        <animate attributeName="width" values="120;80;120" dur="1.5s" repeatCount="indefinite" />
      </rect>
      <rect x="50" y="115" width="60" height="12" rx="4" fill="#fff">
        <animate attributeName="width" values="60;100;60" dur="1.8s" repeatCount="indefinite" />
      </rect>
      <circle cx="200" cy="130" r="10" fill="#ff6bcb">
        <animate attributeName="cy" values="130;150;130" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="80" cy="150" r="6" fill="#7b61ff">
        <animate attributeName="cy" values="150;170;150" dur="1.7s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default function Landing() {
  const { theme, toggleTheme } = useTheme();
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const langRef = useRef<HTMLDivElement>(null);

  // Cierra el menú si se hace click fuera
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    if (langOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [langOpen]);

  // Paletas de colores para ambos modos
  const colors = theme === 'dark'
    ? {
        background: '#101426',
        bar: '#181c2f',
        border: '#0093cc',
        phoneIcon: '#26acd9',
        mailIcon: '#4bc5e6',
        langIcon: '#0093cc',
        text: '#fff',
        button: 'linear-gradient(90deg, #0093cc 60%, #f7d774 100%)',
        buttonHoverBg: '#0093cc',
        buttonHoverColor: '#f7d774',
        infoBtnBg: 'transparent',
        infoBtnColor: '#0093cc',
        infoBtnBorder: '#0093cc',
        infoBtnHoverBg: '#0093cc',
        infoBtnHoverColor: '#fff',
      }
    : {
        background: '#f7fafc',
        bar: 'linear-gradient(90deg, #0093cc 0%, #26acd9 60%, #4bc5e6 100%)',
        border: '#0093cc',
        phoneIcon: '#fff',
        mailIcon: '#fff',
        langIcon: '#fff',
        text: '#181c2f',
        button: 'linear-gradient(90deg, #0093cc 60%, #f7d774 100%)',
        buttonHoverBg: '#0093cc',
        buttonHoverColor: '#fff',
        infoBtnBg: '#fff',
        infoBtnColor: '#0093cc',
        infoBtnBorder: '#0093cc',
        infoBtnHoverBg: '#0093cc',
        infoBtnHoverColor: '#fff',
      };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: colors.background }}>
      {/* Barra superior */}
      <div
        style={{
          width: '100%',
          background: colors.bar,
          color: colors.text,
          fontFamily: 'inherit',
          fontSize: 18,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 40px',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 10,
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)',
          borderBottom: `3px solid ${colors.border}`,
          transition: 'box-shadow 0.3s, background 0.3s',
          animation: 'fadeDown 1s cubic-bezier(.77,0,.18,1) both',
        }}
      >
        {/* Logo universidad */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <img
            src="/logo-universidad.png"
            alt="Logo Universidad"
            width={48}
            height={48}
            style={{
              borderRadius: 12,
              background: theme === 'dark' ? '#181c2f' : '#fff',
              boxShadow: '0 2px 8px 0 #0093cc33',
              objectFit: 'cover',
            }}
          />
          {/* Teléfono */}
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="20" height="20" fill="none" stroke={colors.phoneIcon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9 }}>
              <path d="M2 5.5C2 15 9 18 9 18s1.5-1.5 2.5-2.5c.7-.7.7-1.8 0-2.5l-1.5-1.5a1.8 1.8 0 0 1 0-2.5l2-2a1.8 1.8 0 0 1 2.5 0l1.5 1.5c.7.7 1.8.7 2.5 0C18.5 10.5 20 9 20 9S17 2 7.5 2A5.5 5.5 0 0 0 2 5.5Z"/>
            </svg>
            <span style={{ color: colors.text, fontWeight: 500 }}>Teléfono:</span> +591 (3) 3363939
          </span>
          {/* Correo */}
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="20" height="20" fill="none" stroke={colors.mailIcon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9 }}>
              <rect x="2" y="4" width="16" height="12" rx="3" />
              <path d="M2 6l8 6 8-6" />
            </svg>
            <span style={{ color: colors.text, fontWeight: 500 }}>Correo:</span> plataformavirtual@nur.edu
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* Idioma con dropdown */}
          <div ref={langRef} style={{ position: 'relative' }}>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                userSelect: 'none',
                padding: '4px 12px',
                borderRadius: 8,
                transition: 'background 0.2s',
                background: langOpen ? '#0093cc22' : 'transparent',
              }}
              onClick={() => setLangOpen((v) => !v)}
            >
              <svg width="20" height="20" fill="none" stroke={colors.langIcon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9 }}>
                <circle cx="10" cy="10" r="8" />
                <path d="M2 10h16M10 2a16 16 0 0 1 0 16M10 2a16 16 0 0 0 0 16" />
              </svg>
              {lang === 'es' ? 'Español - Internacional (es)' : 'Inglés (en)'}
              <svg width="14" height="14" fill="none" stroke={colors.text} strokeWidth="2" style={{ marginLeft: 4, opacity: 0.7, transition: 'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path d="M3 6l4 4 4-4" />
              </svg>
            </span>
            {langOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 36,
                  right: 0,
                  background: theme === 'dark' ? '#181c2f' : '#fff',
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 8,
                  boxShadow: '0 4px 16px 0 #0002',
                  minWidth: 180,
                  zIndex: 100,
                  animation: 'fadeInLang 0.2s',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: '10px 18px',
                    cursor: 'pointer',
                    background: lang === 'es' ? '#0093cc22' : 'transparent',
                  }}
                  onClick={() => { setLang('es'); setLangOpen(false); }}
                >
                  Español - Internacional (es)
                </div>
                <div
                  style={{
                    padding: '10px 18px',
                    cursor: 'pointer',
                    background: lang === 'en' ? '#0093cc22' : 'transparent',
                  }}
                  onClick={() => { setLang('en'); setLangOpen(false); }}
                >
                  Inglés (en)
                </div>
              </div>
            )}
          </div>
          {/* Buscar */}
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', opacity: 0.85, transition: 'opacity 0.2s' }}
            onMouseOver={e => (e.currentTarget.style.opacity = '1')}
            onMouseOut={e => (e.currentTarget.style.opacity = '0.85')}
          >
            <svg width="20" height="20" fill="none" stroke={colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="9" r="7" />
              <path d="M16 16l-3-3" />
            </svg>
          </span>
          {/* Botón modo claro/oscuro */}
          <button
            onClick={toggleTheme}
            style={{
              marginLeft: 16,
              background: colors.button,
              color: theme === 'dark' ? '#181c2f' : '#fff',
              border: 'none',
              borderRadius: 20,
              padding: '6px 18px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px 0 #0093cc22',
              transition: 'background 0.2s, color 0.2s, transform 0.2s',
              animation: 'fadeInBtn 0.7s',
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.06)';
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            }}
          >
            {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </div>
      </div>

      {/* Ajusta el paddingTop para que el contenido no quede debajo de la barra */}
      <div style={{ paddingTop: 56 }}>
        <ParticlesBackground />
        <section
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 100, // Más espacio entre columnas
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              animation: 'fadeInLeft 1.2s cubic-bezier(.77,0,.18,1) both',
              minWidth: 480, // Más ancho para el contenido
            }}
          >
            <img
              src="/logo-universidad.png"
              alt="Logo Universidad"
              width={180} // Antes 120
              height={180} // Antes 120
              style={{
                marginBottom: 32,
                borderRadius: 20,
                boxShadow: '0 6px 32px 0 #7b61ff44',
                animation: 'logoPop 1.2s cubic-bezier(.77,0,.18,1) both',
                background: theme === 'dark' ? '#181c2f' : '#fff',
              }}
            />
            <p
              style={{
                color: '#ff6bcb',
                fontFamily: 'monospace',
                marginBottom: 0,
                fontSize: 22, // Más grande
                opacity: 0.85,
                animation: 'fadeInUp 1.3s 0.2s both',
              }}
            >
              Hola, bienvenido a la 
            </p>
            <h1
              style={{
                fontSize: 64, // Más grande
                fontWeight: 'bold',
                margin: 0,
                color: colors.text,
                letterSpacing: -2,
                animation: 'fadeInUp 1.3s 0.3s both',
              }}
            >
              Plataforma Estudiantil
            </h1>
            <h2
              style={{
                fontSize: 40, // Más grande
                fontWeight: 'bold',
                margin: 0,
                color: '#0093cc',
                animation: 'fadeInUp 1.3s 0.4s both',
              }}
            >
              Universidad Ejemplo
            </h2>
            <p
              style={{
                marginTop: 28,
                maxWidth: 500,
                color: theme === 'dark' ? '#c3c3c3' : '#181c2f',
                fontSize: 22, // Más grande
                animation: 'fadeInUp 1.3s 0.5s both',
              }}
            >
              Gestiona tu perfil, materias, calificaciones y accede a toda la información universitaria.
            </p>
            <div style={{ display: 'flex', gap: 20, marginTop: 40 }}>
              <Link href="/login">
                <button
                  style={{
                    padding: '12px 32px',
                    fontSize: 18,
                    background: colors.button,
                    color: colors.text,
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 600,
                    boxShadow: '0 2px 12px 0 #0093cc33',
                    transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s, color 0.2s',
                  }}
                  onMouseOver={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = colors.buttonHoverBg;
                    (e.currentTarget as HTMLButtonElement).style.color = colors.buttonHoverColor;
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.06)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 24px 0 #0093cc66';
                  }}
                  onMouseOut={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = colors.button;
                    (e.currentTarget as HTMLButtonElement).style.color = colors.text;
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 12px 0 #0093cc33';
                  }}
                >
                  Iniciar Sesión
                </button>
              </Link>
              <Link href="/info-universidad">
                <button
                  style={{
                    padding: '12px 32px',
                    fontSize: 18,
                    background: colors.infoBtnBg,
                    color: colors.infoBtnColor,
                    border: `2px solid ${colors.infoBtnBorder}`,
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'background 0.2s, color 0.2s, border 0.2s, transform 0.2s',
                  }}
                  onMouseOver={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = colors.infoBtnHoverBg;
                    (e.currentTarget as HTMLButtonElement).style.color = colors.infoBtnHoverColor;
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.06)';
                  }}
                  onMouseOut={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = colors.infoBtnBg;
                    (e.currentTarget as HTMLButtonElement).style.color = colors.infoBtnColor;
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                  }}
                >
                  Información de la Universidad
                </button>
              </Link>
            </div>
          </div>
          <div
            style={{
              animation: 'fadeInRight 1.2s cubic-bezier(.77,0,.18,1) both',
            }}
          >
            <AnimatedSVG />
          </div>
        </section>
      </div>
      {/* Animaciones keyframes */}
      <style>{`
        @keyframes fadeInLeft {
          0% { opacity: 0; transform: translateX(-60px);}
          100% { opacity: 1; transform: translateX(0);}
        }
        @keyframes fadeInRight {
          0% { opacity: 0; transform: translateX(60px);}
          100% { opacity: 1; transform: translateX(0);}
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes logoPop {
          0% { opacity: 0; transform: scale(0.7);}
          80% { opacity: 1; transform: scale(1.1);}
          100% { opacity: 1; transform: scale(1);}
        }
        @keyframes fadeDown {
          0% { opacity: 0; transform: translateY(-30px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes fadeInBtn {
          0% { opacity: 0; transform: scale(0.8);}
          100% { opacity: 1; transform: scale(1);}
        }
        @keyframes fadeInLang {
          0% { opacity: 0; transform: translateY(-10px);}
          100% { opacity: 1; transform: translateY(0);}
        }
      `}</style>

      {/* Footer */}
      <footer style={{
        background: '#232323',
        color: '#fff',
        padding: '48px 0 0 0',
        marginTop: 80,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 40px',
          gap: 40,
        }}>
          {/* Info */}
          <div>
            <h2 style={{ color: '#0093cc', fontSize: 32, marginBottom: 18 }}>Info</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li><a href="#" style={{ color: '#fff', textDecoration: 'underline', marginBottom: 8, display: 'inline-block' }}>Notas Estudiantes</a></li>
              <li><a href="#" style={{ color: '#fff', textDecoration: 'underline', marginBottom: 8, display: 'inline-block' }}>Apoyo Docente</a></li>
              <li><a href="#" style={{ color: '#fff', textDecoration: 'underline', marginBottom: 8, display: 'inline-block' }}>Bibliotecas Virtuales</a></li>
              <li><a href="#" style={{ color: '#fff', textDecoration: 'underline', marginBottom: 8, display: 'inline-block' }}>Pagar Aquí</a></li>
              <li><a href="#" style={{ color: '#fff', textDecoration: 'underline', marginBottom: 8, display: 'inline-block' }}>Unirse</a></li>
            </ul>
          </div>
          {/* Contacto */}
          <div>
            <h2 style={{ color: '#0093cc', fontSize: 32, marginBottom: 18 }}>Contact Us</h2>
            <div style={{ marginBottom: 10 }}>Campus Universitario: Av. Cristo Redentor 100</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" style={{ opacity: 0.8 }}>
                <rect x="2" y="4" width="16" height="12" rx="3" />
              </svg>
              <span>Phone : +591 (3) 3363939</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" style={{ opacity: 0.8 }}>
                <path d="M2 6l8 6 8-6" />
                <rect x="2" y="4" width="16" height="12" rx="3" />
              </svg>
              <span>
                E-mail : <a href="mailto:plataformavirtual@nur.edu" style={{ color: '#4bc5e6', textDecoration: 'underline' }}>plataformavirtual@nur.edu</a>
              </span>
            </div>
          </div>
          {/* Redes sociales */}
          <div>
            <h2 style={{ color: '#0093cc', fontSize: 32, marginBottom: 18 }}>Follow Us</h2>
            <div style={{ display: 'flex', gap: 18 }}>
              <a href="#" style={{ background: '#ff007a', borderRadius: 8, padding: 12, display: 'inline-block' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm4.25 4.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zm0 1.5a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5zm6.5.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z"/></svg>
              </a>
              <a href="#" style={{ background: '#ff2d2d', borderRadius: 8, padding: 12, display: 'inline-block' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M21.8 8s-.2-1.4-.8-2c-.7-.8-1.5-.8-1.9-.9C16.2 4.9 12 4.9 12 4.9h-.1s-4.2 0-7.1.2c-.4 0-1.2.1-1.9.9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.6c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.7.8 2.1.9 1.5.1 6.9.2 6.9.2s4.2 0 7.1-.2c.4 0 1.2-.1 1.9-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6c0-1.6-.2-3.2-.2-3.2zM9.8 15.3V8.7l6.5 3.3-6.5 3.3z"/></svg>
              </a>
              <a href="#" style={{ background: '#1877f2', borderRadius: 8, padding: 12, display: 'inline-block' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              </a>
            </div>
          </div>
        </div>
        {/* Línea inferior */}
        <div style={{
          background: '#111',
          color: '#fff',
          textAlign: 'center',
          padding: '16px 8px 8px 8px',
          fontSize: 17,
          marginTop: 32,
          letterSpacing: 0.5,
        }}>
          Campus Universitario: Av. Cristo Redentor 100 | Tel.: +591 (3) 3363939 | plataformavirtual@nur.edu | Santa Cruz de la Sierra - Bolivia Copyright © Nur 2025 Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}