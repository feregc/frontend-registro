import React, { useEffect, useState } from "react";
import Modal from "react-modal";

export const ListaSolicitudes = ({ numEmpleado }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const num_empleado = localStorage.getItem("id");
  const registrosPorPagina = 5; 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [observacion, setObservacion] = useState("");
  const [solicitudId, setSolicitudId] = useState(null);

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

  const totalPaginas = Math.ceil(solicitudes.length / registrosPorPagina);

  const updateSolicitud = (id, estado) => {
    if (!observacion.trim()) {
      alert("Por favor, ingrese una observación.");
      return;
    }

    const url = `http://localhost:8081/ActualizarEstado/${id}`;

    const data = {
      estado: estado,
      observacion: observacion,
    };

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

    closeModal();
    window.location.reload(); 
  };

  const openModal = (id) => {
    setSolicitudId(id);
    setIsModalOpen(true);
    console.log("Modal abierto para la solicitud con ID:", id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setObservacion("");
    setSolicitudId(null);
  };

  const handleVisualizarArchivo = (urlDocumento) => {
    window.open(urlDocumento, '_blank');
  };

  const regresar = () => {
    window.history.back()
  };

  return (
    <>
      <div className="container">
      <button className="btn btn-success my-4" onClick={regresar}>
          Atras
        </button>
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
                  <th scope="col">Carrera, Centro o Clase</th>
                  <th scope="col">Documento</th>
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
                      {solicitud.nombre_clase}
                    </td>
                    <td className="p-4" scope="row">
                      <button 
                        className="btn btn-success mx-3" 
                        onClick={() => handleVisualizarArchivo(`http://localhost:8081/${solicitud.documento}`)}
                      >
                        Visualizar Archivo
                      </button>
                    </td>
                    <td className="p-4" scope="row">
                      <div className="py-3">
                        <div className="d-flex ">
                          <button
                            className="btn btn-success mx-3"
                            id="Aprobada"
                            onClick={() => openModal(solicitud.id)}
                          >
                            Aceptar o Rechazar
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

      {/* Modal de Confirmación */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        
        ariaHideApp={false} 
      >
         <h3 className="modal-title">¿Desea Aceptar o Rechazar esta solicitud?</h3>
  <div className="modal-body">
    <div className="form-group">
      <label htmlFor="observacion">Observación:</label>
      <textarea
        id="observacion"
        className="form-control"
        value={observacion}
        onChange={(e) => setObservacion(e.target.value)}
      />
    </div>
  </div>
  <div className="modal-footer">
    <button
      className="btn btn-success"
      onClick={() => updateSolicitud(solicitudId, "Aprobada")}
    >
      Aceptar
    </button>
    <button
      className="btn btn-danger"
      onClick={() => updateSolicitud(solicitudId, "Rechazada")}
    >
      Rechazar
    </button>
    <button className="btn btn-secondary" onClick={closeModal}>
      Cancelar
    </button>
  </div>
</Modal>
   
    </>
  );
};
