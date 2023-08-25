import React, { useEffect, useState } from "react";

export const HistorialSolicitudes = ({ numEmpleado }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const num_empleado = localStorage.getItem("id");
  const registrosPorPagina = 3;

  useEffect(() => {
    obtenerSolicitudes();
    async function obtenerSolicitudes() {
      try {
        const response = await fetch(
          `http://localhost:8081/Solicitudes_Coordinador?num_empleado=${num_empleado}`
        );
        const data = await response.json();
        setSolicitudes(data.reverse());
        console.log("Solicitudes obtenidas:", data);
      } catch (error) {
        console.error(
          "Error al obtener las solicitudes del coordinador:",
          error
        );
      }
    }
  }, [numEmpleado]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indiceUltimoRegistro = currentPage * registrosPorPagina;
  const indicePrimerRegistro = indiceUltimoRegistro - registrosPorPagina;
  const registrosActuales = solicitudes.slice(
    indicePrimerRegistro,
    indiceUltimoRegistro
  );

  // Calcular el número total de páginas basado en la cantidad actual de registros
  const totalPaginas = Math.ceil(solicitudes.length / registrosPorPagina);

  const updateSolicitud = (id, estado) => {
    const url = `http://localhost:8081/ActualizarEstado/${id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estado: estado }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Estado de solicitud actualizado exitosamente");
        } else {
          console.error("Error al actualizar el estado de la solicitud");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
    window.location.reload();
  };
  const handleVisualizarArchivo = (urlDocumento) => {
    window.open(urlDocumento, "_blank");
  };

  const regresar = () => {
    window.history.back();
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-success mt-4" onClick={regresar}>
          Atrás
        </button>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-center my-3">
              <h3>Historial de Solicitudes</h3>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Tipo de solicitud</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Justificación</th>
                  {/* <th scope="col">{registrosActuales.map((solicitud) => (
                    <label key={solicitud.id}>{solicitud.tipo_solicitud}</label>
                  ))}</th> */}
                  <th scope="col">Carrera o Centro a Cambiar</th>
                  <th scope="col">Observación</th>
                  <th scope="col">Documento</th>
                </tr>
              </thead>
              <tbody>
                {registrosActuales.map((solicitud) => (
                  <tr key={solicitud.id}>
                    <td className="p-4" scope="row">
                      {solicitud.tipo_solicitud}
                    </td>
                    <td className="p-4" scope="row">
                      {solicitud.estado}
                    </td>
                    <td className="p-4" scope="row">
                      {solicitud.justificacion}
                    </td>
                    <td className="p-4" scope="row">
                      {solicitud.nombre_carrera}
                      {solicitud.nombre_centro}
                    </td>
                    <td className="p-4" scope="row">
                      {solicitud.observacion}
                    </td>
                    <td className="p-4" scope="row">
                      <button
                        className="btn btn-success btn-w"
                        onClick={() =>
                          handleVisualizarArchivo(
                            `http://localhost:8081/${solicitud.documento}`
                          )
                        }
                      >
                        Visualizar Archivo
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <nav>
              <ul className="pagination justify-content-center">
                {Array.from(
                  { length: totalPaginas },
                  (_, index) => index + 1
                ).map((pagina) => (
                  <li
                    key={pagina}
                    className={`page-item ${
                      pagina === currentPage ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(pagina)}
                    >
                      {pagina}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
