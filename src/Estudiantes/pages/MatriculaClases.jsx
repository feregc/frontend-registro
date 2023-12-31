import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Assets/styles/styles.css";
import { convertirFecha } from "../helpers/convertirFecha";

export const MatriculaClases = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [clases, setClases] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const num_cuenta = localStorage.getItem("id"); // Obtener el valor de num_cuenta desde localStorage
  const [selectedSeccion, setSelectedSeccion] = useState(null);
  const [carreraDeEstudiante, setcarreraDeEstudiante] = useState('')

  const navigate = useNavigate();

  const id = localStorage.getItem('id');

  useEffect(() => {

    // Obtener departamentos cuando el componente se monta
    fetch(`http://localhost:8081/carreraDeEstudiante?num_cuenta=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setcarreraDeEstudiante(data);

      })
      .catch((error) => {
        console.error("Error al obtener la carrera:", error);
      });
  }, []);

  console.log(carreraDeEstudiante?.carrera_id);

  useEffect(() => {
    if (carreraDeEstudiante?.carrera_id) { // Verificar si carreraDeEstudiante tiene un valor
      fetch(`http://localhost:8081/obtenerDeptos?id_carrera=${carreraDeEstudiante.carrera_id}`)
        .then((response) => response.json())
        .then((data) => {
          setDepartamentos(data);
        })
        .catch((error) => {
          console.error("Error al obtener los departamentos:", error);
        });
    }
  }, [carreraDeEstudiante]); // Agregar carreraDeEstudiante como dependencia


  // useEffect(() => {
  //   // Obtener departamentos cuando el componente se monta
  //   fetch(`http://localhost:8081/obtenerDeptos?id_carrera=${carreraDeEstudiante?.carrera_id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setDepartamentos(data);

  //     })
  //     .catch((error) => {
  //       console.error("Error al obtener los departamentos:", error);
  //     });
  // }, []);

  const [anioPeriodo, setAnioPeriodo] = useState([]);

  useEffect(() => {
    // Función para obtener los datos del endpoint
    const fetchAnioPeriodo = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/proceso-anio-periodo"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const jsonData = await response.json();
        // console.log(jsonData);
        setAnioPeriodo(jsonData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchAnioPeriodo();
  }, []);

  // useEffect(()=>{
  //   const temp = async ()=>{
  //     const f = await convertirFecha(anioPeriodo[0]?.anio)
  //     setFecha(f)
  //   }

  // },[])
  const fecha = convertirFecha(anioPeriodo[0]?.anio);
  // console.log(fecha)

  const handleDepartamentoClick = (id_carrera) => {
    fetch(
      `http://localhost:8081/clasesFaltantes?id_carrera=${id_carrera}&id_estudiante=${num_cuenta}`
    )
      .then((response) => response.json())
      .then((data) => {
        setClases(data);
        setSecciones([]); // Limpiar las secciones al cambiar de clases
      })
      .catch((error) => {
        console.error("Error al obtener las clases faltantes:", error);
      });
  };

  const handleClaseClick = async (claseId) => {

    try {
      const response = await fetch(
        `http://localhost:8081/verificar-requisitos?id_clase=${claseId}&num_cuenta=${num_cuenta}`
      );
      const requisitosResponse = await response.json();

      if (
        requisitosResponse.resultado ===
        "El estudiante cumple con los requisitos para la clase solicitada"
      ) {
        console.log(claseId, '--', fecha, '--', anioPeriodo[0]?.periodo)
        const responseSecciones = await fetch(
          `http://localhost:8081/secciones-por-clase?id_clase=${claseId}&anio=${fecha}&periodo=${anioPeriodo[0]?.periodo}`
          // `http://localhost:8081/secciones-por-clase?id_clase=${claseId}&anio=${fecha}&periodo${anioPeriodo[0]?.periodo}`
          // Aquí puedes agregar la lógica para obtener el año, período y proceso de matrícula activo
        );


        const seccionesData = await responseSecciones.json();
        setSecciones(seccionesData);
        console.log(seccionesData)
      } else {
        alert("No cumples con los requisitos para esta clase.");
      }
    } catch (error) {
      console.error(
        "Error al verificar requisitos y obtener secciones:",
        error
      );
    }
  };


  const handleSeccionClick = async (seccionId) => {
    setSelectedSeccion(seccionId);
  };



  const handleMatriculaClick = async (seccion) => {

    const claseEnMatricula = await verificarClaseEnMatricula(seccion.id_clase);

    if (claseEnMatricula) {
      alert("Ya estás matriculado en esta clase. Debe cancelar la sección matriculada");
    } else {
      // Verificar horario
      const horarioValido = await verificarHorario(seccion.id_seccion);

      if (!horarioValido) {
        alert("Conflicto de horario. Ya tienes una clase en este horario.");
      } else {
        // Matricular al estudiante
        const matriculaExitosa = await matricularEstudianteEnSeccion(
          seccion.id_seccion
        );

        if (matriculaExitosa) {
          alert(
            "Error al realizar la matrícula. Por favor, inténtalo de nuevo."
          );
        } else {
          alert("Matrícula exitosa en la sección " + seccion.id_seccion);
          navigate("../cancelarClase");

        }
      }
    }
  };




  const verificarClaseEnMatricula = async (idClase) => {
    try {
      const response = await fetch(
        `http://localhost:8081/verifica-clase?id_clase=${idClase}&num_cuenta=${num_cuenta}`
      );
      const verificaResponse = await response.json();
      return verificaResponse.tiene_matricula; // Supongamos que la respuesta es {"tiene_matricula": false}
    } catch (error) {
      console.error("Error al verificar la clase en la matrícula:", error);
      return false;
    }
  };

  const verificarHorario = async (idSeccion) => {
    try {
      const response = await fetch(
        `http://localhost:8081/verificar-horario?id_seccion=${idSeccion}&num_cuenta=${num_cuenta}`
      );
      const horarioResponse = await response.json();

      if (
        horarioResponse.resultado ===
        "El estudiante ya está matriculado en otra clase a la misma hora"
      ) {
        alert("Conflicto de horario. Ya tienes una clase en este horario.");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error al verificar el horario:", error);
      return false;
    }
  };

  const matricularEstudianteEnSeccion = async (idSeccion) => {
    try {
      const response = await fetch(
        `http://localhost:8081/insertMatricula?id_seccion=${idSeccion}&num_cuenta=${num_cuenta}`,
        {
          method: "POST",
        }
      );
      const matriculaResponse = await response.json();
      return matriculaResponse.resultado === "Matrícula exitosa";
    } catch (error) {
      console.error("Error al matricular al estudiante:", error);
      return false;
    }
  };

  const regresar = () => {
    window.history.back();
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-success mt-4" onClick={regresar}>
          Atrás
        </button>
        <div className="row">
          <div className="col">
            <h3 className="text-center mt-3 mb-5">Matrícula de Clases</h3>
          </div>
        </div>
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="text-center w">
                  Departamento
                </th>
                <th scope="col" className="text-center w">
                  Clase
                </th>
                <th scope="col" className="text-center w">
                  Sección
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w">
                  <div className="overflow-y-scroll h">
                    {departamentos.map((depto, index) => (
                      <div className="row" key={index}>
                        <button
                          onClick={() =>
                            handleDepartamentoClick(depto.id_carrera)
                          }
                          className="btn btn-r text-start"
                        >
                          {depto.nombre_carrera}
                        </button>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="w">
                  <div className="overflow-y-scroll h">
                    {clases.map((clase, index) => (
                      <div className="row " key={index}>
                        <button
                          onClick={() => handleClaseClick(clase.id_clase)}
                          className="btn btn-r text-start"
                        >
                          {clase.codigo}{" - "}{clase.nombre}
                        </button>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="w">
                  <div className="overflow-y-scroll h">
                    {secciones.map((seccion, index) => (

                      <div className="row" key={index}>
                        <button
                          className="btn btn-r text-start"
                          onClick={() => handleSeccionClick(seccion)}
                        >
                          ID de Sección: {seccion.id_seccion}{" "}
                          Nombre de Empleado: {seccion.nombres_docente}{" "}
                          {seccion.apellidos_docente}{" "}
                          Hora de Inicio: {seccion.horainicio}{" "}
                          Hora Final: {seccion.horafin}{" "}
                          Días: {seccion.dias}{" "}
                          Cupos Disponibles:{seccion.cupos}
                        </button>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row justify-content-end my-3">
          <button
            className="btn btn-w btn-primary mx-7"
            onClick={() => handleMatriculaClick(selectedSeccion)}
          >
            Matricular
          </button>
        </div>
      </div>
    </>
  );
};
