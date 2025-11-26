import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const Compradores = () => {
    const [compradores, setCompradores] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editComprador, setEditComprador] = useState(null);
    const [formData, setFormData] = useState({
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        correo: "",
        direccion: "",
        password: ""
    });

    const token = localStorage.getItem("token");

    const consultarAPI = async () => {
        try {
            const respuesta = await clienteAxios.get("/api/compradores/consulta", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCompradores(respuesta.data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        consultarAPI();
    }, []);

    const handleNuevo = () => {
        setFormData({
            nombre: "",
            apellido_paterno: "",
            apellido_materno: "",
            correo: "",
            direccion: "",
            password: ""
        });
        setEditComprador(null);
        setShowForm(true);
    };

    const handleEditar = (c) => {
        setFormData({
            nombre: c.nombre,
            apellido_paterno: c.apellido_paterno,
            apellido_materno: c.apellido_materno,
            correo: c.correo || "",
            direccion: c.direccion || "",
            password: "" // password vacío para editar sin cambiar
        });
        setEditComprador(c);
        setShowForm(true);
    };

    const handleEliminar = async (id) => {
        const confirm = await Swal.fire({
            title: "¿Eliminar comprador?",
            text: "No podrás revertir esto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (confirm.isConfirmed) {
            try {
                await clienteAxios.delete(`/api/compradores/eliminar/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                Swal.fire("Eliminado!", "Comprador eliminado correctamente", "success");
                consultarAPI();
            } catch (error) {
                Swal.fire("Error", "No se pudo eliminar", "error");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editComprador) {
                const data = {
                    nombre: formData.nombre,
                    apellido_paterno: formData.apellido_paterno,
                    apellido_materno: formData.apellido_materno,
                    correo: formData.correo,
                    direccion: formData.direccion
                };

                // solo enviamos password si se cambió
                if (formData.password && formData.password.trim() !== "") {
                    data.password = formData.password;
                }

                await clienteAxios.put(`/api/compradores/actualizar/${editComprador._id}`, data, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                Swal.fire("Actualizado!", "Comprador actualizado correctamente", "success");
            } else {
                await clienteAxios.post("/api/compradores/crear", formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                Swal.fire("Creado!", "Comprador creado correctamente", "success");
            }
            setShowForm(false);
            consultarAPI();
        } catch (error) {
            console.log(error);
            Swal.fire("Error", "No se pudo guardar", "error");
        }
    };

    return (
        <Fragment>
            <h2>Compradores</h2>
            <button className="btn btn-verde nvo-cliente" onClick={handleNuevo}>
                <i className="fas fa-plus-circle"></i> Nuevo Comprador
            </button>

            <ul className="listado-clientes">
                {compradores.map(c => (
                    <li key={c._id} className="cliente-item">
                        {c.nombre} {c.apellido_paterno} {c.apellido_materno}
                        <button
                            className="btn btn-azul"
                            onClick={() => handleEditar(c)}
                            style={{ marginLeft: "10px" }}
                        >
                            Editar
                        </button>
                        <button
                            className="btn btn-rojo"
                            onClick={() => handleEliminar(c._id)}
                            style={{ marginLeft: "10px" }}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>

            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{editComprador ? "Editar Comprador" : "Nuevo Comprador"}</h3>
                        <form onSubmit={handleSubmit}>
                            <label>Nombre:</label>
                            <input
                                type="text"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                required
                            />
                            <label>Apellido Paterno:</label>
                            <input
                                type="text"
                                value={formData.apellido_paterno}
                                onChange={(e) => setFormData({ ...formData, apellido_paterno: e.target.value })}
                                required
                            />
                            <label>Apellido Materno:</label>
                            <input
                                type="text"
                                value={formData.apellido_materno}
                                onChange={(e) => setFormData({ ...formData, apellido_materno: e.target.value })}
                                required
                            />
                            <label>Correo:</label>
                            <input
                                type="email"
                                value={formData.correo}
                                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                                required
                            />
                            <label>Dirección:</label>
                            <input
                                type="text"
                                value={formData.direccion}
                                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                                required
                            />
                            <label>Contraseña:</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required={!editComprador} // obligatorio solo si es nuevo
                            />
                            <div style={{ marginTop: "10px" }}>
                                <button type="submit" className="btn btn-verde">Guardar</button>
                                <button
                                    type="button"
                                    className="btn btn-gris"
                                    onClick={() => setShowForm(false)}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                .modal {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .modal-content {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    width: 400px;
                }
            `}</style>
        </Fragment>
    );
};

export default Compradores;
