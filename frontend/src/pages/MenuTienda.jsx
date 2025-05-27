// src/pages/MenuTienda.jsx

import React, { useState, useEffect } from 'react';
import '../assets/styles.css';
import { useNavigate } from 'react-router-dom';

export default function MenuTienda() {
  const navigate = useNavigate();

  // Estructura del pedido: { nombre: { precio, cantidad } }
  const [itemsEnOrden, setItemsEnOrden] = useState({});
  const [totalOrden, setTotalOrden] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [detalleHTML, setDetalleHTML] = useState('');

  // Configura el listado de botones y acciones
  useEffect(() => {
    calcularTotal();
  }, [itemsEnOrden]);

  const agregarItem = (nombre, precio) => {
    setItemsEnOrden(prev => {
      const cantidad = prev[nombre]?.cantidad || 0;
      return { ...prev, [nombre]: { precio, cantidad: cantidad + 1 } };
    });
  };

  const actualizarCantidad = (nombre, delta) => {
    setItemsEnOrden(prev => {
      const item = prev[nombre];
      if (!item) return prev;
      const nuevaCant = item.cantidad + delta;
      if (nuevaCant <= 0) {
        const copy = { ...prev };
        delete copy[nombre];
        return copy;
      }
      return { ...prev, [nombre]: { ...item, cantidad: nuevaCant } };
    });
  };

  const calcularTotal = () => {
    let total = 0;
    Object.values(itemsEnOrden).forEach(item => {
      total += item.precio * item.cantidad;
    });
    setTotalOrden(total);
  };

  const mostrarModal = () => {
    // Generar HTML del detalle
    const detalle = Object.entries(itemsEnOrden).map(
      ([nombre, item]) => `<li>${nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}</li>`
    ).join('');
    setDetalleHTML(`<ul>${detalle}</ul>`);
    setModalVisible(true);
  };

  const cerrarModal = () => setModalVisible(false);

  const handlePagoTarjeta = () => navigate('/pagar');
  const handlePagoCaja = () => {
    alert(`Pedido registrado. Pague $${totalOrden.toFixed(2)} en caja.`);
    setItemsEnOrden({});
    setModalVisible(false);
  };

  return (
    <div className="menu-tienda-container seccion-blanca">
      {/* Modal */}
      {modalVisible && (
        <div id="modal-pedido" className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmar Pedido</h3>
            <div id="modal-pedido-detalle" dangerouslySetInnerHTML={{ __html: detalleHTML }} />
            <p id="modal-pedido-total">Total: ${totalOrden.toFixed(2)}</p>
            <div className="modal-actions">
              <button id="modal-cerrar" onClick={cerrarModal}>Cerrar</button>
              <button id="modal-pagar-tarjeta" onClick={handlePagoTarjeta}>Pagar con Tarjeta</button>
              <button id="modal-pagar-caja" onClick={handlePagoCaja}>Pagar en Caja</button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">☕ Café Aroma</div>
        <ul>
          <li><a href="#/">Inicio</a></li>
          <li><a href="#/tiendafisica">Tienda Física</a></li>
          <li><a href="#/pedidos">Pedidos</a></li>
        </ul>
      </nav>

      {/* Contenido */}
      <main id="menudetienda">
        <div id="resumen-orden" className="resumen-orden">
          <h3>Tu Orden:</h3>
          {Object.keys(itemsEnOrden).length === 0 ? (
            <p id="mensaje-orden-vacia">Aún no has añadido nada.</p>
          ) : (
            <ul id="lista-ordenada">
              {Object.entries(itemsEnOrden).map(([nombre, item]) => (
                <li key={nombre}>
                  {nombre}
                  <button className="menos" onClick={() => actualizarCantidad(nombre, -1)}>-</button>
                  <span>{item.cantidad}</span>
                  <button className="mas" onClick={() => actualizarCantidad(nombre, 1)}>+</button>
                  - ${ (item.precio * item.cantidad).toFixed(2) }
                  <button className="eliminar-item" onClick={() => actualizarCantidad(nombre, -item.cantidad)}>×</button>
                </li>
              ))}
            </ul>
          )}
          <p id="total-orden">Total: ${totalOrden.toFixed(2)}</p>
          <button id="realizar-pedido-final" onClick={mostrarModal}>Realizar Pedido</button>
        </div>

        <h2>Nuestro Menú</h2>
        {/* Café */}
        <section>
          <h3>Café</h3>
          <img src="https://img.icons8.com/plasticine/100/000000/coffee-to-go.png" alt="icono de café" className="icono-cafe" />
          {[
            { nombre: 'French Vanilla', precio: 3.00 },
            { nombre: 'Caramel Macchiato', precio: 3.75 },
            { nombre: 'Pumpkin Spice', precio: 3.50 },
            { nombre: 'Hazelnut', precio: 4.00 },
            { nombre: 'Mocha', precio: 4.50 },
          ].map(item => (
            <article key={item.nombre} className="item">
              <p className="flavor">{item.nombre}</p>
              <p className="price">{item.precio.toFixed(2)}</p>
              <button className="ordenar-item-btn" onClick={() => agregarItem(item.nombre, item.precio)}>
                Ordenar
              </button>
              <div className="confirmacion-pedido">Añadido</div>
            </article>
          ))}
        </section>

        {/* Postres */}
        <section>
          <h3>Postres</h3>
          <img src="https://img.icons8.com/plasticine/100/000000/cake.png" alt="icono de pastel" className="icono-postre" />
          {[
            { nombre: 'Donut', precio: 1.50 },
            { nombre: 'Cherry Pie', precio: 2.75 },
            { nombre: 'Cheesecake', precio: 3.00 },
            { nombre: 'Cinnamon Roll', precio: 2.50 },
          ].map(item => (
            <article key={item.nombre} className="item">
              <p className="dessert">{item.nombre}</p>
              <p className="price">{item.precio.toFixed(2)}</p>
              <button className="ordenar-item-btn" onClick={() => agregarItem(item.nombre, item.precio)}>
                Ordenar
              </button>
              <div className="confirmacion-pedido">Añadido</div>
            </article>
          ))}
        </section>
      </main>

      {/* Footer */}
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
