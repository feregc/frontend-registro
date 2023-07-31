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
          Atras
        </button>
        <div className="row ">
          <div className="d-flex justify-content-center align-items-center">
            <h3>Solicitudes </h3>
          </div>
          <br />

          <div className="col my-4">
            <button
              className="btn btn-primary btn-w"
              onClick={SolicitudCarmbioCarrera}
            >
              Solicitar Cambio de carrera
            </button>
          </div>

         <div className="col my-3">
              <button
                className="btn btn-primary btn-w"
                onClick={SolicitudCancelacionExcepcional}
              >
                Solicitar cancelación excepcional
              </button>
            </div> 

          <div className="col my-4">
            <button
              className="btn btn-primary btn-w"
              onClick={SolicitudCambioCentro}
            >
              Solicitar cambio de centro
            </button>
          </div>
          <div className="col my-4">
            <button
              className="btn btn-primary btn-w"
              onClick={SolicitudPagoReposicion}
            >
              Solicitar pago de reposición
            </button>
          </div>
          <div className="col my-4">
            <button className="btn btn-primary btn-w" onClick={VerSolicitudes}>
              Ver <br />
              solicitudes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
