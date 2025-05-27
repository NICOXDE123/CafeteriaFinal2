import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export function Navbar() {
  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
        Home
      </NavLink>
      <NavLink to="/tiendafisica" className={({ isActive }) => isActive ? 'active' : ''}>
        Tienda Física
      </NavLink>
      <NavLink to="/sobrenosotros" className={({ isActive }) => isActive ? 'active' : ''}>
        Sobre Nosotros
      </NavLink>
      <NavLink to="/pedidos" className={({ isActive }) => isActive ? 'active' : ''}>
        Pedidos
      </NavLink>
      <NavLink to="/pagar" className={({ isActive }) => isActive ? 'active' : ''}>
        Pagar
      </NavLink>
      <NavLink to="/menu" className={({ isActive }) => isActive ? 'active' : ''}>
        Menú
      </NavLink>
    </nav>
  );
}