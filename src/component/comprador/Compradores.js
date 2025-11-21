import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Comprador from "./Comprador";
import { Link } from "react-router-dom";

const Compradores = () => {
    const [compradores, setCompradores] = useState([]);

    const consultarAPI = async () => {
        try {
            const respuesta = await clienteAxios.get("/api/compradores/consulta", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setCompradores(respuesta.data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        consultarAPI();
    }, []);

    return (
        <Fragment>
            <h2>Compradores</h2>

            <Link to={"/compradores/nuevo"} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i> Nuevo Comprador
            </Link>

            <ul className="listado-clientes">
                {compradores.map(c => (
                    <Comprador
                        key={c._id}
                        comprador={c}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default Compradores;
