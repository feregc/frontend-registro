import "../../Assets/styles/styles-landing/Landin-styles.css";
import { useNavigate, Link } from "react-router-dom";
import { LandingDocente } from "../components/LandingDocente";

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
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-center my-5">
              <h2>Bienvenido Coordinador</h2>
            </div>
          </div>
          <div className="row">
            <div className="d-flex justify-content-center my-2">
              <Link to="../perfil">
                <button className="btn btn-w btn-h btn-primary">Perfil</button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center my-3">
              <h3>Acciones</h3>
            </div>
          </div>

          <div className="row">
            <div className="col d-flex justify-content-center my-3">
              <button
                className="btn btn-w btn-h btn-primary"
                onClick={onNavSolicitudHistorial}
              >
                Historial de solicitudes
              </button>
            </div>
            <div className="col d-flex justify-content-center my-3">
              <button
                className="btn btn-w btn-h btn-primary"
                onClick={onNavSolicitud}
              >
                Lista de Solicitudes pendientes
              </button>
            </div>
            <div className="col d-flex justify-content-center my-3">
              <button
                className="btn btn-w btn-h btn-primary"
                onClick={onNavCargaAca}
              >
                Carga Académica
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center my-3">
              <LandingDocente />
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
      <div className="my-5 d-flex flex-column align-items-center bg-primary "></div>
      <div className="footer z-n1 position-absolute bottom-0 start-50 translate-middle-x">
        <img src="../src/Assets/img/footer-bg.png" alt="" />
      </div>
    </>
  );
};
