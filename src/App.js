// src/App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Login unificado
import Login from "./component/Login/Login.js";

// Layouts
import AdminLayout from "./component/layout/Navegacion.js";
import TrabajadorLayout from "./component/layout/TrabajadorLayout.js";
import CompradorLayout from "./component/layout/CompradorLayout.js";

// Vistas Comprador
import InicioComprador from "./component/comprador/InicioComprador.js";
import ComprasGeneral from "./component/comprador/ComprasGeneral.js";
import CalendarioComprador from "./component/comprador/CalendarioComprador.js";
import CarritoPage from "./component/carrito/carritoPage.js";
import LotesParaComprar from "./component/comprador/LotesParaComprar.js";

// Vistas Admin / Trabajador
import Administradores from "./component/administrador/Administradores.js";
import AdministradorForm from "./component/administrador/AdministradorForm.js";
import Compradores from "./component/comprador/Compradores.js";
import CompradorForm from "./component/comprador/CompradorForm.js";
import Compras from "./component/compras/Compras.js";
import Especies from "./component/especies/Especies.js";
import EspecieForm from "./component/especies/EspecieForm.js";
import Lotes from "./component/lotes/Lotes.js";
import LoteForm from "./component/lotes/LoteForm.js";
import Tipos from "./component/tipo/Tipos.js";
import TipoForm from "./component/tipo/TipoForm.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal: Login */}
        <Route path="/" element={<Login />} />

        {/* 🔴 Rutas Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Administradores */}
          <Route path="administradores" element={<Administradores />} />
          <Route path="administradores/nuevo" element={<AdministradorForm />} />
          <Route path="administradores/editar/:id" element={<AdministradorForm />} />

          {/* Compradores */}
          <Route path="compradores" element={<Compradores />} />
          <Route path="compradores/nuevo" element={<CompradorForm />} />
          <Route path="compradores/editar/:id" element={<CompradorForm />} />

          {/* Compras */}
          <Route path="compras" element={<Compras />} />

          {/* Especies */}
          <Route path="especies" element={<Especies />} />
          <Route path="especies/nuevo" element={<EspecieForm />} />
          <Route path="especies/editar/:id" element={<EspecieForm />} />

          {/* Tipos */}
          <Route path="tipos" element={<Tipos />} />
          <Route path="tipos/nuevo" element={<TipoForm />} />
          <Route path="tipos/editar/:id" element={<TipoForm />} />

          {/* Lotes */}
          <Route path="lotes" element={<Lotes />} />
          <Route path="lotes/nuevo" element={<LoteForm />} />
        </Route>

        {/* 🔵 Rutas Trabajador (solo lectura) */}
        <Route path="/trabajador" element={<TrabajadorLayout />}>
          <Route path="inicio" element={<Especies soloLectura={true} />} />
          <Route path="especies" element={<Especies soloLectura={true} />} />
          <Route path="tipos" element={<Tipos soloLectura={true} />} />
          <Route path="lotes" element={<Lotes soloLectura={true} />} />
          <Route path="compradores" element={<Compradores soloLectura={true} />} />
          <Route path="compras" element={<Compras soloLectura={true} />} />
        </Route>

        {/* 🔵 Rutas Comprador */}
        <Route path="/comprador" element={<CompradorLayout />}>
          <Route path="inicio" element={<InicioComprador />} />
          <Route path="compras" element={<ComprasGeneral />} />
          <Route path="calendario" element={<CalendarioComprador />} />
          <Route path="carrito" element={<CarritoPage />} />
          <Route path="lotes" element={<LotesParaComprar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
