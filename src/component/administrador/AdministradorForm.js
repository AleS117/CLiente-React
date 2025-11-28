// src/component/administrador/AdministradorForm.js
import React, { useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const AdministradorForm = ({ admin, onClose, refrescar }) => {
  const [usuario, setUsuario] = useState(admin?.usuario || "");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState(admin?.rol || "ADMIN");
  const [correo, setCorreo] = useState(admin?.correo || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!usuario.trim()) {
      return Swal.fire("Error", "Debes ingresar un usuario", "error");
    }
    if (!admin && !password.trim()) {
      return Swal.fire("Error", "Debes ingresar una contraseña", "error");
    }

    try {
      const data = { usuario, rol, correo };
      if (password.trim() !== "") data.password = password;

      let resp;
      if (admin) {
        // Actualizar
        resp = await clienteAxios.put(
          `/api/administrador/actualizar/${admin._id}`,
          data,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      } else {
        // Crear
        resp = await clienteAxios.post(
          "/api/administrador/crear",
          data,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      }

      // Mostrar éxito solo si la respuesta tiene mensaje
      if (resp?.data?.mensaje) {
        Swal.fire("Correcto", resp.data.mensaje, "success");
        if (refrescar) refrescar();
        onClose();
      }

    } catch (error) {
      console.log(error.response || error);
      const mensaje = error.response?.data?.mensaje || "No se pudo guardar el administrador";
      Swal.fire("Error", mensaje, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-admin">
      <input
        type="text"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        placeholder="Usuario"
        required
      />
      <input
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Correo (opcional)"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={admin ? "Nueva contraseña (opcional)" : "Contraseña"}
      />
      <select value={rol} onChange={(e) => setRol(e.target.value)}>
        <option value="ADMIN">ADMIN</option>
        <option value="TRABAJADOR">TRABAJADOR</option>
      </select>
      <button type="submit" className="btn btn-verde">Guardar</button>
      <button
        type="button"
        className="btn btn-gris"
        onClick={onClose}
        style={{ marginLeft: "10px" }}
      >
        Cancelar
      </button>
    </form>
  );
};

export default AdministradorForm;
