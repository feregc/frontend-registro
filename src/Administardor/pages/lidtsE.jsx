import React, { useState, useEffect } from "react";

export const EstudiantesComponent = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroNumCuenta, setFiltroNumCuenta] = useState("");
  const [filtroCarrera, setFiltroCarrera] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10; // Cantidad de registros por página

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/EstudianteLista`);
        const data = await response.json();
        setEstudiantes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [paginaActual]);

  // Lógica de filtrado y paginación
  const estudiantesFiltrados = estudiantes.filter(
    (estudiante) =>
      estudiante.primer_nombre
        .toLowerCase()
        .includes(filtroNombre.toLowerCase()) &&
      estudiante.num_cuenta.toString().includes(filtroNumCuenta) &&
      estudiante.nombre_carrera
        .toLowerCase()
        .includes(filtroCarrera.toLowerCase())
  );

  const totalPaginas = Math.ceil(
    estudiantesFiltrados.length / elementosPorPagina
  );
  const indiceUltimoElemento = paginaActual * elementosPorPagina;
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
  const estudiantesPaginados = estudiantesFiltrados.slice(
    indicePrimerElemento,
    indiceUltimoElemento
  );

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  const regresar = () => {
    window.history.back();
  };

  return (
    <>
      <div className="container">
        <div className="my-4">
          <button className="btn btn-primary" onClick={regresar}>
            Atrás
          </button>
        </div>
        <div className="row">
          <div className="col my-3">
            <h2 className="text-center">Lista de Estudiantes</h2>
          </div>
        </div>
        <div className="row my-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Filtrar por nombre"
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Filtrar por número de cuenta"
              value={filtroNumCuenta}
              onChange={(e) => setFiltroNumCuenta(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Filtrar por carrera"
              value={filtroCarrera}
              onChange={(e) => setFiltroCarrera(e.target.value)}
            />
          </div>
        </div>
        <div className="col">
          <table className="table table-striped my-3">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  Número de Cuenta
                </th>
                <th scope="col" className="text-center">
                  Nombre
                </th>
                <th scope="col" className="text-center">
                  Apellidos
                </th>
                <th scope="col" className="text-center">
                  Correo Institucional
                </th>
                <th scope="col" className="text-center">
                  Carrera
                </th>
              </tr>
            </thead>
            <tbody>
              {estudiantesPaginados.map((estudiante) => (
                <tr key={estudiante.num_cuenta}>
                  <td scope="row" className="text-center">
                    {estudiante.num_cuenta}
                  </td>
                  <td scope="row" className="text-center">
                    {estudiante.primer_nombre} {estudiante.segundo_nombre}
                  </td>
                  <td scope="row" className="text-center">
                    {estudiante.primer_apellido} {estudiante.segundo_apellido}
                  </td>
                  <td scope="row" className="text-center">
                    {estudiante.correo_institucional}
                  </td>
                  <td scope="row" className="text-center">
                    {estudiante.nombre_carrera}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <div className="btn-group w-25 ">
              <button
                className="btn btn-primary"
                onClick={() => cambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
              >
                Anterior
              </button>
              <button
                className="btn btn-primary"
                onClick={() => cambiarPagina(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
