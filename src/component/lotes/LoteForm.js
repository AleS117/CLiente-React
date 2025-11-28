// src/component/lotes/LoteForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const LoteForm = ({ soloLectura = false }) => {
  const [id_especie, setIdEspecie] = useState("");
  const [id_tipo, setIdTipo] = useState("");
  const [kilos, setKilos] = useState("");
  const [numero_cajas, setNumeroCajas] = useState("");
  const [precio_kilo, setPrecioKilo] = useState("");
  const [fecha, setFecha] = useState("");
  const [especies, setEspecies] = useState([]);
  const [tipos, setTipos] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    clienteAxios.get("/api/especies/consulta", { headers: { Authorization: `Bearer ${token}` } }).then(res => setEspecies(res.data)).catch(()=>{});
    clienteAxios.get("/api/tipo/consulta", { headers: { Authorization: `Bearer ${token}` } }).then(res => setTipos(res.data)).catch(()=>{});
  }, []);

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem("token");
    clienteAxios.get(`/api/lotes/consulta/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const l = res.data;
        setIdEspecie(l.id_especie?._id || l.id_especie);
        setIdTipo(l.id_tipo?._id || l.id_tipo);
        setKilos(l.kilos);
        setNumeroCajas(l.numero_cajas);
        setPrecioKilo(l.precio_kilo);
        setFecha(new Date(l.fecha).toISOString().slice(0,10));
      })
      .catch(() => Swal.fire("Error", "No se pudo cargar lote", "error"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (soloLectura) return;
    try {
      const data = { id_especie, id_tipo, kilos: Number(kilos), numero_cajas: Number(numero_cajas), precio_kilo: Number(precio_kilo), fecha: new Date(fecha) };
      if (id) {
        await clienteAxios.put(`/api/lotes/actualizar/${id}`, data, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
        Swal.fire("Actualizado", "Lote actualizado", "success");
      } else {
        await clienteAxios.post(`/api/lotes/crear`, data, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
        Swal.fire("Creado", "Lote creado", "success");
      }
      navigate("/admin/lotes");
    } catch {
      Swal.fire("Error", "No se pudo guardar lote", "error");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>{id ? "Editar Lote" : "Nuevo Lote"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Especie</label>
        <select value={id_especie} onChange={(e)=> setIdEspecie(e.target.value)} disabled={soloLectura} required>
          <option value="">-- Selecciona --</option>
          {especies.map(s => <option key={s._id} value={s._id}>{s.nombre}</option>)}
        </select>

        <label>Tipo</label>
        <select value={id_tipo} onChange={(e)=> setIdTipo(e.target.value)} disabled={soloLectura} required>
          <option value="">-- Selecciona --</option>
          {tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
        </select>

        <label>Kilos</label>
        <input type="number" value={kilos} onChange={(e)=> setKilos(e.target.value)} disabled={soloLectura} required />

        <label>Numero de cajas</label>
        <input type="number" value={numero_cajas} onChange={(e)=> setNumeroCajas(e.target.value)} disabled={soloLectura} required />

        <label>Precio por kilo</label>
        <input type="number" value={precio_kilo} onChange={(e)=> setPrecioKilo(e.target.value)} disabled={soloLectura} required />

        <label>Fecha</label>
        <input type="date" value={fecha} onChange={(e)=> setFecha(e.target.value)} disabled={soloLectura} required />

        {!soloLectura && <button className="btn btn-verde" type="submit">{id ? "Actualizar" : "Crear"}</button>}
      </form>
    </div>
  );
};

export default LoteForm;
