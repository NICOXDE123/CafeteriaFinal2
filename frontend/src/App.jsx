import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar.jsx';
import Home          from './pages/Home.jsx';
import TiendaFisica  from './pages/TiendaFisica.jsx';
import MenuTienda    from './pages/MenuTienda.jsx';
import Pedidos       from './pages/Pedidos.jsx';
import Pagar         from './pages/Pagar.jsx';
import SobreNosotros from './pages/SobreNosotros.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '60px' /* para que no tape el navbar fijo */ }}>
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/tiendafisica" element={<TiendaFisica />} />
          <Route path="/menu"         element={<MenuTienda />} />
          <Route path="/pedidos"      element={<Pedidos />} />
          <Route path="/pagar"        element={<Pagar />} />
          <Route path="/sobrenosotros" element={<SobreNosotros />} />
          <Route path="*"             element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
