import React, { useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const enviarLogin = async (e) => {
  e.preventDefault();

  try {
    const respuesta = await clienteAxios.post(
      "/api/administrador/login",
      { usuario, password }
    );

    localStorage.setItem("token", respuesta.data.token);

    Swal.fire("Bienvenido", "Login correcto", "success");

    // 🔹 Aquí cambiamos la ruta para que vaya al layout del admin
    navigate("/admin/administradores");

  } catch (error) {
    Swal.fire("Error", "Usuario o contraseña incorrectos", "error");
  }
};


  return (
    <div className="login-container">
      <h2>Login Administrador</h2>

      <form onSubmit={enviarLogin}>
        <div className="campo">
          <label>Usuario</label>
          <input 
            type="text" 
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required />
        </div>

        <div className="campo">
          <label>Contraseña</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>

        <button type="submit" className="btn btn-azul">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginAdmin;
