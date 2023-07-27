import React, { useEffect, useState } from "react";

export const ListaSolicitudes = ({ numEmpleado }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const num_empleado = localStorage.getItem("id");
  const registrosPorPagina = 5; // Cambiamos a 5 registros por página

  useEffect(() => {
    obtenerSolicitudes();
    async function obtenerSolicitudes() {
      try {
        const response = await fetch(
          `http://localhost:8081/Solicitudes_Coordinador?num_empleado=${num_empleado}`
        );
        const data = await response.json();
        const solicitudesPendientes = data.filter(
          solicitud => solicitud.estado.toLowerCase() === "pendiente"
        );
        setSolicitudes(solicitudesPendientes.reverse());
        console.log("Solicitudes obtenidas:", solicitudesPendientes);
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
  const registrosActuales = solicitudes.slice(indicePrimerRegistro, indiceUltimoRegistro);

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

  return (
    <>
      <br /><br />
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-center my-3">
              <h3>Historial de Solicitudes Pendientes</h3>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Tipo de solicitud</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Justificación</th>
                  <th scope="col">Carrera o Centro a Cambiar</th>
                  <th scope="col">Acciones</th>
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
                      <div className="py-3">
                        <div className="d-flex ">
                          <button
                            className="btn btn-success mx-3"
                            id="Aprobada"
                            onClick={() =>
                              updateSolicitud(solicitud.id, "Aprobada")
                            }
                          >
                            Aceptar
                          </button>
                          <button
                            className="btn btn-success mx-3"
                            id="Rechazada"
                            onClick={() =>
                              updateSolicitud(solicitud.id, "Rechazada")
                            }
                          >
                            Rechazar
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <nav>
              <ul className="pagination justify-content-center">
                {Array.from({ length: totalPaginas }, (_, index) => index + 1).map(
                  (pagina) => (
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
                  )
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};



