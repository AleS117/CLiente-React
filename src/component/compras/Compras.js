import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Compra from "./Compra";

const Compras = () => {
  const [compras, setCompras] = useState([]);

  // Consultar todas las compras
  const consultarAPI = async () => {
    try {
      const respuesta = await clienteAxios.get("/api/compras/consulta", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setCompras(respuesta.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  // Función para eliminar una compra del estado
  const eliminarCompraDelState = (id) => {
    setCompras(compras.filter(c => c._id !== id));
  };

  return (
    <Fragment>
      <h2>Compras</h2>

      <ul className="listado-clientes">
        {compras.map(c => (
          <Compra
            key={c._id}
            compra={c}
            onEliminar={eliminarCompraDelState} // Pasa la función al componente hijo
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default Compras;
