// src/component/trabajador/ReporteVentasDia.js
import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";

const isObjectIdString = (s) => {
  return typeof s === "string" && /^[0-9a-fA-F]{24}$/.test(s);
};

const ReporteVentasDia = () => {
  const [fecha, setFecha] = useState("");
  const [compradores, setCompradores] = useState([]);
  const [compradorSeleccionado, setCompradorSeleccionado] = useState("");
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // cargar compradores para filtro
    const cargarCompradores = async () => {
      try {
        const resp = await clienteAxios.get("/api/compradores/consulta", {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        setCompradores(resp.data || []);
      } catch (err) {
        console.error("Error cargando compradores:", err);
      }
    };
    cargarCompradores();
  }, [token]);

  const consultarVentas = async () => {
    if (!fecha) {
      alert("Selecciona una fecha");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // obtenemos todas las compras (ya que filtramos localmente por fecha)
      const resp = await clienteAxios.get("/api/compras/consulta", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      const todas = resp.data || [];

      // rango inicio/fin en UTC local (fecha chosen como yyyy-mm-dd input)
      const inicio = new Date(`${fecha}T00:00:00`);
      const fin = new Date(`${fecha}T23:59:59.999`);

      // filtrar por fecha (campo compra.fecha)
      let filtradas = todas.filter((c) => {
        const f = new Date(c.fecha);
        return f >= inicio && f <= fin;
      });

      // si hay filtro por comprador, aplicarlo
      if (compradorSeleccionado) {
        filtradas = filtradas.filter(
          (c) =>
            // id_comprador puede venir poblado o solo como id
            (c.id_comprador && (c.id_comprador._id ? c.id_comprador._id : c.id_comprador) === compradorSeleccionado) ||
            (String(c.id_comprador) === String(compradorSeleccionado))
        );
      }

      // enriquecer cada compra con campo producto y total mostrado
      const enriquecidas = await Promise.all(
        filtradas.map(async (c) => {
          // total: preferir precio_total
          const total = c.precio_total ?? c.total ?? (c.precio_kilo_final ? Number(c.precio_kilo_final) : 0);

          // determinar producto a partir de id_lte (puede ser número o ObjectId o incluso objeto)
          let producto = "";

          const id_lte = (() => {
            // si id_lte viene como objeto con _id
            if (c.id_lte && typeof c.id_lte === "object" && c.id_lte._id) return c.id_lte._id;
            return c.id_lte;
          })();

          if (!id_lte) {
            producto = "—";
          } else if (isObjectIdString(String(id_lte))) {
            // intentar obtener info del lote
            try {
              const loteResp = await clienteAxios.get(`/api/lotes/consulta/${id_lte}`, {
                headers: { Authorization: token ? `Bearer ${token}` : "" },
              });
              const lote = loteResp.data;
              // armar nombre: Especie (Tipo) o Lote ID si no hay datos
              const especie = lote.id_especie?.nombre ?? lote.especie ?? null;
              const tipo = lote.id_tipo?.nombre ?? lote.tipo ?? null;
              if (especie && tipo) producto = `${especie} (${tipo})`;
              else if (especie) producto = especie;
              else producto = `Lote ${lote._id ?? id_lte}`;
            } catch (err) {
              // si falla la consulta del lote, fallback
              producto = `Lote ${id_lte}`;
            }
          } else {
            // id_lte es número u otro string
            producto = `Lote ${id_lte}`;
          }

          return {
            ...c,
            _mostrar_total: total,
            _mostrar_producto: producto,
          };
        })
      );

      setCompras(enriquecidas);
    } catch (err) {
      console.error(err);
      setError("Error consultando ventas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "20px auto" }}>
      <h2>Reporte del día</h2>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <div>
          <label>Fecha: </label>
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>

        <div>
          <label>Comprador: </label>
          <select value={compradorSeleccionado} onChange={(e) => setCompradorSeleccionado(e.target.value)}>
            <option value="">Todos</option>
            {compradores.map((c) => (
              <option key={c._id} value={c._id}>
                {c.nombre ?? c.correo ?? c._id}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button className="btn btn-verde" onClick={consultarVentas}>Generar</button>
        </div>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {compras.length === 0 && !loading ? (
        <p>No hay ventas para la fecha/filtrado seleccionado.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#eee" }}>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Comprador</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Fecha</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Producto</th>
              <th style={{ border: "1px solid #ddd", padding: 8, textAlign: "right" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((c) => (
              <tr key={c._id}>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>
                  {c.id_comprador?.nombre ?? c.id_comprador ?? "—"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>
                  {new Date(c.fecha).toLocaleString()}
                </td>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>
                  {c._mostrar_producto ?? "—"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "right" }}>
                  ${Number(c._mostrar_total ?? 0).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReporteVentasDia;
