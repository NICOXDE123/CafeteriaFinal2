// frontend/src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/tiendafisica" className={({ isActive }) => isActive ? 'active' : ''}>
            Tienda Física
          </NavLink>
        </li>
        <li>
          <NavLink to="/sobrenosotros" className={({ isActive }) => isActive ? 'active' : ''}>
            Sobre Nosotros
          </NavLink>
        </li>
        <li>
          <NavLink to="/pedidos" className={({ isActive }) => isActive ? 'active' : ''}>
            Pedidos
          </NavLink>
        </li>
        <li>
          <NavLink to="/pagar" className={({ isActive }) => isActive ? 'active' : ''}>
            Pagar
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu" className={({ isActive }) => isActive ? 'active' : ''}>
            Menú
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}