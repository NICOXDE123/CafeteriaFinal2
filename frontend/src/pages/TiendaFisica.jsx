// src/pages/TiendaFisica.jsx

import React, { useEffect } from 'react';
import '../assets/styles.css';
import initializeModal from '../utils/script'; // suponer export default function initializeModal()

export default function TiendaFisica() {
  useEffect(() => {
    // Inicializar comportamiento del modal de imágenes
    if (typeof initializeModal === 'function') {
      initializeModal();
    }
  }, []);

  return (
    <div className="tienda-fisica-container">
      <nav className="navbar">
        <div className="logo">☕ Café Aroma</div>
        <ul>
          <li>
            <a href="#/">Inicio</a>
          </li>
        </ul>
        <a href="#/pedidos" className="ordenar-btn">
          Ordenar Ahora
        </a>
      </nav>

      {/* CAFÉ EN GRANO */}
      <section className="categoria-productos">
        <h3>Café en Grano</h3>
        <div className="productos-grid">

          <div className="producto-card">
            <img
              src="https://assets.sams.com.mx/image/upload/f_auto,q_auto:eco,w_350,c_scale,dpr_auto/mx/images/product-images/img_medium/000268070m.jpg"
              alt="LA PARROQUIA DE VERACRUZ"
            />
            <h4>La Parroquia de Veracruz</h4>
            <p className="precio">$355.00</p>
            <a href="#/pedidos" className="button">
              Ordenar Ahora
            </a>
          </div>

          <div className="producto-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcXFfoDVDUfWKruQrpFB26SIbL5ziHn1YbXg&s"
              alt="Blend Oscuro de la Casa"
            />
            <h4>Blend Oscuro de la Casa</h4>
            <p className="precio">$370.00</p>
            <a href="#/pedidos" className="button">
              Ordenar Ahora
            </a>
          </div>

          <div className="producto-card">
            <img
              src="https://m.media-amazon.com/images/I/612SEFHSVbL._SL1500_.jpg"
              alt="Café Oaxaca Premium"
            />
            <h4>Café Oaxaca Premium</h4>
            <p className="precio">$325.00</p>
            <a href="#/pedidos" className="button">
              Ordenar Ahora
            </a>
          </div>

          <div className="producto-card">
            <img
              src="data:image/jpeg;base64,/9j/..."
              alt="Café de Altura"
            />
            <h4>Café de Altura</h4>
            <p className="precio">$340.00</p>
            <a href="#/pedidos" className="button">
              Ordenar Ahora
            </a>
          </div>

        </div>
      </section>

      {/* CAFÉ MOLIDO */}
      <section className="categoria-productos">
        <h3>Café Molido</h3>
        <div className="productos-grid">

          <div className="producto-card">
            <img
              src="https://tienda.caffenio.com/cdn/shop/products/cafebolsareg250gr1000x10072.png?v=1688771669"
              alt="Molido Medio Tradicional"
              className="imagen-pequena"
              id="miImagen"
            />
            <h4>Molido Medio Tradicional</h4>
            <p className="precio">$340.00</p>
            <a href="#/pedidos" className="button">
              Ordenar Ahora
            </a>
            {/* Contenedor del modal */}
            <div id="miModal" className="modal">
              <span className="cerrar" id="cerrarModal">&times;</span>
              <img className="modal-contenido" id="imagenGrande" />
            </div>
          </div>

          <div className="producto-card">
            <img
              src="https://www.italiancoffee.cl/cdn/shop/files/espressomolido_300x.jpg?v=1709649561"
              alt="Espresso Molido Fino"
            />
            <h4>Espresso Molido Fino</h4>
            <p className="precio">$365.00</p>
            <a href="#/pedidos" className="button">
              Ordenar Ahora
            </a>
          </div>

          <div className="producto-card">
            <img
              src="https://catunambu.cl/1159-large_default/caf%C3%A9-molido-gourmet-catunamb%C3%BA.jpg"
              alt="Molido Gourmet"
            />
            <h4>Café Molido Gourmet</h4>
            <p className="precio">$320.00</p>
            <a href="#/pedidos" className="button">
              Ordenar Ahora
            </a>
          </div>

          <div className="producto-card">
            <img
              src="https://cafedaroma.cl/wp-content/uploads/2022/09/Molido-excelso-250.png"
              alt="Molido Suave Blend"
            />
            <h4>Molido Suave Blend</h4>
            <p className="precio">$270.00</p>
            <a href="#/pedidos" className="button">
              Ordenar Ahora
            </a>
          </div>

        </div>
      </section>

      <footer>
        <p>© 2025 Café Aroma. Todos los derechos reservados.</p>
        <p>📞 Teléfono: +56 9 1234 5678</p>
        <p>✉️ Correo: contacto@cafearoma.cl</p>
        <p>📍 Dirección: Av. Café 123, Santiago, Chile</p>
        <p>
          Síguenos:
          <a href="https://www.instagram.com/cafearoma" target="_blank" rel="noopener noreferrer">Instagram</a> |
          <a href="https://www.facebook.com/cafearoma" target="_blank" rel="noopener noreferrer">Facebook</a>
        </p>
      </footer>
    </div>
  );
}
