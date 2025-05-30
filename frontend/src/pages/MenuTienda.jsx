import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { cafeteria } from '../actors.js';
import '../assets/styles.css';

export default function MenuTienda() {
  const navigate = useNavigate();
  const [items, setItems] = useState({});
  const [total, setTotal] = useState(0);
  const [modal, setModal] = useState(false);
  const [htmlDetalle, setHtmlDetalle] = useState('');

  useEffect(() => {
    let t = 0;
    Object.values(items).forEach(i => { t += i.precio * i.cantidad });
    setTotal(t);
  }, [items]);

  const add = (nombre, precio) =>
    setItems(prev => {
      const cant = prev[nombre]?.cantidad || 0;
      return { ...prev, [nombre]: { precio, cantidad: cant + 1 } };
    });

  const upd = (nombre, delta) =>
    setItems(prev => {
      const it = prev[nombre];
      if (!it) return prev;
      const newCant = it.cantidad + delta;
      if (newCant <= 0) {
        const c = { ...prev }; delete c[nombre];
        return c;
      }
      return { ...prev, [nombre]: { ...it, cantidad: newCant } };
    });

  const openModal = () => {
    const detalle = Object.entries(items)
      .map(([n, i]) => `<li>${n} x${i.cantidad} – $${(i.precio * i.cantidad).toFixed(2)}</li>`)
      .join('');
    setHtmlDetalle(`<ul>${detalle}</ul>`);
    setModal(true);
  };
  const closeModal = () => setModal(false);

  const payCard = () => navigate('/pagar');
  const payCash = async () => {
    // grabo en el canister
    for (const [n, i] of Object.entries(items)) {
      await cafeteria.agregarPedido(n, BigInt(i.cantidad), BigInt(Math.round(i.precio * 100)));
    }
    alert(`Pedido registrado. Paga $${total.toFixed(2)} en caja.`);
    setItems({});
    setModal(false);
  };

  return (
    <div className="menu-tienda-container seccion-blanca">
      {modal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmar Pedido</h3>
            <div dangerouslySetInnerHTML={{ __html: htmlDetalle }} />
            <p>Total: ${total.toFixed(2)}</p>
            <div className="modal-actions">
              <button onClick={closeModal}>Cerrar</button>
              <button onClick={payCard}>Pagar con Tarjeta</button>
              <button onClick={payCash}>Pagar en Caja</button>
            </div>
          </div>
        </div>
      )}
      <nav className="navbar">
        <div className="logo">☕ Café Aroma</div>
        <ul className="nav-list">
          <li><NavLink to="/">Inicio</NavLink></li>
          <li><NavLink to="/tiendafisica">Tienda Física</NavLink></li>
          <li><NavLink to="/pedidos">Pedidos</NavLink></li>
        </ul>
      </nav>
      <main id="menudetienda">
        <div className="resumen-orden">
          <h3>Tu Orden:</h3>
          {Object.keys(items).length === 0
            ? <p>Aún no has añadido nada.</p>
            : (
              <ul>
                {Object.entries(items).map(([n,i])=>(
                  <li key={n}>
                    {n}
                    <button onClick={()=>upd(n,-1)}>-</button>
                    <span>{i.cantidad}</span>
                    <button onClick={()=>upd(n,1)}>+</button>
                    – ${(i.precio * i.cantidad).toFixed(2)}
                    <button onClick={()=>upd(n,-i.cantidad)}>×</button>
                  </li>
                ))}
              </ul>
            )}
          <p>Total: ${total.toFixed(2)}</p>
          <button onClick={openModal}>Realizar Pedido</button>
        </div>
        <h2>Nuestro Menú</h2>
        {/* aquí tu renderizado de cafés y postres, igual que antes */}
      </main>
      <footer>
        <p>© 2025 Café Aroma. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
