// src/component/layout/TrabajadorLayout.js
import React from "react";
import { Outlet } from "react-router-dom";

import Administradores from "../administrador/Administradores";
import Especies from "../especies/Especies";
import Tipos from "../tipos/Tipos";
import Lotes from "../lotes/Lotes";
import Compradores from "../compradores/Compradores";
import ReporteVentasDia from "../trabajador/ReporteVentasDia";

const TrabajadorLayout = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Panel del Trabajador</h1>

      {/* 🟦 Reporte diario */}
      <section>
        <ReporteVentasDia />
      </section>

      <hr />

      <section>
        <h2>Administradores</h2>
        <Administradores soloLectura={true} />
      </section>

      <section>
        <h2>Especies</h2>
        <Especies soloLectura={false} />
      </section>

      <section>
        <h2>Tipos</h2>
        <Tipos soloLectura={false} />
      </section>

      <section>
        <h2>Lotes</h2>
        <Lotes soloLectura={false} />
      </section>

      <section>
        <h2>Compradores</h2>
        <Compradores soloLectura={false} />
      </section>

      <Outlet />
    </div>
  );
};

export default TrabajadorLayout;
