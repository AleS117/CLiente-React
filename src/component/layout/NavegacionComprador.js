import React from "react";
import { NavLink } from "react-router-dom";

const NavegacionComprador = () => {
  return (
    <aside className="sidebar-comprador">
      <h3>Mi Panel</h3>

      <nav>
        <NavLink to="/comprador/inicio" className="link-comprador">
          Inicio
        </NavLink>

        <NavLink to="/comprador/compras" className="link-comprador">
          Mis Compras
        </NavLink>

        <NavLink to="/comprador/calendario" className="link-comprador">
          Calendario
        </NavLink>
      </nav>
    </aside>
  );
};

export default NavegacionComprador;
