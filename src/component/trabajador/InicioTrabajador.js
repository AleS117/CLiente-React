// src/component/trabajador/InicioTrabajador.js
import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const InicioTrabajador = () => {
  const [compradores, setCompradores] = useState([]);
  const [compradorSeleccionado, setCompradorSeleccionado] = useState("");
  const [ventas, setVentas] = useState([]);
  const token = localStorage.getItem("token");

  // Cargar compradores
  useEffect(() => {
    const cargarCompradores = async () => {
      try {
        const res = await clienteAxios.get("/api/compradores/consulta", { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        setCompradores(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudieron cargar los compradores", "error");
      }
    };
    cargarCompradores();
  }, [token]);

  // Función para generar reporte
  const generarReporte = async () => {
    try {
      let url = "/api/compras/reporte-diario"; // endpoint para reporte del día
      if (compradorSeleccionado) {
        url += `?id_comprador=${compradorSeleccionado}`;
      }

      const res = await clienteAxios.get(url, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setVentas(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo generar el reporte", "error");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "20px auto" }}>
      <h2>Reporte de Ventas del Día</h2>

      <div style={{ marginBottom: 20 }}>
        <label>Filtrar por comprador:</label>
        <select 
          value={compradorSeleccionado} 
          onChange={(e) => setCompradorSeleccionado(e.target.value)}
        >
          <option value="">-- Todos --</option>
          {compradores.map(c => (
            <option key={c._id} value={c._id}>{c.nombre} {c.apellido_paterno}</option>
          ))}
        </select>
        <button className="btn btn-verde" onClick={generarReporte} style={{ marginLeft: 10 }}>
          Generar Reporte
        </button>
      </div>

      {ventas.length > 0 ? (
        <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID Compra</th>
              <th>Comprador</th>
              <th>Especie</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map(v => (
              <tr key={v._id}>
                <td>{v._id}</td>
                <td>{v.comprador?.nombre} {v.comprador?.apellido_paterno}</td>
                <td>{v.especie?.nombre}</td>
                <td>{v.cantidad}</td>
                <td>${v.precio_unitario.toFixed(2)}</td>
                <td>${(v.cantidad * v.precio_unitario).toFixed(2)}</td>
                <td>{new Date(v.fecha).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay ventas registradas.</p>
      )}
    </div>
  );
};

export default InicioTrabajador;
