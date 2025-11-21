import React from 'react';
import { Link } from 'react-router-dom';

const Navegacion = () => {
    return (
        <aside className="sidebar col-3">
            <h2>Administración</h2>

            <nav className="navegacion">

                {/* Administradores */}
                <Link to={"/administradores"} className="administradores">
                    Administradores
                </Link>

                {/* Compradores */}
                <Link to={"/compradores"} className="compradores">
                    Compradores
                </Link>

                {/* Compras */}
                <Link to={"/compras"} className="compras">
                    Compras
                </Link>

                {/* Especies */}
                <Link to={"/especies"} className="especies">
                    Especies
                </Link>

                {/* Lotes */}
                <Link to={"/lotes"} className="lotes">
                    Lotes
                </Link>

                {/* Tipos */}
                <Link to={"/tipos"} className="tipos">
                    Tipos
                </Link>
            </nav>
        </aside>
    );
};

export default Navegacion;
