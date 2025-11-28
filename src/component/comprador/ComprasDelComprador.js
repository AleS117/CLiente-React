import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";

const ComprasDelComprador = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const comprador = JSON.parse(localStorage.getItem("comprador"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!comprador?.id) return navigate("/login-comprador");

    const obtenerCompras = async () => {
      try {
        const resp = await clienteAxios.get(`/api/compras/por-comprador/${comprador.id}`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" }
        });
        setCompras(resp.data || []);
      } catch (err) {
        console.error(err);
        setError("Error al obtener tus compras");
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
      <button className="btn btn-azul" onClick={() => navigate("/comprador/inicio")}>⬅ Regresar</button>
      <ul className="listado-compras">
        {compras.length === 0 && <p>No tienes compras registradas.</p>}
        {compras.map(c => (
          <li key={c._id} className="compra">
            <p><strong>Código:</strong> {c.codigo_cpr}</p>
            <p><strong>Precio por kilo:</strong> ${c.precio_kilo_final}</p>
            <p><strong>Precio total:</strong> ${c.precio_total}</p>
            <p><strong>Fecha:</strong> {new Date(c.fecha).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComprasDelComprador;
