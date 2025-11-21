import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";

const ComprasDelComprador = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true); // para mostrar carga
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const comprador = JSON.parse(localStorage.getItem("comprador"));
  const token = localStorage.getItem("token"); // si tu backend usa JWT

  useEffect(() => {
    // Validar que comprador exista y tenga id
    if (!comprador || !comprador.id) {
      console.warn("No hay comprador válido en localStorage");
      navigate("/login-comprador");
      return;
    }

    const obtenerCompras = async () => {
      try {
        const respuesta = await clienteAxios.get(
          `/api/compras/por-comprador/${comprador.id}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        setCompras(respuesta.data || []);
      } catch (err) {
        console.error("Error al obtener compras:", err.response || err);
        setError(
          err.response?.data?.message ||
            "Hubo un error al obtener tus compras"
        );
      } finally {
        setLoading(false);
      }
    };

    obtenerCompras();
  }, [comprador, navigate, token]);

  if (loading) return <p>Cargando tus compras...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

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
            <p>
              <strong>Código:</strong> {compra.codigo_cpr}
            </p>
            <p>
              <strong>Kilos:</strong> {compra.kilos}
            </p>
            <p>
              <strong>Precio total:</strong> ${compra.precio_total}
            </p>
            <p>
              <strong>Fecha:</strong>{" "}
              {new Date(compra.fecha).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComprasDelComprador;
