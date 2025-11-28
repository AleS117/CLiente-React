import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navegacion = () => {
  return (
    <div className="admin-layout" style={{ display: "flex" }}>
      {/* Sidebar */}
      <aside className="sidebar col-3">
        <h2>Administración</h2>

        <nav className="navegacion">

          {/* Reportes */}
          <h3 style={{ marginTop: "20px" }}>Reportes</h3>
          <Link to="/admin/reporte-dia">Reporte de ventas del día</Link>

          {/* Gestión */}
          <h3 style={{ marginTop: "20px" }}>Gestión</h3>
          <Link to="/admin/administradores">Administradores</Link>
          <Link to="/admin/compradores">Compradores</Link>
          <Link to="/admin/compras">Compras</Link>
          <Link to="/admin/especies">Especies</Link>
          <Link to="/admin/lotes">Lotes</Link>
          <Link to="/admin/tipos">Tipos</Link>

        </nav>
      </aside>

      {/* Contenido principal */}
      <main
        className="contenido-principal col-9"
        style={{ padding: "20px", flex: 1 }}
      >
        <Outlet /> {/* 🔹 Aquí se renderizan las rutas hijas */}
      </main>
    </div>
  );
};

export default Navegacion;
