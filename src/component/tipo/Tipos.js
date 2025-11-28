// src/component/tipo/Tipos.js
import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const TipoItem = ({ tipo, refrescar, soloLectura }) => {
  if (!tipo) return null;
  const { _id, nombre } = tipo;

  const eliminarTipo = async () => {
    const r = await Swal.fire({
      title: "¿Eliminar tipo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
    });
    if (r.isConfirmed) {
      try {
        await clienteAxios.delete(`/api/tipos/eliminar/${_id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        Swal.fire("Eliminado", "El tipo fue eliminado.", "success");
        refrescar();
      } catch {
        Swal.fire("Error", "No se pudo eliminar el tipo.", "error");
      }
    }
  };

  return (
    <li className="tipo-item">
      <div className="info-tipo">
        <p><b>ID:</b> {_id}</p>
        <p><b>Nombre:</b> {nombre}</p>
      </div>
      <div className="acciones">
        {!soloLectura && <Link to={`/admin/tipos/editar/${_id}`} className="btn btn-azul">Editar</Link>}
        {!soloLectura && <button className="btn btn-rojo" onClick={eliminarTipo}>Eliminar</button>}
      </div>
    </li>
  );
};

const Tipos = ({ soloLectura = false }) => {
  const [tipos, setTipos] = useState([]);

  const consultarAPI = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await clienteAxios.get("/api/tipos/consulta", {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setTipos(resp.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudieron cargar los tipos", "error");
    }
  };

  useEffect(() => { consultarAPI(); }, []);

  return (
    <div>
      <h2>Tipos</h2>
      {!soloLectura && <Link to="/admin/tipos/nuevo" className="btn btn-verde">+ Nuevo Tipo</Link>}
      <ul className="lista-tipos">
        {tipos.length === 0 ? <p>No hay tipos.</p> : tipos.map(t => (
          <TipoItem key={t._id} tipo={t} refrescar={consultarAPI} soloLectura={soloLectura} />
        ))}
      </ul>
    </div>
  );
};

export default Tipos;
