import React, { useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LoginComprador = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const enviarLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await clienteAxios.post("/api/compradores/login", {
        correo,
        password,
      });

      // ✅ Guardar token
      localStorage.setItem("token", data.token);

      // ✅ Guardar datos del comprador
      localStorage.setItem("comprador", JSON.stringify(data.comprador));

      Swal.fire("Bienvenido", "Login correcto", "success");

      // ✅ Redirección al inicio del comprador
      navigate("/comprador/inicio");
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
      <h2>Login Comprador</h2>

      <form onSubmit={enviarLogin}>
        <div className="campo">
          <label>Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value.trim())}
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

export default LoginComprador;
