// src/component/administrador/Administradores.js
import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import AdministradorForm from "./AdministradorForm";

const AdminItem = ({ admin, refrescar, abrirForm, soloLectura }) => {
  if (!admin) return null;
  const { _id, usuario, correo, rol } = admin;

  const eliminarAdmin = async () => {
    const r = await Swal.fire({
      title: "¿Eliminar administrador?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
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
        {!soloLectura && <button className="btn btn-azul" onClick={() => abrirForm(admin)}>Editar</button>}
        {!soloLectura && <button className="btn btn-rojo" onClick={eliminarAdmin}>Eliminar</button>}
      </div>
    </li>
  );
};

const Administradores = ({ soloLectura = false }) => {
  const [admins, setAdmins] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [adminEditar, setAdminEditar] = useState(null);

  const consultarAPI = async () => {
    try {
      const resp = await clienteAxios.get("/api/administrador/consulta", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAdmins(resp.data);
    } catch {
      Swal.fire("Error", "No se pudieron cargar los administradores", "error");
    }
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  const abrirForm = (admin = null) => {
    setAdminEditar(admin);
    setMostrarForm(true);
  };

  const cerrarForm = () => {
    setAdminEditar(null);
    setMostrarForm(false);
  };

  return (
    <div>
      <h2>Administradores</h2>
      {!soloLectura && <button className="btn btn-verde" onClick={() => abrirForm()}>+ Nuevo Administrador</button>}

      <ul className="lista-admins">
        {admins.length === 0 ? (
          <p>No hay administradores.</p>
        ) : (
          admins.map(a => (
            <AdminItem
              key={a._id}
              admin={a}
              refrescar={consultarAPI}
              abrirForm={abrirForm}
              soloLectura={soloLectura}
            />
          ))
        )}
      </ul>

      {mostrarForm && (
        <div className="modal">
          <div className="modal-content">
            <button className="btn btn-rojo" onClick={cerrarForm} style={{ float: "right" }}>X</button>
            <AdministradorForm
              admin={adminEditar}
              onClose={cerrarForm}
              refrescar={consultarAPI}
            />
          </div>
        </div>
      )}

      {/* Estilos simples para el modal */}
      <style>{`
        .modal {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          min-width: 300px;
          max-width: 500px;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default Administradores;
