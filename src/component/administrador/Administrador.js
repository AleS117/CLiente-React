import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

const eliminarAdministrador = (id) => {
  Swal.fire({
    title: "¿Seguro que quieres eliminar este administrador?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar"
  }).then((result) => {
    if (result.isConfirmed) {
      clienteAxios.delete(`/api/administrador/eliminar/${id}`).then(() => {
        Swal.fire("Eliminado", "El administrador ha sido eliminado.", "success");
      });
    }
  });
};

function Administrador({ admin }) {
  const { _id, usuario, correo, rol } = admin;

  return (
    <li className="cliente">
      <div className="info-cliente">
        <p><b>ID:</b> {_id}</p>
        <p><b>Usuario:</b> {usuario}</p>
        <p><b>Correo:</b> {correo}</p>
        <p><b>Rol:</b> {rol}</p>
      </div>

      <div className="acciones">
        <Link to={`/administradores/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i> Editar
        </Link>

        <button className="btn btn-rojo btn-eliminar" onClick={() => eliminarAdministrador(_id)}>
          <i className="fas fa-times"></i> Eliminar
        </button>
      </div>
    </li>
  );
}

export default Administrador;
