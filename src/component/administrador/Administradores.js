import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Administrador from "./Administrador";
import { Link } from "react-router-dom";

const Administradores = () => {
    const [admins, setAdmins] = useState([]);

    const consultarAPI = async () => {
        try {
            const respuesta = await clienteAxios.get("/api/administrador/consulta", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            setAdmins(respuesta.data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        consultarAPI();
    }, []);

    return (
        <Fragment>
            <h2>Administradores</h2>

            <Link to={"/administradores/nuevo"} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i> Nuevo Administrador
            </Link>

            <ul className="listado-clientes">
                {admins.map(admin => (
                    <Administrador
                        key={admin._id}
                        admin={admin}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default Administradores;
