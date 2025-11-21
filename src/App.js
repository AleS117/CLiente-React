import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Inicio
import Inicio from "./component/inicio/Inicio.js";

// Logins
import LoginAdmin from "./component/Login/LoginAdmin.js";
import LoginComprador from "./component/Login/LoginComprador.js";




// Layout
import Header from "./component/layout/Header";
import Navegacion from "./component/layout/Navegacion";

// Listas
import Administradores from "./component/administrador/Administradores.js";
import Compradores from "./component/comprador/Compradores.js";
import Compras from "./component/compras/Compras.js";
import Especies from "./component/especies/Especie.js";
import Lotes from "./component/lotes/Lotes.js";
import Tipos from "./component/tipo/Tipo.js";

function App() {
  return (
    <BrowserRouter forceRefresh={true}>
      <Fragment>
        <Routes>

          {/* 🔵 Pantalla inicial */}
          <Route path="/" element={<Inicio />} />

          {/* 🔵 Logins */}
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/login-comprador" element={<LoginComprador />} />
          <Route path="comprador/inicio" element={<InicioComprador />} />
          <Route path="comprador/compras" element={<ComprasDelComprador />} />

          {/* 🔵 Panel principal */}
          <Route
            path="/*"
            element={
              <Fragment>
                <Header />
                <div className="grid contenedor contenido-principal">
                  <Navegacion />

                  <main className="caja-contenido col-9">
                    <Routes>
                      <Route path="administradores" element={<Administradores />} />
                      <Route path="compradores" element={<Compradores />} />
                      <Route path="compras" element={<Compras />} />
                      <Route path="especies" element={<Especies />} />
                      <Route path="lotes" element={<Lotes />} />
                      <Route path="tipos" element={<Tipos />} />
                    </Routes>
                  </main>
                </div>
              </Fragment>
            }
          />

        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
