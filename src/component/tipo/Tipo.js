import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Tipo from "./Tipo";
import { Link } from "react-router-dom";

const Tipos = () => {
    const [tipos, setTipos] = useState([]);

    const consultarAPI = async () => {
        try {
            const respuesta = await clienteAxios.get("/api/tipo/consulta", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
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
        <Fragment>
            <h2>Tipos</h2>

            <Link to={"/tipos/nuevo"} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i> Nuevo Tipo
            </Link>

            <ul className="listado-clientes">
                {tipos.map(t => (
                    <Tipo
                        key={t._id}
                        tipo={t}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default Tipos;
