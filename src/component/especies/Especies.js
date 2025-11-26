// src/component/especies/Especies.js
import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const EspecieItem = ({ especie, refrescar }) => {
  if (!especie) return null;

  const { _id, nombre, id_tpo, imagen } = especie;

  const eliminarEspecie = () => {
    Swal.fire({
      title: "¿Eliminar especie?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
    }).then((r) => {
      if (r.isConfirmed) {
        clienteAxios
          .delete(`/api/especies/eliminar/${_id}`)
          .then(() => {
            Swal.fire("Eliminado", "La especie fue eliminada.", "success");
            refrescar(); // actualizar lista
          })
          .catch(() => {
            Swal.fire("Error", "No se pudo eliminar la especie.", "error");
          });
      }
    });
  };

  return (
    <li className="especie-item">
      <div className="info-especie">
        <p><b>ID:</b> {_id}</p>
        <p><b>Nombre:</b> {nombre}</p>
        <p><b>Tipo ID:</b> {id_tpo}</p>
        {imagen && <img src={imagen} alt={nombre} width="80" />}
      </div>
      <div className="acciones">
        <Link to={`/admin/especies/editar/${_id}`} className="btn btn-azul">
          Editar
        </Link>
        <button className="btn btn-rojo" onClick={eliminarEspecie}>
          Eliminar
        </button>
      </div>
    </li>
  );
};

const Especies = () => {
  const [especies, setEspecies] = useState([]);

  const consultarAPI = async () => {
    try {
      const token = localStorage.getItem("token");
      const respuesta = await clienteAxios.get("/api/especies/consulta", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEspecies(respuesta.data);
    } catch (error) {
      console.error("Error al consultar especies:", error);
    }
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  return (
    <div className="especies-container">
      <h2>Especies</h2>
      <Link to="/admin/especies/nuevo" className="btn btn-verde">
        + Nueva Especie
      </Link>

      {especies.length === 0 ? (
        <p>No hay especies registradas.</p>
      ) : (
        <ul className="lista-especies">
          {especies.map((e) => (
            <EspecieItem key={e._id} especie={e} refrescar={consultarAPI} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Especies;
