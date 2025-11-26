import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const EspecieForm = () => {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState(""); // tipo seleccionado
  const [tipos, setTipos] = useState([]); // lista de tipos
  const [imagen, setImagen] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  // Cargar lista de tipos
  useEffect(() => {
    clienteAxios
      .get("/api/tipos/consulta", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setTipos(res.data))
      .catch(() => Swal.fire("Error", "No se pudieron cargar los tipos", "error"));
  }, [token]);

  // Cargar datos si es edición
  useEffect(() => {
    if (id) {
      clienteAxios
        .get(`/api/especies/consulta/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          if (res.data) {
            setNombre(res.data.nombre);
            setTipo(res.data.tipo?._id || ""); // guardamos el _id del tipo
            setImagen(res.data.imagen || "");
          }
        })
        .catch(() => Swal.fire("Error", "No se pudo cargar la especie", "error"));
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { nombre, tipo, imagen };

      if (id) {
        // editar
        await clienteAxios.put(`/api/especies/actualizar/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Actualizado", "Especie actualizada correctamente", "success");
      } else {
        // crear
        await clienteAxios.post("/api/especies/crear", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Creado", "Especie creada correctamente", "success");
        // limpiar formulario
        setNombre("");
        setTipo("");
        setImagen("");
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
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Tipo</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
          <option value="">-- Selecciona un tipo --</option>
          {tipos.map((t) => (
            <option key={t._id} value={t._id}>
              {t.nombre}
            </option>
          ))}
        </select>

        <label>Imagen (URL)</label>
        <input
          type="text"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />

        <button type="submit" className="btn btn-verde">
          {id ? "Actualizar" : "Agregar"}
        </button>
      </form>
    </div>
  );
};

export default EspecieForm;
