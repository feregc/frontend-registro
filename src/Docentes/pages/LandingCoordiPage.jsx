import "../../Assets/styles/styles-landing/Landin-styles.css";
import { useNavigate } from "react-router-dom";

export const LandingCoordiPage = () => {
  const navigate = useNavigate();

  const onNavSolicitud = () => {
    navigate("/docente/ListaSolicitud");
  };

  const onNavCargaAca = () => {
    navigate("/docente/CargaAcademica");
  };

  const onHistorial = () => {
    navigate("/docente/historialAcademico");
  };
  const onNavSolicitudHistorial = () => {
    navigate("/docente/HistorialSolicitudes");
  }

  return (
    <>
      <div className="container">
        <div className="col">
          <div className="row">
            <div className="d-flex justify-content-center my-5">
              <h3>Bienvenido coordinador</h3>
            </div>
            <div className="d-flex justify-content-center my-3">
              <button
                className="btn btn-w btn-primary"
                onClick={onNavSolicitudHistorial}
              >
                Historial de solicitudes
              </button>
            </div>
            <div className="d-flex justify-content-center my-3">
              <button
                className="btn btn-w btn-primary"
                onClick={onNavSolicitud}
              >
                Lista de Solicitudes pendientes
              </button>
            </div>
            <div className="d-flex justify-content-center my-3">
              <button className="btn btn-w btn-primary" onClick={onNavCargaAca}>
                Carga Académica
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 d-flex flex-column align-items-center bg-primary "></div>
      <div className="footer z-n1 position-absolute bottom-0 start-50 translate-middle-x">
        <img src="../src/Assets/img/footer-bg.png" alt="" />
      </div>
    </>
  );
};