import React from "react";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const navigate = useNavigate();

  return (
    <div className="inicio-container">

      <h2>Selecciona tu tipo de usuario</h2>

      <div className="btn-contenedor">
        <button 
          className="btn btn-azul"
          onClick={() => navigate("/login-admin")}
        >
          Administrador
        </button>

        <button 
          className="btn btn-verde"
          onClick={() => navigate("/login-comprador")}
        >
          Comprador
        </button>
      </div>

    </div>
  );
};

export default Inicio;
