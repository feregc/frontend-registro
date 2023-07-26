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
            `http://localhost:8081/consulta-clases/${num_cuenta}/${fechaFormateada}/${datosPreliminares[0].periodo}`
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
  }

  const regresar = () => {
    navigate("../home")
  }

  return (
    <>
    {/* Boton para regresar atras */}
      <br />
      <button className="btn btn-success btn-w"
        onClick={regresar}>Atras</button>

      <hr />
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Asignatura</th>
            <th scope="col">Sección</th>
            <th scope="col">Nota</th>
            <th scope="col">Perfil de docente</th>
          </tr>
        </thead>
        <tbody>
          {
            clases?.map((dato, index) => (
              <tr key={index}>
                <th scope="row">{dato.nombre_clase}</th>
                <th scope="row">{dato.id_seccion}</th>
                <th scope="row">
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-success btn-w"
                      onClick={() => VerPerfilDeDocente(dato.num_empleado)}
                    >
                      Ver perfil del docente
                    </button>
                  </div>
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}