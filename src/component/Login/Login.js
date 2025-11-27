import React, { useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usuarioOCorreo, setUsuarioOCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const enviarLogin = async (e) => {
    e.preventDefault();

    try {
      let response;
      // Detecta si es correo válido
      const esCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuarioOCorreo);

      if (esCorreo) {
        // Login comprador
        response = await clienteAxios.post("/api/compradores/login", {
          correo: usuarioOCorreo,
          password,
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("comprador", JSON.stringify(response.data.comprador));

        Swal.fire("Bienvenido", "Login correcto", "success");
        navigate("/comprador/inicio");
      } else {
        // Login administrador
        response = await clienteAxios.post("/api/administrador/login", {
          usuario: usuarioOCorreo,
          password,
        });

        localStorage.setItem("token", response.data.token);

        Swal.fire("Bienvenido", "Login correcto", "success");
        navigate("/admin/administradores");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.mensaje || "Credenciales incorrectas",
        "error"
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>

      <form onSubmit={enviarLogin}>
        <div className="campo">
          <label>Usuario o Correo</label>
          <input
            type="text"
            value={usuarioOCorreo}
            onChange={(e) => setUsuarioOCorreo(e.target.value.trim())}
            required
          />
        </div>

        <div className="campo">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            required
          />
        </div>

        <button type="submit" className="btn btn-verde">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
