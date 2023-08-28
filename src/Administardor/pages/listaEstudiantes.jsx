import React, { useState, useEffect } from "react";

export const EstudiantesComponentMatriculados = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroNumCuenta, setFiltroNumCuenta] = useState("");
  const [filtroCarrera, setFiltroCarrera] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10; // Cantidad de registros por página

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/EstudianteMatricula`
        );
        const data = await response.json();
        setEstudiantes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [paginaActual]);

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
          <div className="col">
            <div className="row my-3">
              <h2 className="text-center">
                Lista de Estudiantes <br /> Matriculados en el Período Actual
              </h2>
            </div>

            <div className="row my-3">
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

            <div className="row ">
              <div className="col mt-3">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th className="text-center" scope="col">
                        Nombre Completo
                      </th>
                      <th className="text-center" scope="col">
                        Número de Cuenta
                      </th>
                      <th className="text-center" scope="col">
                        Carrera
                      </th>
                      <th className="text-center" scope="col">
                        Cantidad de Clases Matriculadas
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {estudiantesPaginados.map((estudiante) => (
                      <tr key={estudiante.num_cuenta}>
                        <td scope="row" className="text-center">
                          {estudiante.primer_nombre} {estudiante.segundo_nombre}{" "}
                          {estudiante.primer_apellido}{" "}
                          {estudiante.segundo_apellido}
                        </td>
                        <td scope="row" className="text-center">
                          {estudiante.num_cuenta}
                        </td>
                        <td scope="row" className="text-center">
                          {estudiante.nombre_carrera}
                        </td>
                        <td scope="row" className="text-center">
                          {estudiante.cantidad_secciones}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <nav>
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${
                        paginaActual === 1 ? "disabled" : ""
                      }`}
                      onClick={() => cambiarPagina(paginaActual - 1)}
                      disabled={paginaActual === 1}
                    >
                      <button className="page-link">Anterior</button>
                    </li>
                    {Array.from(
                      { length: totalPaginas },
                      (_, index) => index + 1
                    ).map((pagina) => (
                      <li
                        key={pagina}
                        className={`page-item ${
                          pagina === paginaActual ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link "
                          onClick={() => cambiarPagina(pagina)}
                        >
                          {pagina}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        paginaActual ===
                        Math.ceil(totalPaginas.length / elementosPorPagina)
                          ? "disabled"
                          : ""
                      }`}
                      onClick={() => cambiarPagina(paginaActual + 1)}
                      disabled={paginaActual === totalPaginas}
                    >
                      <button className="page-link ">Siguiente</button>
                    </li>
                  </ul>
                </nav>

                {/* <div className="d-flex justify-content-center">
                  <div className="btn-group w-25">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
