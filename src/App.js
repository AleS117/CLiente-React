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
import ComprasGeneral from "./component/comprador/ComprasGeneral.js";
import CalendarioComprador from "./component/comprador/CalendarioComprador.js";

// Vistas admin
import Administradores from "./component/administrador/Administradores.js";
import Compradores from "./component/comprador/Compradores.js";
import Compras from "./component/compras/Compras.js";
import Especies from "./component/especies/Especies.js"; // Lista completa
import EspecieForm from "./component/especies/EspecieForm.js"; // Formulario agregar/editar
import Lotes from "./component/lotes/Lotes.js";
import Tipos from "./component/tipo/Tipos.js"; // Lista completa
import TipoForm from "./component/tipo/TipoForm.js"; // Formulario agregar/editar

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
          <Route path="administradores/nuevo" element={<Administradores />} /> {/* o formulario de creación */}
          <Route path="administradores/editar/:id" element={<Administradores />} /> {/* edición */}
          
          <Route path="compradores" element={<Compradores />} />
          <Route path="compras" element={<Compras />} />

          {/* Especies */}
          <Route path="especies" element={<Especies />} /> {/* lista */}
          <Route path="especies/nuevo" element={<EspecieForm />} /> {/* crear */}
          <Route path="especies/editar/:id" element={<EspecieForm />} /> {/* editar */}

          {/* Tipos */}
          <Route path="tipos" element={<Tipos />} /> {/* lista */}
          <Route path="tipos/nuevo" element={<TipoForm />} /> {/* crear */}
          <Route path="tipos/editar/:id" element={<TipoForm />} /> {/* editar */}

          <Route path="lotes" element={<Lotes />} />
        </Route>

        {/* 🔵 RUTAS COMPRADOR */}
        <Route path="/comprador" element={<CompradorLayout />}>
          <Route path="inicio" element={<InicioComprador />} />
          <Route path="compras" element={<ComprasGeneral />} />
          <Route path="calendario" element={<CalendarioComprador />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
