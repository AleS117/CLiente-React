import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const Administradores = () => {
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  const [formData, setFormData] = useState({ usuario: "", password: "" });

  const token = localStorage.getItem("token");

  const consultarAPI = async () => {
    try {
      const respuesta = await clienteAxios.get("/api/administrador/consulta", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  const handleNuevo = () => {
    setFormData({ usuario: "", password: "" });
    setEditAdmin(null);
    setShowForm(true);
  };

  const handleEditar = (admin) => {
    setFormData({ usuario: admin.usuario, password: "" });
    setEditAdmin(admin);
    setShowForm(true);
  };

  const handleEliminar = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar administrador?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        await clienteAxios.delete(`/api/administrador/eliminar/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Eliminado!", "Administrador eliminado correctamente", "success");
        consultarAPI();
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar", "error");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editAdmin) {
        await clienteAxios.put(`/api/administrador/actualizar/${editAdmin._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Actualizado!", "Administrador actualizado", "success");
      } else {
        await clienteAxios.post("/api/administrador/crear", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Creado!", "Administrador creado correctamente", "success");
      }
      setShowForm(false);
      consultarAPI();
    } catch (error) {
      Swal.fire("Error", "No se pudo guardar", "error");
    }
  };

  return (
    <div>
      <h2>Administradores</h2>
      <button className="btn btn-verde" onClick={handleNuevo}>
        Nuevo Administrador
      </button>

      <table className="tabla" style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Usuario</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{admin.usuario}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <button className="btn btn-azul" onClick={() => handleEditar(admin)}>Editar</button>
                <button className="btn btn-rojo" onClick={() => handleEliminar(admin._id)} style={{ marginLeft: "10px" }}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para crear/editar */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editAdmin ? "Editar Administrador" : "Nuevo Administrador"}</h3>
            <form onSubmit={handleSubmit}>
              <label>Usuario:</label>
              <input
                type="text"
                value={formData.usuario}
                onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                required
              />
              <label>Contraseña:</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={!editAdmin}
              />
              <div style={{ marginTop: "10px" }}>
                <button type="submit" className="btn btn-verde">Guardar</button>
                <button type="button" className="btn btn-gris" onClick={() => setShowForm(false)} style={{ marginLeft: "10px"}}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          width: 400px;
        }
      `}</style>
    </div>
  );
};

export default Administradores;
