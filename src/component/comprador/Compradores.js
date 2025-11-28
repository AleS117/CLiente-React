// src/component/comprador/Compradores.js
import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const CompradorItem = ({ comprador, refrescar, soloLectura }) => {
  if (!comprador) return null;
  const { _id, nombre, correo, direccion, apellido_paterno, apellido_materno } = comprador;

  const eliminarComprador = async () => {
    const r = await Swal.fire({
      title: "¿Eliminar comprador?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
    });
    if (r.isConfirmed) {
      try {
        await clienteAxios.delete(`/api/compradores/eliminar/${_id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        Swal.fire("Eliminado", "El comprador fue eliminado.", "success");
        refrescar();
      } catch {
        Swal.fire("Error", "No se pudo eliminar el comprador.", "error");
      }
    }
  };

  return (
    <li className="comprador-item">
      <div className="info-comprador">
        <p><b>ID:</b> {_id}</p>
        <p><b>Nombre:</b> {nombre}</p>
        <p><b>Correo:</b> {correo}</p>
        <p><b>Dirección:</b> {direccion}</p>
        <p><b>Apellido Paterno:</b> {apellido_paterno}</p>
        <p><b>Apellido Materno:</b> {apellido_materno}</p>
      </div>
      <div className="acciones">
        {!soloLectura && <Link to={`/admin/compradores/editar/${_id}`} className="btn btn-azul">Editar</Link>}
        {!soloLectura && <button className="btn btn-rojo" onClick={eliminarComprador}>Eliminar</button>}
      </div>
    </li>
  );
};

const Compradores = ({ soloLectura = false }) => {
  const [compradores, setCompradores] = useState([]);

  const consultarAPI = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await clienteAxios.get("/api/compradores/consulta", {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setCompradores(resp.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudieron cargar los compradores", "error");
    }
  };

  useEffect(() => { consultarAPI(); }, []);

  return (
    <div>
      <h2>Compradores</h2>
      {!soloLectura && <Link to="/admin/compradores/nuevo" className="btn btn-verde">+ Nuevo Comprador</Link>}
      <ul className="lista-compradores">
        {compradores.length === 0 ? <p>No hay compradores.</p> : compradores.map(c => (
          <CompradorItem key={c._id} comprador={c} refrescar={consultarAPI} soloLectura={soloLectura} />
        ))}
      </ul>
    </div>
  );
};

export default Compradores;
