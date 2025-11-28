import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const CompradorForm = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [direccion, setDireccion] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Cargar datos del comprador para editar
      clienteAxios.get(`/api/compradores/consulta/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(resp => {
        const c = resp.data;
        setNombre(c.nombre);
        setCorreo(c.correo);
        setApellidoPaterno(c.apellido_paterno || "");
        setApellidoMaterno(c.apellido_materno || "");
        setDireccion(c.direccion || "");
      })
      .catch(() => Swal.fire("Error", "No se pudieron cargar los datos", "error"));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!nombre || !correo || !apellidoPaterno || !apellidoMaterno || !direccion) {
      return Swal.fire("Error", "Todos los campos son obligatorios", "error");
    }

    if (!id && !password) {
      return Swal.fire("Error", "La contraseña es obligatoria al crear un comprador", "error");
    }

    try {
      const body = { nombre, correo, apellido_paterno: apellidoPaterno, apellido_materno: apellidoMaterno, direccion };
      if (password) body.password = password; // solo enviar si hay password

      if (id) {
        // Editar
        await clienteAxios.put(`/api/compradores/actualizar/${id}`, body, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        Swal.fire("Actualizado", "Comprador actualizado", "success");
      } else {
        // Crear
        await clienteAxios.post(`/api/compradores/crear`, body, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        Swal.fire("Creado", "Comprador creado", "success");
      }
      navigate("/admin/compradores");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.response?.data?.mensaje || "Ocurrió un error", "error");
    }
  };

  return (
    <div>
      <h2>{id ? "Editar" : "Nuevo"} Comprador</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Apellido Paterno</label>
          <input type="text" value={apellidoPaterno} onChange={e => setApellidoPaterno(e.target.value)} required />
        </div>
        <div>
          <label>Apellido Materno</label>
          <input type="text" value={apellidoMaterno} onChange={e => setApellidoMaterno(e.target.value)} required />
        </div>
        <div>
          <label>Dirección</label>
          <input type="text" value={direccion} onChange={e => setDireccion(e.target.value)} required />
        </div>
        <div>
          <label>Correo</label>
          <input type="email" value={correo} onChange={e => setCorreo(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña {id ? "(dejar vacío para no cambiar)" : ""}</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required={!id} />
        </div>
        <button type="submit">{id ? "Actualizar" : "Crear"}</button>
      </form>
    </div>
  );
};

export default CompradorForm;
