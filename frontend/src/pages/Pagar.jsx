import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles.css';

export default function Pagar() {
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');
  const [cvv, setCvv] = useState('');

  const simularPago = () => {
    alert('¡Pago simulado exitoso!');
    // vuelve al menú
    window.location.href = '/menu';
  };

  return (
    <div className="pagar-container seccion-blanca">
      <nav className="navbar">
        <div className="logo">☕ Café Aroma</div>
        <ul>
          <li><NavLink to="/">Inicio</NavLink></li>
          <li><NavLink to="/menu">Menú</NavLink></li>
        </ul>
      </nav>

      <main className="contenedor">
        <h2>Tarjeta de crédito o débito</h2>
        <div className="formulario">
          <label>Nombre del titular</label>
          <input
            type="text"
            placeholder="Como aparece en la tarjeta"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <label>Número de tarjeta</label>
          <input
            type="text"
            placeholder="Número de tarjeta"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
          <div className="form-group expiration">
            <div>
              <label>Mes (MM)</label>
              <input
                type="number"
                min="1"
                max="12"
                value={mes}
                onChange={(e) => setMes(e.target.value)}
              />
            </div>
            <div>
              <label>Año (AAAA)</label>
              <input
                type="number"
                value={anio}
                onChange={(e) => setAnio(e.target.value)}
              />
            </div>
          </div>
          <label>CVV</label>
          <input
            type="number"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
          <button onClick={simularPago}>Pagar</button>
        </div>
      </main>

      <footer>
        <p>© 2025 Café Aroma. Todos los derechos reservados.</p>
      </footer>
    </div>
);
}
