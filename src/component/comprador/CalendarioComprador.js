import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import clienteAxios from "../../config/axios";

const CalendarioComprador = () => {
  const [fecha, setFecha] = useState(new Date());
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const comprador = JSON.parse(localStorage.getItem("comprador"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!comprador?.id) navigate("/login-comprador");
  }, [comprador, navigate]);

  const handleConfirmar = async () => {
    if (!fecha) return alert("Selecciona una fecha");

    const fechaFormateada = fecha.toISOString().split("T")[0];
    setLoading(true);
    setError(null);

    try {
      const resp = await clienteAxios.get(
        `/api/compras/por-comprador/${comprador.id}/fecha/${fechaFormateada}`,
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );
      setCompras(resp.data || []);
    } catch (err) {
      console.error(err);
      setError("Error al obtener las compras de esa fecha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Selecciona una fecha</h2>
      <Calendar onChange={setFecha} value={fecha} />
      <div style={{ marginTop: "20px" }}>
        <button className="btn btn-verde" onClick={handleConfirmar}>Confirmar</button>
        <button className="btn btn-azul" onClick={() => navigate("/comprador/inicio")} style={{ marginLeft: "10px" }}>⬅ Regresar</button>
      </div>

      <div style={{ marginTop: "30px", maxWidth: "600px", margin: "30px auto", textAlign: "left" }}>
        <h3>Compras de la fecha seleccionada:</h3>
        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {compras.length === 0 && !loading && <p>No hay compras registradas para esta fecha.</p>}
        <ul>
          {compras.map(c => (
            <li key={c._id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
              <p><strong>Código:</strong> {c.codigo_cpr}</p>
              <p><strong>Precio por kilo:</strong> ${c.precio_kilo_final}</p>
              <p><strong>Precio total:</strong> ${c.precio_total}</p>
              <p><strong>Fecha:</strong> {new Date(c.fecha).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarioComprador;
