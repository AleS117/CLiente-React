import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const CarritoPage = () => {
  const [carrito, setCarrito] = useState(null);
  const token = localStorage.getItem("token");

  const cargarCarrito = async () => {
    try {
      const res = await clienteAxios.get("/api/carrito", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCarrito(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo cargar el carrito", "error");
    }
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  const actualizarCantidad = async (id_lote, cantidad) => {
    try {
      await clienteAxios.put(
        `/api/carrito/actualizar/${id_lote}`,
        { cantidad },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      cargarCarrito();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo actualizar la cantidad", "error");
    }
  };

  const eliminarItem = async (id_lote) => {
    try {
      await clienteAxios.delete(`/api/carrito/eliminar/${id_lote}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      cargarCarrito();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo eliminar el item", "error");
    }
  };

  const vaciarCarrito = async () => {
    try {
      await clienteAxios.delete(`/api/carrito/vaciar`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      cargarCarrito();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo vaciar el carrito", "error");
    }
  };

  const finalizarCompra = async () => {
    try {
      const res = await clienteAxios.post(
        `/api/carrito/comprar`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Compra realizada", "Tu compra se ha registrado", "success");
      console.log("Compras creadas:", res.data.compras);

      // Refresca carrito vacío
      cargarCarrito();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo completar la compra", "error");
    }
  };

  if (!carrito) return <p>Cargando carrito...</p>;

  return (
    <div>
      <h2>Tu carrito</h2>
      {carrito.items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {carrito.items.map((it) => {
              const lote = it.id_lote || {};
              return (
                <li key={lote._id}>
                  <div>
                    <strong>{lote.nombre || `Lote ${lote._id}`}</strong>
                    <div>
                      Cantidad:
                      <input
                        type="number"
                        value={it.cantidad}
                        min="1"
                        onChange={(e) => actualizarCantidad(lote._id, e.target.value)}
                        style={{ width: 80, marginLeft: 8 }}
                      />
                      <button onClick={() => eliminarItem(lote._id)} style={{ marginLeft: 8 }}>
                        Eliminar
                      </button>
                    </div>
                    <div>Precio/kg: ${lote.precio_kilo || 0}</div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div style={{ marginTop: 12 }}>
            <button onClick={vaciarCarrito} className="btn btn-gris">
              Vaciar carrito
            </button>
            <button
              onClick={finalizarCompra}
              className="btn btn-verde"
              style={{ marginLeft: 8 }}
            >
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CarritoPage;
