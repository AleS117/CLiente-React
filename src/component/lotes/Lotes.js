import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Lote from "./Lote";
import { Link } from "react-router-dom";

const Lotes = () => {
    const [lotes, setLotes] = useState([]);

    const consultarAPI = async () => {
        try {
            const respuesta = await clienteAxios.get("/api/lotes/consulta", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            setLotes(respuesta.data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        consultarAPI();
    }, []);

    return (
        <Fragment>
            <h2>Lotes</h2>

            <Link to={"/lotes/nuevo"} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i> Nuevo Lote
            </Link>

            <ul className="listado-clientes">
                {lotes.map(l => (
                    <Lote
                        key={l._id}
                        lote={l}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default Lotes;
