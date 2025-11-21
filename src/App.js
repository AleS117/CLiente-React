import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Inicio general
import Inicio from "./component/inicio/Inicio.js";

// Logins
import LoginAdmin from "./component/Login/LoginAdmin.js";
import LoginComprador from "./component/Login/LoginComprador.js";

// Layouts
import AdminLayout from "./component/layout/Navegacion.js";
import CompradorLayout from "./component/layout/CompradorLayout.js";

// Vistas comprador
import InicioComprador from "./component/comprador/InicioComprador.js";
import ComprasDelComprador from "./component/comprador/ComprasDelComprador.js";
import CalendarioComprador from "./component/comprador/CalendarioComprador.js"; // si aún no existe, te lo hago

// Vistas admin
import Administradores from "./component/administrador/Administradores.js";
import Compradores from "./component/comprador/Compradores.js";
import Compras from "./component/compras/Compras.js";
import Especies from "./component/especies/Especie.js";
import Lotes from "./component/lotes/Lotes.js";
import Tipos from "./component/tipo/Tipo.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Pantalla inicial */}
        <Route path="/" element={<Inicio />} />

        {/* Logins */}
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/login-comprador" element={<LoginComprador />} />

        {/* 🔴 RUTAS ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="administradores" element={<Administradores />} />
          <Route path="compradores" element={<Compradores />} />
          <Route path="compras" element={<Compras />} />
          <Route path="especies" element={<Especies />} />
          <Route path="lotes" element={<Lotes />} />
          <Route path="tipos" element={<Tipos />} />
        </Route>

        {/* 🔵 RUTAS COMPRADOR */}
        <Route path="/comprador" element={<CompradorLayout />}>
          <Route path="inicio" element={<InicioComprador />} />
          <Route path="compras" element={<ComprasDelComprador />} />
          <Route path="calendario" element={<CalendarioComprador />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
