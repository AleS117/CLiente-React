import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const TipoForm = () => {
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      clienteAxios.get(`/api/tipos/${id}`)
        .then(res => setNombre(res.data.nombre))
        .catch(err => Swal.fire("Error", "No se pudieron cargar los datos", "error"));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await clienteAxios.put(`/api/tipos/editar/${id}`, { nombre });
        Swal.fire("Actualizado", "Tipo actualizado correctamente", "success");
      } else {
        await clienteAxios.post("/api/tipos/nuevo", { nombre });
        Swal.fire("Creado", "Tipo creado correctamente", "success");
      }
      navigate("/admin/tipos");
    } catch (err) {
      Swal.fire("Error", "Ocurrió un error al guardar el tipo", "error");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>{id ? "Editar Tipo" : "Nuevo Tipo"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <button type="submit" className="btn btn-verde">{id ? "Actualizar" : "Agregar"}</button>
      </form>
    </div>
  );
};

export default TipoForm;
