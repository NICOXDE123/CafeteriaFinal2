// src/pages/SobreNosotros.jsx

import React from 'react';
import '../assets/styles.css';

export default function SobreNosotros() {
  return (
    <div className="sobre-nosotros-container">
      {/* Navegación */}
      <nav className="navbar">
        <div className="logo">☕ Café Aroma</div>
        <ul>
          <li>
            <a href="#/">Inicio</a>
          </li>
        </ul>
      </nav>

      {/* Valores */}
      <section className="seccion-blanca">
        <div className="contenedor">
          <h2>Nuestros Valores</h2>
          <ul>
            <li>☕ Calidad en cada taza</li>
            <li>🌱 Compromiso con el medio ambiente</li>
            <li>👥 Cercanía con nuestros clientes</li>
            <li>🌍 Comercio justo con productores</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Café Aroma. Todos los derechos reservados.</p>
        <p>📞 Teléfono: +56 9 1234 5678</p>
        <p>✉️ Correo: contacto@cafearoma.cl</p>
        <p>📍 Dirección: Av. Café 123, Santiago, Chile</p>
        <p>
          Síguenos:{' '}
          <a
            href="https://www.instagram.com/cafearoma"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>{' '}
          |{' '}
          <a
            href="https://www.facebook.com/cafearoma"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </p>
      </footer>
    </div>
  );
}
