import React from "react";
import { useNavigate } from "react-router-dom";

const InicioComprador = () => {
  const navigate = useNavigate();

  return (
    <div className="inicio-comprador">
      <h2>Bienvenido Comprador</h2>

      <button
        className="btn btn-verde"
        onClick={() => navigate("/comprador/lotes")}
      >
        Ver Lotes Disponibles
      </button>

      <button
        className="btn btn-verde"
        onClick={() => navigate("/comprador/compras")}
        style={{ marginTop: "10px" }}
      >
        Ver mis compras
      </button>

      <button
        className="btn btn-amarillo"
        onClick={() => navigate("/comprador/carrito")}
        style={{ marginTop: "10px" }}
      >
        Ver Carrito 🛒
      </button>

      <button
        className="btn btn-azul"
        onClick={() => navigate("/comprador/calendario")}
        style={{ marginTop: "10px" }}
      >
        Ver Calendario
      </button>

      <button
        className="btn btn-gris"
        onClick={() => navigate("/")}
        style={{ marginTop: "10px" }}
      >
        Ir al Inicio
      </button>
    </div>
  );
};

export default InicioComprador;
