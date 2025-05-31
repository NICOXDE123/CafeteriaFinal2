// frontend/src/pages/Home.jsx
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles.css';

export default function Home() {
  // Al montar el componente, aplicamos la clase de fade-in
  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add('page-fade-in');
    // Quitamos la clase tras 1.2s para que no interfiera con otras páginas
    const timeout = setTimeout(() => {
      body.classList.remove('page-fade-in');
    }, 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="home-container">
      {/* ───────────────────────────────────────────────────────────────
        1) HERO ESTÁTICO CON TRANSICIÓN
      ─────────────────────────────────────────────────────────────── */}
      <section className="hero-home-static">
        <div className="hero-overlay-static" />
        <div className="hero-content-static">
          <h1 className="hero-title-static">Café Aroma</h1>
          <p className="hero-subtitle-static">
            Del grano a tu paladar: tu experiencia cafetera definitiva.
          </p>
          <div className="hero-buttons-static">
            <NavLink to="/menu" className="btn-hero-static">
              Ver Menú
            </NavLink>
            <NavLink to="/tiendafisica" className="btn-hero-static btn-hero-outline-static">
              Tienda Física
            </NavLink>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────
        2) BIENVENIDA CON CONTENEDOR 3D
      ─────────────────────────────────────────────────────────────── */}
      <main className="main-home-static">
        <section className="bienvenida-static">
          <h2 className="section-title-static">Bienvenido a Café Aroma</h2>
          <p className="section-text-static">
            Aquí, cada sorbo cuenta. Seleccionamos granos de altura y los preparamos con dedicación para ofrecerte un café inolvidable.
          </p>
          <p className="section-text-static">
            Conoce nuestras promociones y productos destacados en nuestro menú.
          </p>
        </section>

        {/* ───────────────────────────────────────────────────────────────
          3) DESTACADOS CON CONTENEDORES 3D
        ─────────────────────────────────────────────────────────────── */}
        <section className="destacados-static">
          <h3 className="section-title-static">Productos Destacados</h3>
          <div className="destacados-grid-static">
            {/* Ejemplos de tres destacados */}
            <NavLink to="/menu" className="card-destacado-static">
              <img src="/images/latte.png" alt="Latte" className="card-img-static" />
              <div className="card-text-static">
                <h4>Latte Crema</h4>
                <p>$3.50</p>
              </div>
            </NavLink>
            <NavLink to="/menu" className="card-destacado-static">
              <img src="/images/cappuccino.png" alt="Cappuccino" className="card-img-static" />
              <div className="card-text-static">
                <h4>Cappuccino Clásico</h4>
                <p>$3.75</p>
              </div>
            </NavLink>
            <NavLink to="/menu" className="card-destacado-static">
              <img src="/images/matcha latte.png" alt="Matcha Latte" className="card-img-static" />
              <div className="card-text-static">
                <h4>Matcha Latte</h4>
                <p>$4.00</p>
              </div>
            </NavLink>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────
          4) PROMOCIONES ESTÁTICAS
        ─────────────────────────────────────────────────────────────── */}
        <section className="promociones-static">
          <h3 className="section-title-static">Promociones del Mes</h3>
          <ul className="promo-list-static">
            <li className="promo-item-static">
              <span className="promo-icon-static">☕</span>
              <div className="promo-text-static">
                <strong>2×1 en Espresso</strong> – Lunes y martes matutinos
              </div>
            </li>
            <li className="promo-item-static">
              <span className="promo-icon-static">🥐</span>
              <div className="promo-text-static">
                <strong>Combo Desayuno</strong> – Café + Croissant <strong>$3.990</strong>
              </div>
            </li>
            <li className="promo-item-static">
              <span className="promo-icon-static">🎁</span>
              <div className="promo-text-static">
                <strong>10% OFF</strong> en tu primera compra con <em>BIENVENIDO10</em>
              </div>
            </li>
          </ul>
        </section>
      </main>

      {/* ───────────────────────────────────────────────────────────────
        5) FOOTER HOME
      ─────────────────────────────────────────────────────────────── */}
      <footer className="footer-static">
        <p>© 2025 Café Aroma. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
