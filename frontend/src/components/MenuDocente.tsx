import React from 'react';

const MenuDocente = () => (
  <nav className="menu-docente">
    <ul>
      <li><a href="/docente/clases">Mis Clases</a></li>
      <li><a href="/docente/estudiantes">Estudiantes</a></li>
      <li><a href="/docente/calificaciones">Calificaciones</a></li>
      {/* Agrega más opciones según lo que necesites */}
    </ul>
  </nav>
);

export default MenuDocente;
