// src/pages/Pedidos.jsx

import React, { useState } from 'react';
import '../assets/styles.css';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [detalles, setDetalles] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoPedido = { nombre, email, detalles };
    setPedidos((prev) => [...prev, nuevoPedido]);
    setNombre('');
    setEmail('');
    setDetalles('');
  };

  return (
    <div className="pedidos-container seccion-blanca">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">☕ Café Aroma</div>
        <ul>
          <li><a href="#/">Inicio</a></li>
          <li><a href="#/tiendafisica">Tienda Física</a></li>
        </ul>
      </nav>

      {/* Contenido Pedidos */}
      <main className="seccion-blanca">
        <div className="contenedor">
          <h2>Realiza tu Pedido</h2>
          <p>Aquí puedes ver los artículos que has seleccionado:</p>

          <div id="lista-de-pedidos">
            {pedidos.length === 0 ? (
              <p id="mensaje-pedido-vacio">Aún no has añadido nada a tu pedido.</p>
            ) : (
              <ul>
                {pedidos.map((p, i) => (
                  <li key={i}>{`${p.nombre} - ${p.email} - ${p.detalles}`}</li>
                ))}
              </ul>
            )}
          </div>

          <h3>Información Adicional</h3>
          <form id="formulario-pedido" onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <br /><br />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br /><br />

            <label htmlFor="detalles">Detalles Adicionales (opcional):</label><br />
            <textarea
              id="detalles"
              name="detalles"
              value={detalles}
              onChange={(e) => setDetalles(e.target.value)}
            />
            <br /><br />

            <button type="submit">Enviar Pedido</button>
          </form>
        </div>
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
