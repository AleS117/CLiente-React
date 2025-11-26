import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

const eliminarTipo = (id) => {
  Swal.fire({
    title: "¿Eliminar tipo?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí",
  }).then((r) => {
    if (r.isConfirmed) {
      clienteAxios.delete(`/api/tipos/eliminar/${id}`).then(() => {
        Swal.fire("Eliminado", "El tipo fue eliminado.", "success");
        window.location.reload(); // recargar lista
      });
    }
  });
};

function TipoItem({ tipo }) {
  const { _id, nombre } = tipo;

  return (
    <li>
      <span>{nombre}</span>
      <div>
        <Link to={`/admin/tipos/editar/${_id}`} className="btn btn-azul">Editar</Link>
        <button className="btn btn-rojo" onClick={() => eliminarTipo(_id)}>Eliminar</button>
      </div>
    </li>
  );
}

export default TipoItem;
