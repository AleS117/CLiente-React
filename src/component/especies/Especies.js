import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Especie from "./Especie";
import { Link } from "react-router-dom";

const Especies = () => {
    const [especies, setEspecies] = useState([]);

    const consultarAPI = async () => {
        try {
            const respuesta = await clienteAxios.get("/api/especies/consulta", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            setEspecies(respuesta.data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        consultarAPI();
    }, []);

    return (
        <Fragment>
            <h2>Especies</h2>

            <Link to={"/especies/nuevo"} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i> Nueva Especie
            </Link>

            <ul className="listado-clientes">
                {especies.map(e => (
                    <Especie
                        key={e._id}
                        especie={e}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default Especies;

