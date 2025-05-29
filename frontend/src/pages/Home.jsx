import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles.css';

export default function Home() {
  return (
    <div className="home-container">
      <header className="hero">
        <h1>Café Aroma</h1>
        <nav>
          <ul>
            <li><NavLink to="/menu">Menú</NavLink></li>
            <li><NavLink to="/tiendafisica">Tienda Física</NavLink></li>
            <li><NavLink to="/sobrenosotros">Sobre Nosotros</NavLink></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="bienvenida seccion-blanca">
          <h2>Bienvenido a Café Aroma</h2>
          <p>Descubre nuestros cafés de especialidad, cultivados con amor y servidos con pasión.</p>
          <p>Explora nuestro menú y conoce más sobre nuestra historia.</p>
        </section>

        <section className="promociones seccion-crema">
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
