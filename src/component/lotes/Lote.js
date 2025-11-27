import React from "react";

function Lote({ lote, eliminarLote }) {
  const { _id, id_especie, id_tipo, kilos, numero_cajas, precio_kilo, fecha } = lote;

  return (
    <li className="cliente">
      <div className="info-cliente">
        <p><b>ID:</b> {_id}</p>
        <p><b>Especie:</b> {id_especie ? id_especie.nombre : "Sin especie"}</p>
        <p><b>Tipo:</b> {id_tipo ? id_tipo.nombre : "Sin tipo"}</p>
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
