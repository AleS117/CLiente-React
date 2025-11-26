import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";

const ComprasGeneral = () => {
  const navigate = useNavigate();

  // 🔹 Parsear comprador y token una sola vez
  const comprador = React.useMemo(() => JSON.parse(localStorage.getItem("comprador")), []);
  const token = React.useMemo(() => localStorage.getItem("token"), []);

  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // 🔹 Redirección si no hay comprador logueado
  useEffect(() => {
    if (!comprador || !comprador.id) {
      navigate("/login-comprador");
    }
  }, [comprador, navigate]);

  // 🔹 Función para obtener compras
  const obtenerCompras = useCallback(async () => {
    if (!comprador || !comprador.id) return;

    try {
      setLoading(true);
      setError(null);

      let url = `/api/compras/comprador/${comprador.id}`;

      // Filtrado por rango de fechas si están definidas
      if (fechaInicio && fechaFin) {
        url += `?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
      }

      const respuesta = await clienteAxios.get(url, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      // Ordenar por fecha descendente
      const comprasOrdenadas = respuesta.data.sort(
        (a, b) => new Date(b.fecha) - new Date(a.fecha)
      );
      setCompras(comprasOrdenadas);
    } catch (err) {
      console.error(err);
      setError("Error al obtener las compras del comprador");
    } finally {
      setLoading(false);
    }
  }, [comprador, token, fechaInicio, fechaFin]);

  // 🔹 Carga inicial y filtrado automático al cambiar fechas
  useEffect(() => {
    obtenerCompras();
  }, [obtenerCompras]);

  return (
    <div className="compras-general" style={{ maxWidth: "900px", margin: "20px auto" }}>
      <h2 style={{ textAlign: "center" }}>Mis Compras</h2>

      {/* Filtro por fechas */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label>
          Desde:{" "}
          <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
        </label>
        <label style={{ marginLeft: "10px" }}>
          Hasta:{" "}
          <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
        </label>
      </div>

      {loading && <p>Cargando compras...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && compras.length === 0 && <p>No hay compras registradas para este rango.</p>}

      {/* Lista de compras */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {compras.map((compra) => (
          <li
            key={compra._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <p><strong>Código:</strong> {compra.codigo_cpr}</p>
            {compra.kilos && <p><strong>Kilos:</strong> {compra.kilos}</p>}
            <p><strong>Precio por kilo:</strong> ${compra.precio_kilo_final}</p>
            <p><strong>Precio total:</strong> ${compra.precio_total}</p>
            <p><strong>Fecha:</strong> {new Date(compra.fecha).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button className="btn btn-azul" onClick={() => navigate("/comprador/inicio")}>
          ⬅ Regresar
        </button>
      </div>
    </div>
  );
};

export default ComprasGeneral;
