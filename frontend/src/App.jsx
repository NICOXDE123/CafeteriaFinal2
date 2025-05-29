import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import TiendaFisica from "./pages/TiendaFisica";
import MenuTienda from "./pages/MenuTienda";
import Pedidos from "./pages/Pedidos";
import Pagar from "./pages/Pagar";
import SobreNosotros from "./pages/SobreNosotros";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tiendafisica" element={<TiendaFisica />} />
          <Route path="/menu" element={<MenuTienda />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pagar" element={<Pagar />} />
          <Route path="/sobrenosotros" element={<SobreNosotros />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
