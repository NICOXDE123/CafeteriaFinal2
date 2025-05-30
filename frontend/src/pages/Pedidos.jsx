import React, { useEffect, useState } from 'react';
import { cafeteria } from '../actors.js';
import { NavLink } from 'react-router-dom';
import '../assets/styles.css';

export default function Pedidos() {
  const [list, setList] = useState([]);

  useEffect(() => {
    cafeteria.listarPedidos()
      .then(setList)
      .catch(console.error);
  }, []);

  return (
    <div className="pedidos-list-container seccion-blanca">
      <nav className="navbar">
        <div className="logo">☕ Café Aroma</div>
        <ul>
          <li><NavLink to="/">Inicio</NavLink></li>
          <li><NavLink to="/menu">Menú</NavLink></li>
        </ul>
      </nav>
      <main className="contenedor">
        <h2>Pedidos Registrados</h2>
        {list.length === 0
          ? <p>No hay pedidos aún.</p>
          : (
            <table>
              <thead>
                <tr><th>ID</th><th>Nombre</th><th>Cantidad</th><th>Precio (¢)</th></tr>
              </thead>
              <tbody>
                {list.map(p=>(
                  <tr key={p.id.toString()}>
                    <td>{p.id.toString()}</td>
                    <td>{p.nombre}</td>
                    <td>{p.cantidad.toString()}</td>
                    <td>{p.precio.toString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </main>
      <footer>
        <p>© 2025 Café Aroma. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
