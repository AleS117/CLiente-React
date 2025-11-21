import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Compra from "./Compra";
import { Link } from "react-router-dom";

const Compras = () => {
    const [compras, setCompras] = useState([]);

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

    return (
        <Fragment>
            <h2>Compras</h2>

            <Link to={"/compras/nuevo"} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i> Nueva Compra
            </Link>

            <ul className="listado-clientes">
                {compras.map(c => (
                    <Compra
                        key={c._id}
                        compra={c}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default Compras;
