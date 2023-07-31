import React, { useEffect, useState } from "react";

export const ListaSolicitudes = ({ numCuenta }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const num_cuenta = localStorage.getItem("id");
  const registrosPorPagina = 5; // Cambiamos a 5 registros por página

  useEffect(() => {
    obtenerSolicitudes();
    async function obtenerSolicitudes() {
      try {
        const response = await fetch(
          `http://localhost:8081/VerSolicitud?num_cuenta=${num_cuenta}`
        );
        const data = await response.json();
        setSolicitudes(data.reverse()); // Invertimos el orden del array
        console.log("Solicitudes obtenidas:", data);
      } catch (error) {
        console.error(
          "Error al obtener las solicitudes del coordinador:",
          error
        );
      }
    }
  }, [numCuenta]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indiceUltimoRegistro = currentPage * registrosPorPagina;
  const indicePrimerRegistro = indiceUltimoRegistro - registrosPorPagina;

   const registrosActuales = solicitudes.slice(indicePrimerRegistro, indiceUltimoRegistro);

  // Calcular el número total de páginas basado en la cantidad actual de registros
  const totalPaginas = Math.ceil(solicitudes.length / registrosPorPagina);

  const regresar = () => {
    window.history.back();
  };


 
  return (
    <>
      <br />

      <div className="container">
        <button className="btn btn-success mt-4" onClick={regresar}>
          Atras
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


                  <th scope="col">Observacion</th>

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
                      {solicitud.observacion}
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

