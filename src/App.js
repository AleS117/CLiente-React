import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Login unificado
import Login from "./component/Login/Login.js";

// Layouts
import AdminLayout from "./component/layout/Navegacion.js";
import CompradorLayout from "./component/layout/CompradorLayout.js";

// Vistas comprador
import InicioComprador from "./component/comprador/InicioComprador.js";
import ComprasGeneral from "./component/comprador/ComprasGeneral.js";
import CalendarioComprador from "./component/comprador/CalendarioComprador.js";
import CarritoPage from "./component/carrito/carritoPage.js";
import LotesParaComprar from "./component/comprador/LotesParaComprar.js";

// Vistas admin
import Administradores from "./component/administrador/Administradores.js";
import Compradores from "./component/comprador/Compradores.js";
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
        {/* Página principal ahora es Login */}
        <Route path="/" element={<Login />} />

        {/* 🔴 RUTAS ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="administradores" element={<Administradores />} />
          <Route path="administradores/nuevo" element={<Administradores />} />
          <Route path="administradores/editar/:id" element={<Administradores />} />

          <Route path="compradores" element={<Compradores />} />
          <Route path="compras" element={<Compras />} />

          <Route path="especies" element={<Especies />} />
          <Route path="especies/nuevo" element={<EspecieForm />} />
          <Route path="especies/editar/:id" element={<EspecieForm />} />

          <Route path="tipos" element={<Tipos />} />
          <Route path="tipos/nuevo" element={<TipoForm />} />
          <Route path="tipos/editar/:id" element={<TipoForm />} />

          <Route path="lotes" element={<Lotes />} />
          <Route path="lotes/nuevo" element={<LoteForm />} />
        </Route>

        {/* 🔵 RUTAS COMPRADOR */}
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
