import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LotesParaComprar = () => {
  const [lotes, setLotes] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const cargarLotes = async () => {
    try {
      const res = await clienteAxios.get("/api/lotes/consulta", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const disponibles = res.data.filter((l) => !l.id_comprador);
      setLotes(disponibles);
    } catch (error) {
      console.log("Error al cargar lotes:", error);
      Swal.fire("Error", "No se pudieron cargar los lotes", "error");
    }
  };

  const agregarAlCarrito = async (lote) => {
    try {
      await clienteAxios.post(
        "/api/carrito/agregar",
        { id_lote: lote._id, cantidad: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Agregado", "Lote agregado al carrito", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo agregar al carrito", "error");
    }
  };

  useEffect(() => {
    cargarLotes();
  }, []);

  return (
    <div>
      <h2>Lotes Disponibles para Comprar</h2>
      {lotes.length === 0 ? (
        <p>No hay lotes disponibles</p>
      ) : (
        <ul>
          {lotes.map((lote) => (
            <li key={lote._id} style={{ marginBottom: "15px" }}>
              <b>Especie:</b> {lote.id_especie?.nombre} <br />
              <b>Tipo:</b> {lote.id_tipo?.nombre} <br />
              <b>Kilos:</b> {lote.kilos} kg <br />
              <b>Cajas:</b> {lote.numero_cajas} <br />
              <b>Precio por kilo:</b> ${lote.precio_kilo} <br />
              <b>Fecha:</b> {new Date(lote.fecha).toLocaleDateString()} <br />
              <button
                className="btn btn-verde"
                style={{ marginTop: "5px" }}
                onClick={() => agregarAlCarrito(lote)}
              >
                Agregar al carrito
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        className="btn btn-amarillo"
        style={{ marginTop: 12 }}
        onClick={() => navigate("/comprador/carrito")}
      >
        Ir al carrito 🛒
      </button>
    </div>
  );
};

export default LotesParaComprar;
