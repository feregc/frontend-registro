import { useNavigate } from "react-router-dom";

export const LandingJefePage = () => {
  const navigate = useNavigate();
  const onReinicioClave = () => {
    navigate("/docente/recupeacion");
  };

  const onCrearSeccion = () => {
    navigate("/docente/crearSeccion");
  };

  const onHistorial = () => {
    navigate("/docente/historialAcademico");
  };

  const onCancelarSecciones = () => {
    navigate("/docente/cancelarSecciones");
  };
  const onVerSecciones = () => {
    navigate("/docente/verSecciones");
  };

  return (
    <>
      <div className="container">
        <div className="row my-5 ">
          <div className="my-3 d-flex justify-content-center">
            <h2>Bienvenido Jefe de Departamento</h2>
          </div>
          <div className="my-3 d-flex justify-content-center">
            <div className="row-3 mx-2">
              <button
                className="btn btn-w btn-h btn-primary mt-3 form-control"
                onClick={onReinicioClave}
              >
                Reiniciar Clave de Docente
              </button>
            </div>
            <div className="row-3 mx-2">
              <button
                className="btn btn-w btn-h btn-primary mt-3 form-control"
                onClick={onHistorial}
              >
                Ver Historial Academicos
              </button>
            </div>
            <div className="row-3 mx-2">
              <button
                className="btn btn-w btn-h btn-primary mt-3 form-control"
                onClick={onCrearSeccion}
              >
                Registrar Sección
              </button>
            </div>
            <div className="row-3 mx-2">
              <button
                className="btn btn-w btn-h btn-primary mt-3 form-control"
                onClick={onCancelarSecciones}
              >
                Cancelar Secciones
              </button>
            </div>
            <div className="row-3 mx-2">
              <button
                className="btn btn-w btn-h btn-primary mt-3 form-control"
                onClick={onVerSecciones}
              >
                Ver secciones
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
