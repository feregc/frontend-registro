import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const ClasesMatriculada = () => {
  const [datosPreliminares, setDatosPreliminares] = useState([]);
  const [clases, setClases] = useState([]);
  const navigate = useNavigate();
  const num_cuenta = localStorage.getItem("id");
  // Obtener el año y el periodo por medio del numero de cuenta del estudiantes
  useEffect(() => {
    const obtenerDatosPreliminares = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/proceso-anio-periodo`
        );
        const jsonData = await response.json();
        setDatosPreliminares(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    obtenerDatosPreliminares();
  }, []);
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    const hora = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");
    const segundos = String(fecha.getSeconds()).padStart(2, "0");
    return `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
  };
  useEffect(() => {
    const obtenerClases = async () => {
      if (datosPreliminares && datosPreliminares.length > 0) {
        const fechaFormateada = formatearFecha(datosPreliminares[0].anio);
        try {
          const response = await fetch(
            `http://localhost:8081/clases-matriculadas/${num_cuenta}/${fechaFormateada}/${datosPreliminares[0].periodo}`
          );
          const jsonData = await response.json();
          setClases(jsonData);
        } catch (error) {
          console.log("Error:", error);
        }
      }
    };
    obtenerClases();
  }, [datosPreliminares]);
  const VerPerfilDeDocente = async (idEmpleado) => {
    navigate("../perfil-docente", { state: idEmpleado });
  };
  const regresar = () => {
    navigate("../home");
  };
  return (
    <>
      {/* Boton para regresar Atrás */}
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-start my-4">
              <button className="btn btn-success" onClick={regresar}>
                Atrás
              </button>
            </div>
            <div className="d-flex justify-content-center my-3">
              <h3>Clases Matriculadas</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col" className="text-center">Asignatura</th>
                  <th scope="col" className="text-center">Sección</th>
                  <th scope="col" className="text-center">Período</th>
                  <th scope="col" className="text-center">Perfil de docente</th>
                </tr>
              </thead>
              <tbody>
                {clases?.map((dato, index) => (
                  <tr key={index}>
                    <th scope="row" className="text-center">{dato.nombre}</th>
                    <th scope="row" className="text-center">{dato.id_seccion}</th>
                    <th scope="row" className="text-center">{dato.periodo}</th>
                    <th scope="row" className="text-center">
                      {/* <div className="d-flex justify-content-center"> */}
                      <button
                        className="btn btn-success btn-w"
                        onClick={() => VerPerfilDeDocente(dato.num_empleado)}
                      >
                        Ver Perfil del Docente
                      </button>
                      {/* </div> */}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
