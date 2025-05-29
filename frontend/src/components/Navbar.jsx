import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/tiendafisica">Tienda Física</NavLink></li>
        <li><NavLink to="/menu">Menú</NavLink></li>
        <li><NavLink to="/pedidos">Pedidos</NavLink></li>
        <li><NavLink to="/pagar">Pagar</NavLink></li>
        <li><NavLink to="/sobrenosotros">Sobre Nosotros</NavLink></li>
      </ul>
    </nav>
  );
}
