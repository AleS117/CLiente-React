import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";

const ComprasGeneral = () => {
  const navigate = useNavigate();
  const comprador = React.useMemo(() => JSON.parse(localStorage.getItem("comprador")), []);
  const token = React.useMemo(() => localStorage.getItem("token"), []);

  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // Redirigir si no hay comprador logueado
  useEffect(() => {
    if (!comprador?.id) navigate("/login-comprador");
  }, [comprador, navigate]);

  // Función para obtener compras
  const obtenerCompras = useCallback(async () => {
    if (!comprador?.id) return;

    try {
      setLoading(true);
      setError(null);

      // Construir URL
      let url = `/api/compras/comprador/${comprador.id}`;
      if (fechaInicio && fechaFin) {
        url += `?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
      }

      const resp = await clienteAxios.get(url, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      // Ordenar por fecha descendente
      setCompras(resp.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)));
    } catch (err) {
      console.error(err.response || err);
      setError("Error al obtener las compras del comprador");
    } finally {
      setLoading(false);
    }
  }, [comprador, token, fechaInicio, fechaFin]);

  // Cargar compras al montar y al cambiar fechas
  useEffect(() => { obtenerCompras(); }, [obtenerCompras]);

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto" }}>
      <h2 style={{ textAlign: "center" }}>Mis Compras</h2>

      {/* Filtro por rango de fechas */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label>
          Desde:{" "}
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: "10px" }}>
          Hasta:{" "}
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </label>
        <button
          className="btn btn-verde"
          style={{ marginLeft: "10px" }}
          onClick={obtenerCompras}
        >
          Filtrar
        </button>
      </div>

      {loading && <p>Cargando compras...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && compras.length === 0 && <p>No hay compras registradas para este rango.</p>}

      {/* Lista de compras */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {compras.map((c) => (
          <li
            key={c._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <p><strong>Código:</strong> {c.codigo_cpr}</p>
            {c.kilos && <p><strong>Kilos:</strong> {c.kilos}</p>}
            <p><strong>Precio por kilo:</strong> ${c.precio_kilo_final}</p>
            <p><strong>Precio total:</strong> ${c.precio_total}</p>
            <p><strong>Fecha:</strong> {new Date(c.fecha).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          className="btn btn-azul"
          onClick={() => navigate("/comprador/inicio")}
        >
          ⬅ Regresar
        </button>
      </div>
    </div>
  );
};

export default ComprasGeneral;
