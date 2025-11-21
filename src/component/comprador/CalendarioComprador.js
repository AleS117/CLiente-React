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

  // 🔹 Redirección segura
  useEffect(() => {
    if (!comprador || !comprador.id) {
      navigate("/login-comprador");
    }
  }, [comprador, navigate]);

  const handleConfirmar = async () => {
    if (!fecha) {
      alert("Por favor, selecciona una fecha");
      return;
    }

    const fechaFormateada = fecha.toISOString().split("T")[0]; // yyyy-mm-dd
    setLoading(true);
    setError(null);

    try {
      const respuesta = await clienteAxios.get(
        `/api/compras/por-comprador/${comprador.id}/fecha/${fechaFormateada}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      setCompras(respuesta.data || []);
    } catch (err) {
      console.error(err.response || err);
      setError("Error al obtener las compras de esa fecha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calendario-comprador" style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Selecciona una fecha</h2>

      <div style={{ display: "inline-block", marginTop: "20px" }}>
        <Calendar
          onChange={setFecha}
          value={fecha}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button className="btn btn-verde" onClick={handleConfirmar}>
          Confirmar
        </button>

        <button
          className="btn btn-azul"
          style={{ marginLeft: "10px" }}
          onClick={() => navigate("/comprador/inicio")}
        >
          ⬅ Regresar
        </button>
      </div>

      <div style={{ marginTop: "30px", textAlign: "left", maxWidth: "600px", margin: "30px auto" }}>
        <h3>Compras de la fecha seleccionada:</h3>

        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {compras.length === 0 && !loading && <p>No hay compras registradas para esta fecha.</p>}

        <ul>
          {compras.map((compra) => (
            <li key={compra._id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
              <p><strong>Código:</strong> {compra.codigo_cpr}</p>
              <p><strong>Kilos:</strong> {compra.kilos}</p>
              <p><strong>Precio total:</strong> ${compra.precio_total}</p>
              <p><strong>Fecha:</strong> {new Date(compra.fecha).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarioComprador;
