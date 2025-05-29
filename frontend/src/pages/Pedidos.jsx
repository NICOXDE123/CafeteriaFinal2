import React, { useEffect, useState } from 'react';
import { useCanister } from '@connect2ic/react';
import { NavLink } from 'react-router-dom';
import '../assets/styles.css';

export default function Pedidos() {
  const [cafeteria] = useCanister('cafeteria');
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    if (cafeteria) {
      cafeteria.listarPedidos()
        .then((list) => setPedidos(list))
        .catch(console.error);
    }
  }, [cafeteria]);

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
        {pedidos.length === 0 ? (
          <p>No hay pedidos en el canister.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio (centavos)</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((item) => (
                <tr key={item.id.toString()}>
                  <td>{item.id.toString()}</td>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad.toString()}</td>
                  <td>{item.precio.toString()}</td>
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
