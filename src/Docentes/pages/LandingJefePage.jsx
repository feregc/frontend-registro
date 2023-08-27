import { useNavigate } from "react-router-dom";
import { LandingDocente } from "../components/LandingDocente";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { convertirSoloAFecha } from "../../Estudiantes/helpers/convertirFecha";

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

  const onEstadisticas = () => {
    navigate("/docente/estadisticas");
  };

  const [procesoCarga, setProcesoCarga] = useState([]);

  useEffect(() => {
    const fetchProcesoCarga = async () => {
      try {
        const response = await fetch("http://localhost:8081/procesoCarga_disponibilidad");
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const jsonData = await response.json();
        setProcesoCarga(jsonData);
        // console.log(jsonData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchProcesoCarga();
  }, []);

  const fechaActuall = new Date();
  const anio = fechaActuall.getFullYear();
  const mes = String(fechaActuall.getMonth() + 1).padStart(2, '0');
  const dia = String(fechaActuall.getDate()).padStart(2, '0');
  const fechaEnFormato = `${anio}-${mes}-${dia}`;
  // console.log(fechaEnFormato);


  function verificarFechaEntreRango(fechaAVerificar, fechaInicial, fechaFinal) {
    const fechaVerificar = new Date(fechaAVerificar);
    const fechaInicio = new Date(fechaInicial);
    const fechaFin = new Date(fechaFinal);

    return fechaVerificar >= fechaInicio && fechaVerificar <= fechaFin;
  }
  // console.log(fechaEnFormato, convertirSoloAFecha(procesoCarga[0]?.fechainicioI), convertirSoloAFecha(procesoCarga[0]?.fechainicioII))
  const estaEnRango = verificarFechaEntreRango(fechaEnFormato, convertirSoloAFecha(procesoCarga[0]?.fechainicioI), convertirSoloAFecha(procesoCarga[0]?.fechainicioII))
  // console.log(estaEnRango);

  return (
    <>
      <div className="container">
        <div className="row my-5 ">
          <div className="col my-3 d-flex justify-content-center">
            <h2>Bienvenido Jefe de Departamento</h2>
          </div>
          <div className="row my-3">
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
          <div className="row my-3 ">
            <div className="col d-flex justify-content-center mx-2">
              <button
                className="btn btn-w btn-h btn-primary mt-3 form-control"
                onClick={onReinicioClave}
              >
                Acciones Docente
              </button>
            </div>
            <div className="col d-flex justify-content-center mx-2">
              <button
                className="btn btn-w btn-h btn-primary mt-3 form-control"
                onClick={onHistorial}
              >
                Ver Historial Academicos
              </button>
            </div>
            <div className="col d-flex justify-content-center mx-2">
              <button
                className="btn btn-w btn-h btn-primary mt-3 form-control"
                onClick={onCrearSeccion}
                disabled={!estaEnRango} // El botón estará deshabilitado cuando estaHabilitado sea false
              >
                Registrar Sección
              </button>
            </div>
          </div>
          <div className="row my-3">
            <div className="col d-flex justify-content-center mx-2">
              <button
                className="btn btn-w btn-h btn-primary mt-3 form-control"
                onClick={onCancelarSecciones}
              >
                Cancelar Secciones
              </button>
            </div>
            <div className="col d-flex justify-content-center mx-2">
              <button
                className="btn btn-w btn-h btn-primary mt-3 form-control"
                onClick={onVerSecciones}
              >
                Ver Secciones
              </button>
            </div>
            <div className="col d-flex justify-content-center mx-2">
              <button
                className="btn btn-w btn-h btn-primary mt-3 form-control"
                onClick={onEstadisticas}
              >
                Estadísticas
              </button>
            </div>
          </div>
          <div className="row my-3">
            <div className="col d-flex justify-content-center mx-2">
              <LandingDocente />
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
