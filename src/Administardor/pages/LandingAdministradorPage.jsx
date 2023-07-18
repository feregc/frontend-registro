
import { useNavigate } from "react-router-dom";
import "../../Assets/styles/styles-admin/Admin-home.css";

export const LandingAdministradorPage = () => {
  const navigate = useNavigate();
  const onNavRegistroDocente = () => {
    navigate("/administrador/RegistroDocente");
  };
  const onNavRegistroEstudiante = () => {
    navigate("/administrador/RegistroEstudiante");
  };

  const onNavRolDocente = () => {
    navigate("/administrador/RolDocente");
  };

  const onNavProcesoMatricula = () => {
    navigate("/administrador/procesoMatricula");
  };
  const onNavProcesoSubidaNotas = () => {
    navigate("/administrador/procesoSubidaNotas");
  };
  
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <br />
        <br />
        <h2>Bienvenido Administrador</h2>
        <br />
        <div className="btn-group d-flex align-items-center justify-content-center">
          <div>
            <button
              className="btn btn-w btn-h btn-primary m-1"
              onClick={onNavRegistroDocente}
            >
              Registrar docentes
            </button>
          </div>
          <div>
            <button
              className="btn btn-w btn-h btn-primary m-1"
              onClick={onNavRegistroEstudiante}
            >
              Registrar Estudiantes
            </button>
          </div>
          <div>
            <button className="btn btn-w btn-h btn-primary m-1" onClick={onNavRolDocente}>
              
              Seleccionar rol del docente
            </button>
          </div>
          <div>
            <button className="btn btn-w btn-h btn-primary m-1" onClick={onNavProcesoMatricula}>
              
              Crear proceso de matricula
            </button>
          </div>

          <div>
            <button className="btn btn-w btn-h btn-primary m-1" onClick={onNavProcesoSubidaNotas}>
              
              Crear proceso de subida de notas
            </button>
          </div>

        </div>
      </div>
      <div className="footer z-n1 position-absolute bottom-0 start-50 translate-middle-x">
        <img src="../src/Assets/img/footer-bg.png" alt="" />
      </div>
    </>
  );
};
