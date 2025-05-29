import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles.css';

export default function SobreNosotros() {
  return (
    <div className="sobre-nosotros-container seccion-blanca">
      <nav className="navbar">
        <div className="logo">☕ Café Aroma</div>
        <ul>
          <li><NavLink to="/">Inicio</NavLink></li>
        </ul>
      </nav>

      <section className="contenedor">
        <h2>Nuestros Valores</h2>
        <ul>
          <li>☕ Calidad en cada taza</li>
          <li>🌱 Compromiso con el medio ambiente</li>
          <li>👥 Cercanía con nuestros clientes</li>
          <li>🌍 Comercio justo con productores</li>
        </ul>
      </section>

      <footer>
        <p>© 2025 Café Aroma. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
