// frontend/src/pages/TiendaFisica.jsx
import React, { useContext, useState } from "react";
import "../assets/styles.css";

import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const PRODUCTOS = [
  {
    img: "https://assets.sams.com.mx/image/upload/f_auto,q_auto:eco,w_350,c_scale,dpr_auto/mx/images/product-images/img_medium/000268070m.jpg",
    title: "La Parroquia de Veracruz",
    precio: 355.0,
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcXFfoDVDUfWKruQrpFB26SIbL5ziHn1YbXg&s",
    title: "Blend Oscuro de la Casa",
    precio: 370.0,
  },
  {
    img: "https://m.media-amazon.com/images/I/612SEFHSVbL._SL1500_.jpg",
    title: "Café Oaxaca Premium",
    precio: 325.0,
  },
];

export default function TiendaFisica() {
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQty, total, clearCart } = useContext(CartContext);
  const [modalVisible, setModalVisible] = useState(false);

  // Agrega un producto “grano” al carrito
  const handleAgregar = (title, precio) => {
    const nuevoItem = {
      name: title,
      size: "Paquete",
      toppings: [],
      qty: 1,
      unitPrice: precio,
      subtotal: precio,
    };
    addToCart(nuevoItem);
  };

  // Pago con tarjeta: cierra modal y va a /pagar
  const handlePagoTarjeta = () => {
    setModalVisible(false);
    navigate("/pagar");
  };

  // Pago en caja: alerta, limpia carrito y cierra modal
  const handlePagoCaja = () => {
    alert(`Pedido registrado. Por favor acércate a la caja y paga $${total.toFixed(2)}.`);
    clearCart();
    setModalVisible(false);
  };

  return (
    <div className="tienda-fisica-container">
      {/** Header “Visítanos” **/}
      <header className="tienda-header">
        <div className="tienda-overlay" />
        <div className="tienda-header-text">
          <h1 className="tienda-title">Visítanos</h1>
          <p className="tienda-subtitle">
            Explora nuestra selección de granos de café de origen, recién tostados para ti.
          </p>
        </div>
      </header>

      {/** Sección de productos (granos) **/}
      <main className="seccion-blanca tienda-main">
        <section className="categoria-productos">
          <h3 className="categoria-title">Café en Grano</h3>
          <div className="productos-grid">
            {PRODUCTOS.map((p) => (
              <div key={p.title} className="producto-card tienda-card">
                <div className="producto-img-wrapper">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="producto-img tienda-img"
                  />
                </div>
                <div className="producto-body">
                  <h4 className="producto-nombre">{p.title}</h4>
                  <p className="precio-card">${p.precio.toFixed(2)}</p>
                  <button
                    className="btn-hero-static btn-agregar"
                    onClick={() => handleAgregar(p.title, p.precio)}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/** Botón flotante del carrito (idéntico al de MenuTienda) **/}
      <button
        className="btn-hero-static btn-carrito tienda-carrito-btn"
        onClick={() => setModalVisible(true)}
        style={{
          position: "fixed",
          right: "1rem",
          bottom: "1rem",
          zIndex: 200,
        }}
      >
        🛒 Carrito ({cartItems.length}) — ${total.toFixed(2)}
      </button>

      {/** Modal para confirmar pedido **/}
      {modalVisible && (
        <div className="modal-overlay tienda-modal-overlay">
          <div className="modal-content tienda-modal-content">
            <h3 className="modal-title">Confirmar Pedido</h3>
            {cartItems.length === 0 ? (
              <p>No has agregado nada todavía.</p>
            ) : (
              <ul className="modal-list">
                {cartItems.map((item) => (
                  <li key={item.key} className="modal-item">
                    <span>
                      {item.name} x{item.qty}
                    </span>
                    <div className="modal-cantidad-controls">
                      <button
                        className="modal-btn-control"
                        onClick={() => updateQty(item.key, -1)}
                      >
                        −
                      </button>
                      <button
                        className="modal-btn-control"
                        onClick={() => updateQty(item.key, 1)}
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <p className="modal-total">
              Total: <strong>${total.toFixed(2)}</strong>
            </p>
            <div className="modal-actions tienda-modal-actions">
              <button
                className="modal-btn tienda-btn-secondary"
                onClick={() => setModalVisible(false)}
              >
                Cerrar
              </button>
              <button
                className="modal-btn tienda-btn-primary"
                onClick={handlePagoTarjeta}
              >
                Pagar con Tarjeta
              </button>
              <button
                className="modal-btn tienda-btn-success"
                onClick={handlePagoCaja}
              >
                Pagar en Caja
              </button>
            </div>
          </div>
        </div>
      )}

      {/** Footer **/}
      <footer className="footer-static tienda-footer">
        <p>© 2025 Café Aroma. Todos los derechos reservados.</p>
        <p>📞 Teléfono: +56 9 1234 5678</p>
        <p>✉️ contacto@cafearoma.cl</p>
        <p>📍 Av. Café 123, Santiago, Chile</p>
        <p>
          Síguenos:&nbsp;
          <a
            href="https://www.instagram.com/cafearoma"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            Instagram
          </a>{" "}
          |&nbsp;
          <a
            href="https://www.facebook.com/cafearoma"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            Facebook
          </a>
        </p>
      </footer>
    </div>
  );
}
