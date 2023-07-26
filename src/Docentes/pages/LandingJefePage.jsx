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


  return (
    <>
      <div className="mt-6 d-flex flex-column align-items-center bg-primary ">
        <br />
        <br />
        <h3 className="mt-6">Bienvenido Jefe de Departamento</h3>
        <button
          className="btn btn-w btn-h btn-primary mt-3 form-control"
          onClick={onReinicioClave}
        >
          Reiniciar Clave de Docente
        </button>
        <button
          className="btn btn-w btn-h btn-primary mt-3 form-control"
          onClick={onCrearSeccion}
        >
          Registrar Sección
        </button>
        <button
          className="btn btn-w btn-h btn-primary mt-3 form-control"
          onClick={onHistorial}
        >
          Ver Historial Academicos
        </button>
        <button
          className="btn btn-w btn-h btn-primary mt-3 form-control"
          onClick={onCancelarSecciones}
        >
          Cancelar Secciones
        </button>
      </div>
      <div className="footer z-n1 position-absolute bottom-0 start-50 translate-middle-x">
        <img src="../src/Assets/img/footer-bg.png" alt="" />
      </div>
    </>
  );
};
