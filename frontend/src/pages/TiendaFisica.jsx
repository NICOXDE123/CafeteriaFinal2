// frontend/src/pages/TiendaFisica.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/styles.css";

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
  const [itemsEnOrden, setItemsEnOrden] = useState({});
  const [totalOrden, setTotalOrden] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // 1) Recalcular total cada vez que cambian los ítems
  useEffect(() => {
    let total = 0n;
    Object.values(itemsEnOrden).forEach((item) => {
      total += BigInt(Math.round(item.precio * 100)) * item.cantidad;
    });
    setTotalOrden(Number(total) / 100);
  }, [itemsEnOrden]);

  // 2) Agregar un artículo al carrito
  const agregarItem = (title, precio) => {
    setItemsEnOrden((prev) => {
      const prevItem = prev[title] || { precio, cantidad: 0n };
      return {
        ...prev,
        [title]: {
          precio,
          cantidad: prevItem.cantidad + 1n,
        },
      };
    });
  };

  // 3) Actualizar cantidad (aumentar/reducir)
  const actualizarCantidad = (title, delta) => {
    setItemsEnOrden((prev) => {
      const item = prev[title];
      if (!item) return prev;
      const nuevaCant = item.cantidad + BigInt(delta);
      if (nuevaCant < 1n) {
        const copy = { ...prev };
        delete copy[title];
        return copy;
      }
      return { ...prev, [title]: { ...item, cantidad: nuevaCant } };
    });
  };

  // 4) Mostrar / ocultar modal
  const abrirModal = () => setModalVisible(true);
  const cerrarModal = () => setModalVisible(false);

  // 5) Manejar pago con tarjeta
  const handlePagoTarjeta = () => {
    cerrarModal();
    navigate("/pagar");
  };

  // 6) Manejar pago en caja (mostrar alerta y resetear)
  const handlePagoCaja = () => {
    alert(
      `Pedido registrado. Por favor acércate a la caja y paga $${totalOrden.toFixed(
        2
      )}.`
    );
    setItemsEnOrden({});
    cerrarModal();
  };

  // 7) Contar total de artículos en el carrito
  const totalArticulos = Object.values(itemsEnOrden).reduce(
    (sum, it) => sum + Number(it.cantidad),
    0
  );

  return (
    <div className="tienda-fisica-container">
      {/* ───────────────────────────────────────────────────────────────
        A) NAVBAR SUPERIOR (sticky) 
      ─────────────────────────────────────────────────────────────── */}
      <nav className="navbar tienda-navbar">
        <div className="logo">☕ Café Aroma</div>
        <ul className="nav-list">
          <li>
            <NavLink to="/" className="nav-link">
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu" className="nav-link">
              Menú
            </NavLink>
          </li>
        </ul>
        <button className="btn-hero-static btn-carrito" onClick={abrirModal}>
          🛒 Carrito ({totalArticulos}) — ${totalOrden.toFixed(2)}
        </button>
      </nav>

      {/* ───────────────────────────────────────────────────────────────
        B) HEADER con “Tienda Física” y fondo personalizado
      ─────────────────────────────────────────────────────────────── */}
      <header className="tienda-header">
        <div className="tienda-overlay" />
        <div className="tienda-header-text">
          <h1 className="tienda-title">Visítanos</h1>
          <p className="tienda-subtitle">
            Explora nuestra selección de granos de café de origen, recién
            tostados para ti.
          </p>
        </div>
      </header>

      {/* ───────────────────────────────────────────────────────────────
        C) SECCIÓN DE PRODUCTOS (Cards 3D)
      ─────────────────────────────────────────────────────────────── */}
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
                    onClick={() => agregarItem(p.title, p.precio)}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ───────────────────────────────────────────────────────────────
        D) MODAL DE CONFIRMACIÓN DE PEDIDO (ABSOLUTO)
      ─────────────────────────────────────────────────────────────── */}
      {modalVisible && (
        <div className="modal-overlay tienda-modal-overlay">
          <div className="modal-content tienda-modal-content">
            <h3 className="modal-title">Confirmar Pedido</h3>
            <ul className="modal-list">
              {Object.entries(itemsEnOrden).map(([title, item]) => (
                <li key={title} className="modal-item">
                  <span>
                    {title} x{item.cantidad.toString()}
                  </span>
                  <div className="modal-cantidad-controls">
                    <button
                      className="modal-btn-control"
                      onClick={() => actualizarCantidad(title, -1)}
                    >
                      −
                    </button>
                    <button
                      className="modal-btn-control"
                      onClick={() => actualizarCantidad(title, 1)}
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <p className="modal-total">
              Total: <strong>${totalOrden.toFixed(2)}</strong>
            </p>
            <div className="modal-actions tienda-modal-actions">
              <button
                className="modal-btn tienda-btn-secondary"
                onClick={cerrarModal}
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

      {/* ───────────────────────────────────────────────────────────────
        E) FOOTER
      ─────────────────────────────────────────────────────────────── */}
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
