import React from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { Link } from "react-router-dom";

const eliminarEspecie = (id) => {
  Swal.fire({
    title: "¿Eliminar especie?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí",
  }).then((r) => {
    if (r.isConfirmed) {
      clienteAxios.delete(`/api/especies/eliminar/${id}`).then(() => {
        Swal.fire("Eliminado", "La especie fue eliminada.", "success");
      });
    }
  });
};

function Especie({ especie }) {
  const { _id, nombre, id_tpo, imagen } = especie;

  return (
    <li className="cliente">
      <div className="info-cliente">
        <p><b>ID:</b> {_id}</p>
        <p><b>Nombre:</b> {nombre}</p>
        <p><b>Tipo:</b> {id_tpo}</p>
        <img src={imagen} alt={nombre} width="80" />
      </div>

      <div className="acciones">
        <Link to={`/especies/editar/${_id}`} className="btn btn-azul">
          Editar
        </Link>
        <button className="btn btn-rojo" onClick={() => eliminarEspecie(_id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default Especie;
