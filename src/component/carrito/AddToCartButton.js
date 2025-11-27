// src/component/carrito/AddToCartButton.js
import React, { useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

function AddToCartButton({ loteId, cantidadInicial = 1, onAdded }) {
  const [loading, setLoading] = useState(false);

  const agregar = async () => {
    setLoading(true);
    try {
      await clienteAxios.post("/api/carrito/agregar", {
        id_lote: loteId,
        cantidad: cantidadInicial
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setLoading(false);
      Swal.fire("Agregado", "Se agregó el lote al carrito", "success");
      if (onAdded) onAdded();
    } catch (err) {
      setLoading(false);
      console.error(err);
      Swal.fire("Error", "No se pudo agregar al carrito", "error");
    }
  };

  return (
    <button className="btn btn-verde" onClick={agregar} disabled={loading}>
      {loading ? "..." : "Agregar al carrito"}
    </button>
  );
}

export default AddToCartButton;
