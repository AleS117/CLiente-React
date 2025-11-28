// src/component/lotes/Lotes.js
import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const LoteItem = ({ lote, onEliminar, soloLectura }) => {
  return (
    <li className="cliente">
      <div className="info-cliente">
        <p><b>ID:</b> {lote._id}</p>
        <p><b>Especie:</b> {lote.id_especie?.nombre || lote.id_especie}</p>
        <p><b>Tipo:</b> {lote.id_tipo?.nombre || lote.id_tipo}</p>
        <p><b>Kilos:</b> {lote.kilos}</p>
        <p><b>Cajas:</b> {lote.numero_cajas}</p>
        <p><b>Precio/Kg:</b> ${lote.precio_kilo}</p>
        <p><b>Fecha:</b> {new Date(lote.fecha).toLocaleDateString()}</p>
      </div>
      <div className="acciones">
        {!soloLectura && <Link to={`/admin/lotes/editar/${lote._id}`} className="btn btn-azul">Editar</Link>}
        {!soloLectura && <button className="btn btn-rojo" onClick={() => onEliminar(lote._id)}>Eliminar</button>}
      </div>
    </li>
  );
};

const Lotes = ({ soloLectura = false }) => {
  const [lotes, setLotes] = useState([]);

  const cargar = async () => {
    try {
      const resp = await clienteAxios.get("/api/lotes/consulta", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      setLotes(resp.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudieron cargar los lotes", "error");
    }
  };

  useEffect(() => { cargar(); }, []);

  const eliminar = async (id) => {
    const r = await Swal.fire({ title: "Eliminar lote?", icon: "warning", showCancelButton: true, confirmButtonText: "Sí" });
    if (r.isConfirmed) {
      try {
        await clienteAxios.delete(`/api/lotes/eliminar/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
        Swal.fire("Eliminado", "Lote eliminado", "success");
        cargar();
      } catch {
        Swal.fire("Error", "No se pudo eliminar", "error");
      }
    }
  };

  return (
    <div>
      <h2>Lotes</h2>
      {!soloLectura && <Link to="/admin/lotes/nuevo" className="btn btn-verde">+ Nuevo Lote</Link>}
      <ul className="listado-clientes">
        {lotes.length === 0 ? <p>No hay lotes registrados</p> : lotes.map(l => (
          <LoteItem key={l._id} lote={l} onEliminar={eliminar} soloLectura={soloLectura} />
        ))}
      </ul>
    </div>
  );
};

export default Lotes;
