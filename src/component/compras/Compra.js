import React from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

const eliminarCompra = (id) => {
  Swal.fire({
    title: "¿Eliminar compra?",
    text: "No podrás recuperar este registro.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33"
  }).then((result) => {
    if (result.isConfirmed) {
      clienteAxios.delete(`/api/compras/eliminar/${id}`).then(() => {
        Swal.fire("Eliminado", "La compra fue eliminada.", "success");
      });
    }
  });
};

function Compra({ compra }) {
  const { _id, id_lte, codigo_cpr, precio_total, fecha } = compra;

  return (
    <li className="cliente">
      <div className="info-cliente">
        <p><b>ID:</b> {_id}</p>
        <p><b>Lote:</b> {id_lte}</p>
        <p><b>Código:</b> {codigo_cpr}</p>
        <p><b>Total:</b> ${precio_total}</p>
        <p><b>Fecha:</b> {new Date(fecha).toLocaleDateString()}</p>
      </div>

      <div className="acciones">
        <button className="btn btn-rojo" onClick={() => eliminarCompra(_id)}>
          <i className="fas fa-times"></i> Eliminar
        </button>
      </div>
    </li>
  );
}

export default Compra;
