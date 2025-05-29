import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCanister } from '@connect2ic/react';
import '../assets/styles.css';

export default function MenuTienda() {
  const navigate = useNavigate();
  const [cafeteria] = useCanister('cafeteria');

  const [itemsEnOrden, setItemsEnOrden] = useState({});
  const [totalOrden, setTotalOrden] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [detalleHTML, setDetalleHTML] = useState('');

  useEffect(() => {
    let total = 0;
    Object.values(itemsEnOrden).forEach(item => {
      total += item.precio * item.cantidad;
    });
    setTotalOrden(total);
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

  const mostrarModal = () => {
    const detalle = Object.entries(itemsEnOrden)
      .map(
        ([nombre, item]) =>
          `<li>${nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}</li>`
      )
      .join('');
    setDetalleHTML(`<ul>${detalle}</ul>`);
    setModalVisible(true);
  };

  const cerrarModal = () => setModalVisible(false);

  const handlePagoTarjeta = () => navigate('/pagar');

  const handlePagoCaja = async () => {
    // Grabar en canister: un call por cada item
    if (cafeteria) {
      for (const [nombre, item] of Object.entries(itemsEnOrden)) {
        // convertir precio a centavos para el canister
        const precioCentavos = BigInt(Math.round(item.precio * 100));
        await cafeteria.agregarPedido(nombre, BigInt(item.cantidad), precioCentavos);
      }
    }
    alert(`Pedido registrado. Paga $${totalOrden.toFixed(2)} en caja.`);
    setItemsEnOrden({});
    setModalVisible(false);
  };

  return (
    <div className="menu-tienda-container seccion-blanca">
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmar Pedido</h3>
            <div dangerouslySetInnerHTML={{ __html: detalleHTML }} />
            <p>Total: ${totalOrden.toFixed(2)}</p>
            <div className="modal-actions">
              <button onClick={cerrarModal}>Cerrar</button>
              <button onClick={handlePagoTarjeta}>Pagar con Tarjeta</button>
              <button onClick={handlePagoCaja}>Pagar en Caja</button>
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
          {Object.keys(itemsEnOrden).length === 0 ? (
            <p>Aún no has añadido nada.</p>
          ) : (
            <ul>
              {Object.entries(itemsEnOrden).map(([nombre, item]) => (
                <li key={nombre}>
                  {nombre}
                  <button onClick={() => actualizarCantidad(nombre, -1)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => actualizarCantidad(nombre, 1)}>+</button>
                  - ${ (item.precio * item.cantidad).toFixed(2) }
                  <button onClick={() => actualizarCantidad(nombre, -item.cantidad)}>×</button>
                </li>
              ))}
            </ul>
          )}
          <p>Total: ${totalOrden.toFixed(2)}</p>
          <button onClick={mostrarModal}>Realizar Pedido</button>
        </div>

        <h2>Nuestro Menú</h2>
        {/* … mapea aquí tus ítems de café y postres … */}
      </main>

      <footer>
        <p>© 2025 Café Aroma. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
