// src/component/trabajador/TrabajadorReportes.js
import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const TrabajadorReportes = () => {
  const [fecha, setFecha] = useState("");
  const [comprador, setComprador] = useState("");
  const [compradores, setCompradores] = useState([]);
  const [compras, setCompras] = useState([]);

  const token = localStorage.getItem("token");

  // Cargar compradores
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await clienteAxios.get("/api/compradores/consulta", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompradores(res.data);
      } catch (error) {
        Swal.fire("Error", "No se pudieron cargar los compradores", "error");
      }
    };
    cargar();
  }, [token]);

  // Reporte general del día
  const generarReporteDia = async () => {
    if (!fecha) return Swal.fire("Atención", "Selecciona una fecha", "warning");

    try {
      const res = await clienteAxios.get(`/api/compras/consulta`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Filtrar solo las compras del día seleccionado
      const inicio = new Date(fecha + "T00:00:00");
      const fin = new Date(fecha + "T23:59:59");

      const filtradas = res.data.filter((c) => {
        const f = new Date(c.fecha);
        return f >= inicio && f <= fin;
      });

      setCompras(filtradas);
      if (filtradas.length === 0) Swal.fire("Sin registros", "No hay compras para esa fecha", "info");

    } catch {
      Swal.fire("Error", "No se pudo obtener el reporte", "error");
    }
  };

  // Reporte por comprador y fecha
  const generarReporteComprador = async () => {
    if (!fecha || !comprador)
      return Swal.fire("Atención", "Selecciona comprador y fecha", "warning");

    try {
      const res = await clienteAxios.get(
        `/api/compras/por-comprador/${comprador}/fecha/${fecha}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCompras(res.data);
      if (res.data.length === 0) Swal.fire("Sin registros", "No hay compras para ese criterio", "info");

    } catch {
      Swal.fire("Error", "No se pudo obtener el reporte filtrado", "error");
    }
  };

  return (
    <div>
      <h2>📄 Reportes de Ventas</h2>

      <div>
        <label>Fecha</label>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
      </div>

      <button onClick={generarReporteDia}>Reporte del Día</button>

      <hr />

      <div>
        <label>Comprador</label>
        <select value={comprador} onChange={(e) => setComprador(e.target.value)}>
          <option value="">-- Selecciona --</option>
          {compradores.map((c) => (
            <option key={c._id} value={c._id}>
              {c.nombre} {c.apellido_paterno}
            </option>
          ))}
        </select>
      </div>

      <button onClick={generarReporteComprador}>Reporte por Comprador</button>

      <hr />

      <h3>Resultados</h3>
      {compras.length === 0 ? (
        <p>No hay datos para mostrar</p>
      ) : (
        <ul>
          {compras.map((c) => (
            <li key={c._id}>
              <strong>Total:</strong> ${c.total} —{" "}
              <strong>Comprador:</strong> {c.id_comprador?.nombre ?? "N/A"} —{" "}
              <strong>Fecha:</strong> {new Date(c.fecha).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrabajadorReportes;
