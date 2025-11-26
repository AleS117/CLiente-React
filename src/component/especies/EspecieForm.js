import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const EspecieForm = () => {
  const [nombre, setNombre] = useState("");
  const [id_tpo, setIdTpo] = useState("");
  const [imagen, setImagen] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Cargar datos para editar
      clienteAxios.get(`/api/especies/${id}`)
        .then(res => {
          setNombre(res.data.nombre);
          setIdTpo(res.data.id_tpo);
          setImagen(res.data.imagen);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await clienteAxios.put(`/api/especies/editar/${id}`, { nombre, id_tpo, imagen });
        Swal.fire("Actualizado", "Especie actualizada correctamente", "success");
      } else {
        await clienteAxios.post("/api/especies/nuevo", { nombre, id_tpo, imagen });
        Swal.fire("Creado", "Especie creada correctamente", "success");
      }
      navigate("/admin/especies");
    } catch (err) {
      Swal.fire("Error", "Ocurrió un error al guardar la especie", "error");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2>{id ? "Editar Especie" : "Nueva Especie"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        
        <label>ID Tipo</label>
        <input type="number" value={id_tpo} onChange={(e) => setIdTpo(e.target.value)} required />
        
        <label>Imagen (URL)</label>
        <input type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} />
        
        <button type="submit" className="btn btn-verde">
          {id ? "Actualizar" : "Agregar"}
        </button>
      </form>
    </div>
  );
};

export default EspecieForm;
