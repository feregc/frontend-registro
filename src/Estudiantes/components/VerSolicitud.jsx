import { useEffect, useState } from "react";

export const ListaSolicitudes = ({ numCuenta }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const num_cuenta = localStorage.getItem("id");

  useEffect(() => {
    obtenerSolicitudes();
    async function obtenerSolicitudes() {
      try {
        const response = await fetch(
          `http://localhost:8081/VerSolicitud?num_cuenta=${num_cuenta}`
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
  }, [numCuenta]);

 
  return (
    <>
    <br /><br />
      <div className="container">
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
                  <th scope="col">Jutificación</th>
                 
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((solicitud) => (
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