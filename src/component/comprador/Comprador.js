import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

const eliminarComprador = (id) => {
  Swal.fire({
    title: "¿Eliminar comprador?",
    text: "No podrás recuperar el registro.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar"
  }).then((result) => {
    if (result.isConfirmed) {
      clienteAxios.delete(`/api/compradores/eliminar/${id}`).then(() => {
        Swal.fire("Eliminado", "El comprador ha sido eliminado.", "success");
      });
    }
  });
};

function Comprador({ comprador }) {
  const { _id, nombre, apellido_paterno, apellido_materno, correo } = comprador;

  return (
    <li className="cliente">
      <div className="info-cliente">
        <p><b>ID:</b> {_id}</p>
        <p><b>Nombre:</b> {nombre} {apellido_paterno} {apellido_materno}</p>
        <p><b>Correo:</b> {correo}</p>
      </div>

      <div className="acciones">
        <Link to={`/compradores/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i> Editar
        </Link>

        <button className="btn btn-rojo btn-eliminar" onClick={() => eliminarComprador(_id)}>
          <i className="fas fa-times"></i> Eliminar
        </button>
      </div>
    </li>
  );
}

export default Comprador;
