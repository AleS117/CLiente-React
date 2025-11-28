// src/component/administrador/Administradores.js
import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AdminItem = ({ admin, refrescar, soloLectura }) => {
  if (!admin) return null;
  const { _id, usuario, correo, rol } = admin;

  const eliminarAdmin = async () => {
    const r = await Swal.fire({
      title: "¿Eliminar administrador?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
    });
    if (r.isConfirmed) {
      try {
        await clienteAxios.delete(`/api/administrador/eliminar/${_id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        Swal.fire("Eliminado", "Administrador eliminado.", "success");
        refrescar();
      } catch {
        Swal.fire("Error", "No se pudo eliminar el administrador.", "error");
      }
    }
  };

  return (
    <li className="admin-item">
      <p><b>ID:</b> {_id}</p>
      <p><b>Usuario:</b> {usuario}</p>
      <p><b>Correo:</b> {correo || "—"}</p>
      <p><b>Rol:</b> {rol}</p>
      <div className="acciones">
        {!soloLectura && <Link to={`/admin/administradores/editar/${_id}`} className="btn btn-azul">Editar</Link>}
        {!soloLectura && <button className="btn btn-rojo" onClick={eliminarAdmin}>Eliminar</button>}
      </div>
    </li>
  );
};

const Administradores = ({ soloLectura = false }) => {
  const [admins, setAdmins] = useState([]);

  const consultarAPI = async () => {
    try {
      const resp = await clienteAxios.get("/api/administrador/consulta", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAdmins(resp.data);
    } catch (err) {
      Swal.fire("Error", "No se pudieron cargar los administradores", "error");
    }
  };

  useEffect(() => { consultarAPI(); }, []);

  return (
    <div>
      <h2>Administradores</h2>
      {!soloLectura && <Link to="/admin/administradores/nuevo" className="btn btn-verde">+ Nuevo Administrador</Link>}
      <ul className="lista-admins">
        {admins.length === 0 ? <p>No hay administradores.</p> :
          admins.map(a => <AdminItem key={a._id} admin={a} refrescar={consultarAPI} soloLectura={soloLectura} />)}
      </ul>
    </div>
  );
};

export default Administradores;
