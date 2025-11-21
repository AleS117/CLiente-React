import React from "react";
import { useNavigate } from "react-router-dom";

const InicioComprador = () => {
  const navigate = useNavigate();

  return (
    <div className="inicio-comprador">
      <h2>Bienvenido Comprador</h2>

      <button
        className="btn btn-verde"
        onClick={() => navigate("/comprador/compras")}
      >
        Ver mis compras
      </button>

      <button
        className="btn btn-azul"
        onClick={() => navigate("/comprador/calendario")}
      >
        Ver Calendario
      </button>
    </div>
  );
};

export default InicioComprador;
