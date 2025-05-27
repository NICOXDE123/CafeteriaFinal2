// src/pages/Home.jsx

import React from 'react';
import '../assets/styles.css';

export default function Home() {
  return (
    <div className="home-container">
      <header>
        <h1>Café Aroma</h1>
        <nav>
          <ul>
            <li><a href="#/menu" className="activo">Menú</a></li>
            <li><a href="#/tiendafisica">Tienda Física</a></li>
            <li><a href="#/sobrenosotros">Sobre Nosotros</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="bienvenida">
          <h2>Bienvenido a Café Aroma</h2>
          <p>Descubre nuestros cafés de especialidad, cultivados con amor y servidos con pasión.</p>
          <p>Explora nuestro menú y conoce más sobre nuestra historia.</p>
        </section>

        <section className="promociones">
          <h3>Promociones del Mes</h3>
          <ul>
            <li>☕ 2x1 en espresso los lunes</li>
            <li>🥐 Combo desayuno desde $3.990</li>
            <li>🎁 Café gratis en tu primera compra</li>
          </ul>
        </section>
      </main>

      <footer>
        <p>© 2025 Café Aroma. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
