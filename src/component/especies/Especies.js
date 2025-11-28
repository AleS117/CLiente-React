// src/component/especies/Especies.js
import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const EspecieItem = ({ especie, refrescar, soloLectura }) => {
  if (!especie) return null;
  const { _id, nombre, tipo, imagen } = especie;

  const eliminarEspecie = async () => {
    if (soloLectura) return;
    const r = await Swal.fire({
      title: "¿Eliminar especie?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
    });
    if (r.isConfirmed) {
      try {
        await clienteAxios.delete(`/api/especies/eliminar/${_id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        Swal.fire("Eliminado", "La especie fue eliminada.", "success");
        refrescar();
      } catch {
        Swal.fire("Error", "No se pudo eliminar la especie.", "error");
      }
    }
  };

  return (
    <li className="especie-item">
      <p><b>ID:</b> {_id}</p>
      <p><b>Nombre:</b> {nombre}</p>
      <p><b>Tipo:</b> {tipo?.nombre || especie.id_tpo}</p>
      {imagen && <img src={imagen} alt={nombre} width="80" />}
      <div className="acciones">
        {!soloLectura && <Link to={`/admin/especies/editar/${_id}`} className="btn btn-azul">Editar</Link>}
        {!soloLectura && <button className="btn btn-rojo" onClick={eliminarEspecie}>Eliminar</button>}
      </div>
    </li>
  );
};

const Especies = ({ soloLectura = false }) => {
  const [especies, setEspecies] = useState([]);

  const consultarAPI = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await clienteAxios.get("/api/especies/consulta", {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setEspecies(resp.data);
    } catch (err) {
      Swal.fire("Error", "No se pudieron cargar las especies", "error");
    }
  };

  useEffect(() => { consultarAPI(); }, []);

  return (
    <div>
      <h2>Especies</h2>
      {!soloLectura && <Link to="/admin/especies/nuevo" className="btn btn-verde">+ Nueva Especie</Link>}
      <ul className="lista-especies">
        {especies.length === 0 ? <p>No hay especies.</p> :
          especies.map(e => <EspecieItem key={e._id} especie={e} refrescar={consultarAPI} soloLectura={soloLectura} />)}
      </ul>
    </div>
  );
};

export default Especies;
