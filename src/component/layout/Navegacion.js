import React from 'react';
import { Link } from 'react-router-dom';

const Navegacion = () => {
    return (
        <aside className="sidebar col-3">
            <h2>Administración</h2>

            <nav className="navegacion">

                {/* Administradores */}
                <Link to="/admin/administradores" className="administradores">
                    Administradores
                </Link>

                {/* Compradores */}
                <Link to="/admin/compradores" className="compradores">
                    Compradores
                </Link>

                {/* Compras */}
                <Link to="/admin/compras" className="compras">
                    Compras
                </Link>

                {/* Especies */}
                <Link to="/admin/especies" className="especies">
                    Especies
                </Link>

                {/* Lotes */}
                <Link to="/admin/lotes" className="lotes">
                    Lotes
                </Link>

                {/* Tipos */}
                <Link to="/admin/tipos" className="tipos">
                    Tipos
                </Link>

            </nav>
        </aside>
    );
};

export default Navegacion;
