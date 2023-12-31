import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const VerCalificaciones = () => {
  const [datosPreliminares, setDatosPreliminares] = useState([]);
  const [clases, setClases] = useState([]);
  const [evaluacion, setEvaluacion] = useState(false);
  const num_cuenta = localStorage.getItem("id");

  // Obtener el año y el periodo por medio del numero de cuenta del estudiantes
  useEffect(() => {
    const obtenerDatosPreliminares = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/proceso-anio-periodo-come`
        );
        const jsonData = await response.json();
        setDatosPreliminares(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    obtenerDatosPreliminares();
  }, []);

  useEffect(() => {
    const obtenerClases = async () => {
      if (datosPreliminares && datosPreliminares.length > 0) {
        const fechaFormateada = formatearFecha(datosPreliminares[0].anio);
        try {
          const response = await fetch(
            `http://localhost:8081/consulta-clases/${num_cuenta}/${fechaFormateada}/${datosPreliminares[0].periodo}`
          );
          const jsonData = await response.json();
console.log(datosPreliminares[0].periodo)
console.log(fechaFormateada)
          setClases(jsonData);
        } catch (error) {
          console.log("Error:", error);
        }
      }
    };
    obtenerClases();
  }, [datosPreliminares]);

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

  const navigate = useNavigate();

  const evaluar = (clase) => {
    navigate("../evaluar-docente", { state: { data: clase } });
  };

  const regresar = () => {
    navigate("../home");
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-success my-4" onClick={regresar}>
          Atrás
        </button>
        <div className="row">
          <div className="col">
            <div className="row my-3">
              <div className="d-flex justify-content-center">
                <h4>Calificaciones</h4>
              </div>
            </div>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col" className="text-center">Asignatura</th>
                  <th scope="col" className="text-center">Sección</th>
                  <th scope="col" className="text-center">Aula</th>
                  <th scope="col" className="text-center">Horario</th>
                  <th scope="col" className="text-center">Nota</th>
                  <th scope="col" className="text-center">Evaluar Docente</th>
                </tr>
              </thead>
              <tbody>
                {clases &&
                  clases.length > 0 &&
                  clases.map((dato, index) => (
                    <tr key={index}>
                      <th scope="row" className="text-center">{dato.nombre_clase}</th>
                      <th scope="row" className="text-center">{dato.id_seccion}</th>
                      <th scope="row" className="text-center">{dato.nombre_edificio}-{dato.num_aula}</th>
                      <th scope="row" className="text-center">{dato.horainicio}-{dato.horafin}</th>
                      {dato.evaluado === 1 ? (
                        <th scope="row" className="text-center">{dato.nota}</th>
                      ) : (
                        <th scope="row" className="text-center">--</th>
                      )}
                      <th scope="row" className="text-center">
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-success btn-w"
                            disabled={dato.evaluado == 1}
                            onClick={() => evaluar(dato)}
                          >
                            Evaluar docente
                          </button>
                        </div>
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
