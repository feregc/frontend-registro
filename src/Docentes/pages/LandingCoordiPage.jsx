import "../../Assets/styles/styles-landing/Landin-styles.css";
import { useNavigate } from "react-router-dom";


export const LandingCoordiPage = () => {

  const navigate = useNavigate();

  const onNavSolicitud = () => {
    navigate("/docente/ListaSolicitud");
  };

  return (
    <>
      <div className="mt-6 d-flex flex-column align-items-center bg-primary ">
        <br />
        <br />
        <h3 className="mt-5">Bienvenido coordinador</h3>
        <br />
        <button
          className="btn btn-primary"
          onClick={onNavSolicitud}
        >
          Lista de Solicitudes
        </button>
      </div>
      <div className="footer z-n1 position-absolute bottom-0 start-50 translate-middle-x">
        <img src="../src/Assets/img/footer-bg.png" alt="" />
      </div>
    </>
  );
};
