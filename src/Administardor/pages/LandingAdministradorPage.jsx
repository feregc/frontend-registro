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
      <div className="container">
        <br />
        <br />
        <br />
        <br />
        <div className="row ">
          <div className="col d-flex justify-content-center my-5">
            <h2>Bienvenido Administrador</h2>
          </div>
        </div>
        <div className="row ">
          <div className="col d-flex justify-content-center">
            <div>
              <button
                className="btn btn-w btn-h btn-primary m-1"
                onClick={onNavRegistroDocente}
              >
                Registra Docentes
              </button>
            </div>
          </div>
          <div className="col d-flex justify-content-center">
            <div>
              <button
                className="btn btn-w btn-h btn-primary m-1"
                onClick={onNavRegistroEstudiante}
              >
                Cargar Estudiantes
              </button>
            </div>
          </div>
        </div>
        <div className="row my-4">
          <div className="col d-flex justify-content-center">
            <div>
              <button
                className="btn btn-w btn-h btn-primary m-1"
                onClick={onNavProcesoSubidaNotas}
              >
                Crea Proceso de Subir de Notas
              </button>
            </div>
          </div>
        </div>
        <div className="row my-4">
          <div className="col d-flex justify-content-center">
            <div>
              <button
                className="btn btn-w btn-h btn-primary m-1"
                onClick={onNavRolDocente}
              >
                Cambiar Rol del Docente
              </button>
            </div>
          </div>
          <div className="col d-flex justify-content-center">
            <div>
              <button
                className="btn btn-w btn-h btn-primary m-1"
                onClick={onNavProcesoMatricula}
              >
                Crea Proceso de Matrícula
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
