// src/component/layout/TrabajadorLayout.js
import React from "react";
import { Link, Outlet } from "react-router-dom";

const TrabajadorLayout = () => {
  return (
    <div className="admin-layout" style={{ display: "flex" }}>
      <aside className="sidebar col-3">
        <h2>Trabajador</h2>
        <nav className="navegacion">
          <Link to="/trabajador/inicio">Inicio</Link>
          <Link to="/trabajador/especies">Especies</Link>
          <Link to="/trabajador/tipos">Tipos</Link>
          <Link to="/trabajador/lotes">Lotes</Link>
          <Link to="/trabajador/compradores">Compradores</Link>
          <Link to="/trabajador/compras">Compras</Link>
        </nav>
      </aside>

      <main className="contenido-principal col-9" style={{ padding: "20px", flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default TrabajadorLayout;
