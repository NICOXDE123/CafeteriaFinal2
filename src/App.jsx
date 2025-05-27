import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import TiendaFisica from './pages/TiendaFisica';
import SobreNosotros from './pages/SobreNosotros';
import Pedidos from './pages/Pedidos';
import Pagar from './pages/Pagar';
import MenuTienda from './pages/MenuTienda';
import { Navbar } from './components/Navbar';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tiendafisica" element={<TiendaFisica />} />
          <Route path="/sobrenosotros" element={<SobreNosotros />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pagar" element={<Pagar />} />
          <Route path="/menu" element={<MenuTienda />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}