import "../../Assets/styles/styles-landing/Landin-styles.css";
import { LandingDocente } from "../components/LandingDocente";
import { Link } from "react-router-dom";
export const LandingDocentePage = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column my-5">
        <h3>Bienvenido Docente</h3>
        <br />
        <Link to="../perfil">
          <button className="btn btn-w btn-h btn-primary">Perfil</button>
        </Link>
      </div>
      <div className="footer z-n1 position-absolute bottom-0 start-50 translate-middle-x">
        <img src="../src/Assets/img/footer-bg.png" alt="" />
      </div>
      <LandingDocente />
    </>
  );
};