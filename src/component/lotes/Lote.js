// src/component/lotes/Lote.js
import React from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

const eliminarLote = (id) => {
  Swal.fire({
    title: "¿Eliminar lote?",
    icon: "warning",
    showCancelButton: true
  }).then((r) => {
    if (r.isConfirmed) {
      clienteAxios
        .delete(`/api/lotes/eliminar/${id}`)
        .then(() => {
          Swal.fire("Eliminado", "El lote fue eliminado.", "success");
        })
        .catch(() => {
          Swal.fire("Error", "No se pudo eliminar.", "error");
        });
    }
  });
};

function Lote({ lote }) {
  const { _id, id_esp, id_tpo, kilos, numero_cajas, precio_kilo, fecha } = lote;

  return (
    <li className="cliente">
      <div className="info-cliente">
        <p><b>ID:</b> {_id}</p>
        <p><b>Especie ID:</b> {id_esp}</p>
        <p><b>Tipo ID:</b> {id_tpo}</p>
        <p><b>Kilos:</b> {kilos}</p>
        <p><b>Cajas:</b> {numero_cajas}</p>
        <p><b>Precio/Kg:</b> ${precio_kilo}</p>
        <p><b>Fecha:</b> {new Date(fecha).toLocaleDateString()}</p>
      </div>

      <div className="acciones">
        <button className="btn btn-rojo" onClick={() => eliminarLote(_id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default Lote;
