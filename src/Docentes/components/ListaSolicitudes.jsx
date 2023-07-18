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
              <h3>Historial de Solicitudes</h3>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Tipo de solicitud</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Jutificación</th> <th scope="col">carrera o centreo a cambiar</th>
                  <th scope="col">Acciones</th>
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
          </div>
        </div>
      </div>
    </>
  );
};
