// src/component/tipo/TipoForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const TipoForm = ({ soloLectura = false }) => {
  const [nombre, setNombre] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    clienteAxios.get(`/api/tipo/consulta/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then(res => setNombre(res.data.nombre))
      .catch(() => Swal.fire("Error", "No se pudo cargar el tipo", "error"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (soloLectura) return;
    try {
      if (id) {
        await clienteAxios.put(`/api/tipo/actualizar/${id}`, { nombre }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
        Swal.fire("Actualizado", "Tipo actualizado", "success");
      } else {
        await clienteAxios.post(`/api/tipo/crear`, { nombre }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
        Swal.fire("Creado", "Tipo creado", "success");
      }
      navigate("/admin/tipos");
    } catch {
      Swal.fire("Error", "No se pudo guardar", "error");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "20px auto" }}>
      <h2>{id ? "Editar Tipo" : "Nuevo Tipo"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input type="text" value={nombre} onChange={(e)=> setNombre(e.target.value)} disabled={soloLectura} required />
        {!soloLectura && <button className="btn btn-verde" type="submit">{id ? "Actualizar" : "Agregar"}</button>}
      </form>
    </div>
  );
};

export default TipoForm;
