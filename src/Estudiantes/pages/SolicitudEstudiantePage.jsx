import { useNavigate } from "react-router-dom";

export const SolicitudEstudiantePage = () => {
  const navigate = useNavigate();

  const SolicitudCarmbioCarrera = () => {
    navigate("../SolicitudPage", {
      state: { tipoSolicitud: "Cambio de Carrera" },
    });
  };

  const SolicitudCancelacionExcepcional = () => {
    navigate("../SolicitudPage", {
      state: { tipoSolicitud: "Cancelación Excepcional" },
    });
  };

  const SolicitudCambioCentro = () => {
    navigate("../SolicitudPage", {
      state: { tipoSolicitud: "Cambio de Centro" },
    });
  };

  const SolicitudPagoReposicion = () => {
    navigate("../SolicitudPage", {
      state: { tipoSolicitud: "Pago Reposición" },
    });
  };

  const VerSolicitudes = () => {
    navigate("../VerSolicitudPage", {});
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
        <div className="row ">
          <div className="d-flex justify-content-center align-items-center">
            <h3>Solicitudes </h3>
          </div>
          <br />

          <div className="col my-4">
            <button
              className="btn btn-primary btn-w btn-h"
              onClick={SolicitudCarmbioCarrera}
            >
              Solicitar Cambio de carrera
            </button>
          </div>

          <div className="col my-4">
            <button
              className="btn btn-primary btn-w btn-h"
              onClick={SolicitudCancelacionExcepcional}
            >
              Solicitar Cancelación Excepcional
            </button>
          </div>

          <div className="col my-4">
            <button
              className="btn btn-primary btn-w btn-h"
              onClick={SolicitudCambioCentro}
            >
              Solicitar Cambio de Centro
            </button>
          </div>
          <div className="col my-4">
            <button
              className="btn btn-primary btn-w btn-h"
              onClick={SolicitudPagoReposicion}
            >
              Solicitar Pago de Reposición
            </button>
          </div>
          <div className="col my-4">
            <button
              className="btn btn-primary btn-w btn-h"
              onClick={VerSolicitudes}
            >
              Ver solicitudes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
