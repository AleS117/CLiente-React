import React, { useState, useEffect, Fragment } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { Link } from "react-router-dom";

// Componente para cada especie
function Especie({ especie, onEliminar }) {
  if (!especie) return null;

  const { _id, nombre, tipo, imagen } = especie;

  return (
    <li className="especie-item">
      <div className="info-especie">
        <p><b>ID:</b> {_id}</p>
        <p><b>Nombre:</b> {nombre}</p>
        <p><b>Tipo:</b> {tipo ? tipo.nombre : "Sin tipo"}</p>
        {imagen && <img src={imagen} alt={nombre} width="80" />}
      </div>

      <div className="acciones">
        <Link to={`/admin/especies/editar/${_id}`} className="btn btn-azul">
          Editar
        </Link>
        <button className="btn btn-rojo" onClick={() => onEliminar(_id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
}

const Especies = () => {
  const [especies, setEspecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const consultarAPI = async () => {
    try {
      setLoading(true);
      const respuesta = await clienteAxios.get("/api/especies/consulta", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEspecies(respuesta.data);
    } catch (err) {
      console.error(err);
      setError("Error al obtener las especies");
    } finally {
      setLoading(false);
    }
  };

  const eliminarEspecie = (id) => {
    Swal.fire({
      title: "¿Eliminar especie?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
    }).then(async (r) => {
      if (r.isConfirmed) {
        try {
          await clienteAxios.delete(`/api/especies/eliminar/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Swal.fire("Eliminado", "La especie fue eliminada.", "success");
          setEspecies(especies.filter((esp) => esp._id !== id));
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "No se pudo eliminar la especie", "error");
        }
      }
    });
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  return (
    <Fragment>
      <h2>Especies</h2>

      <Link to="/admin/especies/nuevo" className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i> Nueva Especie
      </Link>

      {loading && <p>Cargando especies...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && especies.length === 0 && <p>No hay especies registradas.</p>}

      <ul className="listado-clientes">
        {especies.map((esp) => (
          <Especie key={esp._id} especie={esp} onEliminar={eliminarEspecie} />
        ))}
      </ul>
    </Fragment>
  );
};

export default Especies;
