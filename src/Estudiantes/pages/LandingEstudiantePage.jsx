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



  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <br />
        <br />
        <br />
        <br />
        <h3>Bienvenido Estudiante</h3>
        <br />
        <button className="btn btn-w btn-primary" onClick={onNavPerfilEstudiante}>
          Perfil
        </button>
        <br />
        <button className="btn btn-w btn-primary" onClick={onNavSolicitudEstudiante}>
          Solicitudes
        </button>
        <br />
        <button className="btn btn-w btn-primary" onClick={onNavPagosEstudiante}>
        Estado de cuenta
        </button>
        <br />
        <button className="btn btn-w btn-primary" onClick={onNavMatricular}>
        Matricula
        </button>
      </div>
      <div className="footer z-n1 position-absolute bottom-0 start-50 translate-middle-x">
        <img src="../src/Assets/img/footer-bg.png" alt="" />
      </div>
    </>
  );
};
