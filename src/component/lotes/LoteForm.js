// src/component/lotes/LoteForm.js
import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LoteForm = () => {
  const navigate = useNavigate();
  const [lote, setLote] = useState({
    id_especie: "",
    id_tipo: "",
    kilos: "",
    numero_cajas: "",
    precio_kilo: "",
    fecha: "",
  });
  const [especies, setEspecies] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Cargar especies y tipos al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resEspecies, resTipos] = await Promise.all([
          clienteAxios.get("/api/especies/consulta", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          clienteAxios.get("/api/tipos/consulta", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setEspecies(resEspecies.data);
        setTipos(resTipos.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        Swal.fire("Error", "No se pudieron cargar los datos para el formulario", "error");
      }
    };

    cargarDatos();
  }, [token]);

  // Manejo de inputs
  const handleChange = (e) => {
    setLote({
      ...lote,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!lote.id_especie || !lote.id_tipo || !lote.kilos || !lote.numero_cajas || !lote.precio_kilo || !lote.fecha) {
      Swal.fire("Error", "Todos los campos son obligatorios", "warning");
      return;
    }

    try {
      const res = await clienteAxios.post("/api/lotes/crear", lote, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire("Éxito", "Lote creado correctamente", "success");
      navigate("/admin/lotes"); // Redirige al listado de lotes
    } catch (error) {
      console.error("Error al crear lote:", error);
      Swal.fire("Error", "No se pudo crear el lote", "error");
    }
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div className="formulario">
      <h2>Nuevo Lote</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label>Especie</label>
          <select name="id_especie" value={lote.id_especie} onChange={handleChange}>
            <option value="">-- Selecciona una especie --</option>
            {especies.map((e) => (
              <option key={e._id} value={e._id}>{e.nombre}</option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label>Tipo</label>
          <select name="id_tipo" value={lote.id_tipo} onChange={handleChange}>
            <option value="">-- Selecciona un tipo --</option>
            {tipos.map((t) => (
              <option key={t._id} value={t._id}>{t.nombre}</option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label>Kilos</label>
          <input type="number" name="kilos" value={lote.kilos} onChange={handleChange} />
        </div>

        <div className="campo">
          <label>Número de Cajas</label>
          <input type="number" name="numero_cajas" value={lote.numero_cajas} onChange={handleChange} />
        </div>

        <div className="campo">
          <label>Precio por Kilo</label>
          <input type="number" name="precio_kilo" value={lote.precio_kilo} onChange={handleChange} />
        </div>

        <div className="campo">
          <label>Fecha</label>
          <input type="date" name="fecha" value={lote.fecha} onChange={handleChange} />
        </div>

        <div className="acciones">
          <button type="submit" className="btn btn-verde">Crear Lote</button>
        </div>
      </form>
    </div>
  );
};

export default LoteForm;
