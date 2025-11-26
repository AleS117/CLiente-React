// Tipos.js
import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { Link } from "react-router-dom";
import TipoItem from "./TipoItem";

const Tipos = () => {
  const [tipos, setTipos] = useState([]);

  const consultarAPI = async () => {
    try {
      const respuesta = await clienteAxios.get("/api/tipo/consulta", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTipos(respuesta.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  return (
    <div>
      <h2>Tipos</h2>
      <Link to="/tipo/nuevo" className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i> Nuevo Tipo
      </Link>

      <ul className="listado-clientes">
        {tipos.map((tipo) => (
          <TipoItem key={tipo._id} tipo={tipo} />
        ))}
      </ul>
    </div>
  );
};

export default Tipos;
