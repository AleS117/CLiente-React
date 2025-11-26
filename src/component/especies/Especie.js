const consultarAPI = async () => {
  try {
    setLoading(true);
    const respuesta = await clienteAxios.get("/api/especies/consulta", {
      headers: { Authorization: `Bearer ${token}` },
    });
    // respuesta.data debe traer tipo ya poblado
    setEspecies(respuesta.data);
  } catch (err) {
    setError("Error al obtener las especies");
  } finally {
    setLoading(false);
  }
};
