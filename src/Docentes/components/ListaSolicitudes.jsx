import { useEffect, useState } from "react";

export const ListaSolicitudes = ({ numEmpleado }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const num_empleado = localStorage.getItem("id");

  useEffect(() => {
    obtenerSolicitudes();
    async function obtenerSolicitudes() {
      try {
        const response = await fetch(
          `http://localhost:8081/Solicitudes_Coordinador?num_empleado=${num_empleado}`
        );
        const data = await response.json();
        setSolicitudes(data);
        console.log("Solicitudes obtenidas:", data);
      } catch (error) {
        console.error(
          "Error al obtener las solicitudes del coordinador:",
          error
        );
      }
    }
  }, [numEmpleado]);

  const aceptarSolicitud = (solicitudId) => {
    console.log(`Solicitud ${solicitudId} aceptada`);
  };

  const rechazarSolicitud = (solicitudId) => {
    console.log(`Solicitud ${solicitudId} rechazada`);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-center my-3">
              <h3>Solicitudes del coordinador</h3>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Tipo de solicitud</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Jutificacion</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((solicitud) => (
                  <tr key={solicitud.id}>
                    <td scope="row">{solicitud.tipo_solicitud}</td>
                    <td scope="row">{solicitud.estado}</td>
                    <td scope="row">{solicitud.justificacion}</td>
                    <td scope="row">
                      <button className="btn btn-success" onClick={() => aceptarSolicitud(solicitud.id)}>
                        Aceptar
                      </button>
                      <button className="btn btn-success" onClick={() => rechazarSolicitud(solicitud.id)}>
                        Rechazar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
