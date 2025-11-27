// TipoItem.js
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

function TipoItem({ tipo }) {
  const { _id, nombre } = tipo;

  const eliminarTipo = () => {
    Swal.fire({
      title: "¿Eliminar tipo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
    }).then((r) => {
      if (r.isConfirmed) {
        clienteAxios
          .delete(`/api/tipos/eliminar/${_id}`)
          .then(() => {
            Swal.fire("Eliminado", "El tipo fue eliminado.", "success");
            window.location.reload(); // recargar lista
          })
          .catch(() => {
            Swal.fire("Error", "No se pudo eliminar el tipo", "error");
          });
      }
    });
  };

  return (
    <li className="cliente">
      <div className="info-cliente">
        <p><b>ID:</b> {_id}</p>
        <p><b>Nombre:</b> {nombre}</p>
      </div>
      <div className="acciones">
        <Link to={`/admin/tipos/editar/${_id}`} className="btn btn-azul">
          Editar
        </Link>
        <button className="btn btn-rojo" onClick={eliminarTipo}>
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default TipoItem;
