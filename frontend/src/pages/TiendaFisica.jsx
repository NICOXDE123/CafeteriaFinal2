import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles.css';
import initializeModal from '../utils/script';

export default function TiendaFisica() {
  useEffect(() => {
    initializeModal();
  }, []);

  return (
    <div className="tienda-fisica-container">
      <nav className="navbar">
        <div className="logo">☕ Café Aroma</div>
        <ul>
          <li><NavLink to="/">Inicio</NavLink></li>
        </ul>
        <NavLink to="/pedidos" className="ordenar-btn">Ordenar Ahora</NavLink>
      </nav>

      <section className="categoria-productos">
        <h3>Café en Grano</h3>
        <div className="productos-grid">
          {/* … tus tarjetas de producto … */}
        </div>
      </section>
      {/* … más secciones … */}

      <footer>
        <p>© 2025 Café Aroma. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
