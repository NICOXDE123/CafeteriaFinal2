// frontend/src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/styles.css";

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">☕ Café Aroma</div>
      <ul className="nav-list">
        <li>
          <NavLink to="/">Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/menu">Menú</NavLink>
        </li>
        <li>
          <NavLink to="/tiendafisica">Tienda Física</NavLink>
        </li>
        <li>
          <NavLink to="/sobrenosotros">Sobre Nosotros</NavLink>
        </li>
      </ul>
    </nav>
  );
}
