import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { Link } from "react-router-dom";
import TipoItem from "./TipoItem";
import Swal from "sweetalert2";

const Tipos = () => {
  const [tipos, setTipos] = useState([]);

  const consultarAPI = async () => {
    try {
      const respuesta = await clienteAxios.get("/api/tipos/consulta", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTipos(respuesta.data);
    } catch (error) {
      console.error("Error al cargar tipos:", error);
      Swal.fire("Error", "No se pudieron cargar los tipos", "error");
    }
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  return (
    <div>
      <h2>Tipos</h2>
      <Link to="/admin/tipos/nuevo" className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i> Nuevo Tipo
      </Link>

      <ul className="listado-clientes">
        {tipos.length === 0 ? (
          <p>No hay tipos registrados aún</p>
        ) : (
          tipos.map((tipo) => <TipoItem key={tipo._id} tipo={tipo} />)
        )}
      </ul>
    </div>
  );
};

export default Tipos;
