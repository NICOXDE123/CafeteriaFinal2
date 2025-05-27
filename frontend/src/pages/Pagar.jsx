// src/pages/Pagar.jsx

import React, { useState } from 'react';
import '../assets/styles.css';

export default function Pagar() {
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');
  const [cvv, setCvv] = useState('');

  const simularPago = () => {
    alert('¡Pago simulado exitoso!');
    window.location.hash = '#/menu';
  };

  return (
    <div className="container pagar-container">
      <h2>Tarjeta de crédito o débito</h2>
      <div className="form-group">
        <label htmlFor="nombre">Nombre del titular</label>
        <input
          type="text"
          id="nombre"
          placeholder="Como aparece en la tarjeta"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="numero">Número de tarjeta</label>
        <input
          type="text"
          id="numero"
          placeholder="Número de tarjeta"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
      </div>
      <div className="form-group expiration">
        <div>
          <label htmlFor="mes">Fecha de expiración (Mes)</label>
          <input
            type="number"
            id="mes"
            placeholder="MM"
            min="1"
            max="12"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="anio">Año</label>
          <input
            type="number"
            id="anio"
            placeholder="AAAA"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="cvv">Código de seguridad</label>
        <input
          type="number"
          id="cvv"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
      </div>
      <button onClick={simularPago}>Pagar</button>
    </div>
  );
}
