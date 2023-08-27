import "../../Assets/styles/styles-landing/Landin-styles.css";
import { useNavigate } from "react-router-dom";

export const LandingEstudiantePage = () => {
  const navigate = useNavigate();
  const onNavPerfilEstudiante = () => {
    navigate("../PerfilEstudiante");
  };
  const onNavSolicitudEstudiante = () => {
    navigate("../SolicitudEstudiante");
  };

  const onNavPagosEstudiante = () => {
    navigate("../PagosPage");
  };

  const onNavMatricular = () => {
    navigate("../matricular");
  };

  const onNavCalificaciones = () => {
    navigate("../ver-calificaciones");
  };

  const onNavClaseMatriculadas = () => {
    navigate("../clases-matriculadas");
  };
  const onNavHistorialClases = () => {
    navigate("../HistorialAcademico");
  };
  const onNavPrueva = () => {
    navigate("../Prueba");
  };

  const onNavChat = () => {
    navigate("../auth/loginChat");
  };

  return (
    <>
      <div className="container">
        <div className="row my-2">
          <div className="my-5 d-flex justify-content-center">
            <h3>Bienvenido Estudiante</h3>
          </div>
        </div>
        <div className="row my-3">
          <div className="d-flex justify-content-center">
            <div className="row-3 mx-2">
              <button
                className="btn btn-w btn-h btn-primary"
                onClick={onNavPerfilEstudiante}
              >
                Perfil
              </button>
            </div>
            <div className="row-3 mx-2">
              <button
                className="btn btn-w btn-h btn-primary"
                onClick={onNavSolicitudEstudiante}
              >
                Solicitudes
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-center my-3">
            <div className="row-3 mx-2">
              <button
                className="btn btn-w btn-h btn-primary"
                onClick={onNavPagosEstudiante}
              >
                Estado de cuenta
              </button>
            </div>
            <div className="row-3 mx-2">
              <button
                className="btn btn-w btn-h btn-primary"
                onClick={onNavMatricular}
              >
                Matrícula
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-center my-3">
            <div className="row-3 mx-2">
              <button
                className="btn btn-w btn-h btn-primary"
                onClick={onNavClaseMatriculadas}
              >
                Ver Clases Matriculadas
              </button>
            </div>
            
            <div className="row-3 mx-2">
              <button
                className="btn btn-w btn-h btn-primary"
                onClick={onNavCalificaciones}
              >
                Ver Calificaciones de Período
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-center my-3">
            <div className="row-3 mx-2">
              <button
                className="btn btn-w btn-h btn-primary"
                onClick={onNavHistorialClases}
              >
                Historial Académico
              </button>
            </div>
            <div className="row-3 mx-2">
              <button
                className="btn btn-w btn-h btn-primary"
                onClick={onNavChat}
              >
                Chat
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer z-n1 position-absolute bottom-0 start-50 translate-middle-x">
        <img src="../src/Assets/img/footer-bg.png" alt="" />
      </div>
    </>
  );
};
