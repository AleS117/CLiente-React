import React from "react";
import { Outlet } from "react-router-dom";
import NavegacionComprador from "./NavegacionComprador";

const CompradorLayout = () => {
  return (
    <div className="grid contenedor contenido-principal">

      {/* Menú lateral comprador */}
      <NavegacionComprador />

      {/* Contenido dinámico */}
      <main className="caja-contenido col-9">
        <Outlet />
      </main>

    </div>
  );
};

export default CompradorLayout;
