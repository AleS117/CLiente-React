// AdministradorForm.js
import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const AdministradorForm = ({ admin, onClose }) => {
  const [usuario, setUsuario] = useState(admin?.usuario || "");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState(admin?.rol || "ADMIN");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (admin) {
        await clienteAxios.put(`/api/administrador/actualizar/${admin._id}`, { usuario, password, rol });
      } else {
        await clienteAxios.post("/api/administrador/crear", { usuario, password, rol });
      }
      Swal.fire("Correcto", "Administrador guardado", "success");
      onClose();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "No se pudo guardar el administrador", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="Usuario" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <select value={rol} onChange={(e) => setRol(e.target.value)}>
        <option value="ADMIN">ADMIN</option>
        <option value="TRABAJADOR">TRABAJADOR</option>
      </select>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default AdministradorForm;
