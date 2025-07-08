import React from 'react';

export default function PerfilEstudiante({ perfil }: { perfil: any }) {
  return (
    <div>
      <h2>Mi Perfil</h2>
      <p><strong>Nombre:</strong> {perfil.nombre}</p>
      <p><strong>Matrícula:</strong> {perfil.matricula}</p>
      <p><strong>Carrera:</strong> {perfil.carrera}</p>
      {/* Agrega aquí la opción de editar perfil o cambiar contraseña */}
    </div>
  );
}
