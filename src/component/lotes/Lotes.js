import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Lote from "./Lote";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Lotes = () => {
  const [lotes, setLotes] = useState([]);
  const token = localStorage.getItem("token");

  const consultarAPI = async () => {
    try {
      const respuesta = await clienteAxios.get("/api/lotes/consulta", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLotes(respuesta.data);
    } catch (error) {
      console.log("Error al cargar lotes:", error);
      Swal.fire("Error", "No se pudieron cargar los lotes", "error");
    }
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  const eliminarLote = async (id) => {
    Swal.fire({
      title: "¿Eliminar lote?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then(async (r) => {
      if (r.isConfirmed) {
        try {
          await clienteAxios.delete(`/api/lotes/eliminar/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Swal.fire("Eliminado", "El lote fue eliminado", "success");
          setLotes(lotes.filter((l) => l._id !== id));
        } catch (err) {
          Swal.fire("Error", "No se pudo eliminar el lote", "error");
        }
      }
    });
  };

  return (
    <Fragment>
      <h2>Lotes Registrados</h2>
      <Link to="/admin/lotes/nuevo" className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i> Nuevo Lote
      </Link>
      <ul className="listado-clientes">
        {lotes.length === 0 ? (
          <p>No hay lotes registrados aún</p>
        ) : (
          lotes.map((l) => <Lote key={l._id} lote={l} eliminarLote={eliminarLote} />)
        )}
      </ul>
    </Fragment>
  );
};

export default Lotes;
