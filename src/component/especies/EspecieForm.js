// src/component/especies/EspecieForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const EspecieForm = ({ soloLectura = false }) => {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [tipos, setTipos] = useState([]);
  const [imagen, setImagen] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Cargar los tipos disponibles
  useEffect(() => {
    const cargarTipos = async () => {
      try {
        const res = await clienteAxios.get("/api/tipos/consulta", { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        setTipos(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudieron cargar los tipos", "error");
      }
    };
    cargarTipos();
  }, [token]);

  // Cargar especie para edición
  useEffect(() => {
    if (!id) return;
    const cargarEspecie = async () => {
      try {
        const res = await clienteAxios.get(`/api/especies/consulta/${id}`, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        setNombre(res.data.nombre || "");
        setTipo(res.data.tipo?._id || ""); // 🔹 Usar el campo tipo._id
        setImagen(res.data.imagen || "");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudo cargar la especie", "error");
      }
    };
    cargarEspecie();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (soloLectura) return;

    try {
      // 🔹 Enviar "tipo" y no "id_tpo"
      const data = { nombre, tipo, imagen };

      if (id) {
        await clienteAxios.put(`/api/especies/actualizar/${id}`, data, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        Swal.fire("Actualizado", "Especie actualizada", "success");
      } else {
        await clienteAxios.post("/api/especies/crear", data, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        Swal.fire("Creado", "Especie creada", "success");
      }

      navigate("/trabajador"); // Ajusta según tu vista
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo guardar la especie", "error");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>{id ? "Editar Especie" : "Nueva Especie"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input 
          type="text" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          disabled={soloLectura} 
          required 
        />

        <label>Tipo</label>
        <select 
          value={tipo} 
          onChange={(e) => setTipo(e.target.value)} 
          disabled={soloLectura} 
          required
        >
          <option value="">-- Selecciona --</option>
          {tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
        </select>

        <label>Imagen (URL)</label>
        <input 
          type="text" 
          value={imagen} 
          onChange={(e) => setImagen(e.target.value)} 
          disabled={soloLectura} 
        />

        {!soloLectura && <button className="btn btn-verde" type="submit">{id ? "Actualizar" : "Agregar"}</button>}
      </form>
    </div>
  );
};

export default EspecieForm;
