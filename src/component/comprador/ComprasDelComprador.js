import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";

const ComprasDelComprador = () => {
  const [compras, setCompras] = useState([]);
  const navigate = useNavigate();

  const comprador = JSON.parse(localStorage.getItem("comprador"));

  useEffect(() => {
    if (!comprador) {
      navigate("/");
      return;
    }

    const obtenerCompras = async () => {
      try {
        const respuesta = await clienteAxios.get(
          `/api/compras/por-comprador/${comprador.id}`
        );
        setCompras(respuesta.data);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerCompras();
  }, []);

  return (
    <div className="contenido">
      <h2>Mis Compras</h2>

      <button
        className="btn btn-azul"
        onClick={() => navigate("/comprador/inicio")}
      >
        ⬅ Regresar
      </button>

      <ul className="listado-compras">
        {compras.length === 0 && <p>No tienes compras registradas.</p>}

        {compras.map((compra) => (
          <li key={compra._id} className="compra">
            <p><strong>Código:</strong> {compra.codigo_cpr}</p>
            <p><strong>Kilos:</strong> {compra.kilos}</p>
            <p><strong>Precio total:</strong> ${compra.precio_total}</p>
            <p><strong>Fecha:</strong> {new Date(compra.fecha).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComprasDelComprador;
