import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const CompraItem = ({ compra, refrescar, soloLectura }) => {
  if (!compra) return null;
  const { _id, id_comprador, precio_total, fecha } = compra;

  const eliminarCompra = async () => {
    const r = await Swal.fire({
      title: "¿Eliminar compra?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
    });
    if (r.isConfirmed) {
      try {
        await clienteAxios.delete(`/api/compras/eliminar/${_id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        Swal.fire("Eliminada", "La compra fue eliminada.", "success");
        refrescar();
      } catch {
        Swal.fire("Error", "No se pudo eliminar la compra.", "error");
      }
    }
  };

  return (
    <li className="compra-item">
      <div className="info-compra">
        <p><b>ID:</b> {_id}</p>
        <p><b>Comprador:</b> {id_comprador?.nombre || "Desconocido"}</p>
        <p><b>Total:</b> {precio_total}</p>
        <p><b>Fecha:</b> {fecha ? new Date(fecha).toLocaleString() : "Sin fecha"}</p>
      </div>
      <div className="acciones">
        {!soloLectura && <button className="btn btn-rojo" onClick={eliminarCompra}>Eliminar</button>}
      </div>
    </li>
  );
};

const Compras = ({ soloLectura = false }) => {
  const [compras, setCompras] = useState([]);

  const consultarAPI = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await clienteAxios.get("/api/compras/consulta", {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setCompras(resp.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudieron cargar las compras", "error");
    }
  };

  useEffect(() => { consultarAPI(); }, []);

  return (
    <div>
      <h2>Compras</h2>
      <ul className="lista-compras">
        {compras.length === 0 ? <p>No hay compras.</p> : compras.map(c => (
          <CompraItem key={c._id} compra={c} refrescar={consultarAPI} soloLectura={soloLectura} />
        ))}
      </ul>
    </div>
  );
};

export default Compras;
