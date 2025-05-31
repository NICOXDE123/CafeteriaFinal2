// frontend/src/pages/Pagar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/styles.css";

export default function Pagar() {
  const navigate = useNavigate();

  // ===== Estado para datos de pago =====
  const [nombre, setNombre] = useState("");
  const [numero, setNumero] = useState("");
  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // ===== Leer carrito desde localStorage =====
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("cafearoma_cart");
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    const suma = cart.reduce((acc, item) => acc + item.subtotal, 0);
    setTotal(suma);
  }, [cart]);

  // ===== Función para simular el pago =====
  const handlePago = (e) => {
    e.preventDefault();

    // Validación básica
    if (!nombre.trim() || !numero.trim() || !mes || !anio || !cvv.trim()) {
      alert("Por favor, completa todos los campos del formulario.");
      return;
    }

    // Simulación: mostrar modal y limpiar localStorage
    setPaymentSuccess(true);
    localStorage.removeItem("cafearoma_cart");
  };

  // ===== Cerrar modal y redirigir a Menú =====
  const cerrarModal = () => {
    setPaymentSuccess(false);
    navigate("/menu");
  };

  return (
    <div className="pagar-container">
      {/* ─────────────────────────────────────────────────────────────────────
          1) BARRA SUPERIOR: HOME / MENÚ / TIENDA FÍSICA
      ────────────────────────────────────────────────────────────────────── */}
      <nav className="navbar">
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
          <li>
            <NavLink to="/tiendafisica" className="nav-link">
              Tienda Física
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* ─────────────────────────────────────────────────────────────────────
          2) GRID PRINCIPAL: RESUMEN DEL CARRITO + FORMULARIO DE PAGO
      ────────────────────────────────────────────────────────────────────── */}
      <main className="contenedor checkout-container">
        {/* ─────────────────────────────────────────────────────────────
            2.A) RESUMEN DEL CARRITO
        ────────────────────────────────────────────────────────────── */}
        <section className="summary-card">
          <h2 className="summary-title">Tu Pedido</h2>
          {cart.length === 0 ? (
            <p className="empty-cart">Tu carrito está vacío.</p>
          ) : (
            <div className="summary-list">
              {cart.map((item) => (
                <div key={item.key} className="summary-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-size"> ({item.size})</span>
                    {item.toppings.length > 0 && (
                      <div className="item-toppings">
                        + {item.toppings.join(", ")}
                      </div>
                    )}
                  </div>
                  <div className="item-qty-price">
                    <span className="item-qty">×{item.qty}</span>
                    <span className="item-subtotal">
                      ${item.subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
              <div className="summary-total">
                <span>Total:</span>
                <span className="total-amount">${total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </section>

        {/* ─────────────────────────────────────────────────────────────
            2.B) FORMULARIO DE PAGO
        ────────────────────────────────────────────────────────────── */}
        <section className="payment-card">
          <h2 className="payment-title">Datos de Pago</h2>
          <form onSubmit={handlePago} className="payment-form">
            {/* Nombre del titular */}
            <div className="form-group">
              <label htmlFor="nombre">Nombre del titular</label>
              <input
                id="nombre"
                type="text"
                placeholder="Como aparece en la tarjeta"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            {/* Número de tarjeta */}
            <div className="form-group">
              <label htmlFor="numero">Número de tarjeta</label>
              <input
                id="numero"
                type="text"
                placeholder="0000 0000 0000 0000"
                maxLength="19"
                pattern="\d{4}\s?\d{4}\s?\d{4}\s?\d{4}"
                value={numero}
                onChange={(e) => {
                  // Formateo automático cada 4 dígitos
                  const raw = e.target.value.replace(/\D/g, "");
                  const groups = raw.match(/.{1,4}/g);
                  setNumero(groups ? groups.join(" ") : raw);
                }}
                required
              />
            </div>

            {/* Mes / Año / CVV en una fila */}
            <div className="form-grid-two">
              <div className="form-group small">
                <label htmlFor="mes">Mes (MM)</label>
                <input
                  id="mes"
                  type="number"
                  min="1"
                  max="12"
                  placeholder="MM"
                  value={mes}
                  onChange={(e) => setMes(e.target.value)}
                  required
                />
              </div>
              <div className="form-group small">
                <label htmlFor="anio">Año (AAAA)</label>
                <input
                  id="anio"
                  type="number"
                  min={new Date().getFullYear()}
                  max={new Date().getFullYear() + 20}
                  placeholder="AAAA"
                  value={anio}
                  onChange={(e) => setAnio(e.target.value)}
                  required
                />
              </div>
              <div className="form-group small">
                <label htmlFor="cvv">CVV</label>
                <input
                  id="cvv"
                  type="password"
                  maxLength="4"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-pay">
              Pagar ${total.toFixed(2)}
            </button>
          </form>
        </section>
      </main>

      {/* ─────────────────────────────────────────────────────────────────────
          3) FOOTER
      ────────────────────────────────────────────────────────────────────── */}
      <footer className="footer-home">
        <div className="contenedor footer-content">
          <p>© 2025 Café Aroma. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────────────
          4) MODAL DE ÉXITO
      ────────────────────────────────────────────────────────────────────── */}
      {paymentSuccess && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>¡Pago Exitoso!</h3>
            <p>Gracias por tu compra. Tu pedido está en proceso.</p>
            <button className="btn-modal" onClick={cerrarModal}>
              Volver al Menú
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
