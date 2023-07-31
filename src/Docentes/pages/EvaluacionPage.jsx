import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
export const EvaluacionPage = () => {
  const [verCarga, setVerCarga] = useState([]);
  const {num_empleado } = useParams();
  const [docente, setDocente] = useState({});
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const [opcionActual, setOpcionActual] = useState(""); // Nueva variable de estado para el año actual
  const [opciones, setOpciones] = useState([]);

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setOpcionActual(selectedYear);
    console.log("Año seleccionado:", selectedYear);
  };

  const handleOpcionChange = (event) => {
    const selectedOptionValue = event.target.value;
    setOpcionSeleccionada(selectedOptionValue);
    console.log("Periodo:", selectedOptionValue);
  };

  useEffect(() => {
    const getCurrentYear = () => {
      return new Date().getFullYear();
    };

    const generateYearOptions = () => {
      const currentYear = getCurrentYear();
      const years = [
        currentYear,
        currentYear - 1,
        currentYear - 2,
        currentYear - 3,
      ];
      const options = years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ));
      setOpciones(options);
    };

    generateYearOptions();
  }, []);

  useEffect(() => {
    obtenerDocente();
    async function obtenerDocente() {
      try {
        const response = await fetch(
          `http://localhost:8081/docente/${num_empleado}`
        );
        const jsonData = await response.json();
        const docenteData = jsonData[0]; // Accedemos al primer objeto del arreglo
        setDocente(docenteData);
        console.log("docente ", docenteData);
      } catch (error) {
        console.error(
          "Error al obtener las solicitudes del coordinador:",
          error
        );
      }
    }
  }, [num_empleado]);

  useEffect(() => {
    if (docente.centro_id && docente.carrera_id) {
      obtenerCarga(docente.carrera_id, docente.centro_id);
    }
  }, [docente, opcionActual, opcionSeleccionada]);

  async function obtenerCarga(carreraId, centroId) {
    console.log(carreraId, centroId, opcionActual, opcionSeleccionada);
    try {
      const response = await fetch(
     
        `http://localhost:8081/Evaluaciones/${num_empleado}/${opcionActual}/${opcionSeleccionada}`
      );
      const jsonData = await response.json();
      setVerCarga(jsonData);
      console.log("carga ", jsonData);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col ">
            <br />
            <div className="d-flex my-3 justify-content-center">
              <h3>Evaluaciones Docente {docente.nombres} {docente.apellidos}</h3>
            </div>

            <div className="row">
              <div className="col-3 d-flex my-3 justify-content-start">
                <select
                  className="form-control btn-w3"
                  name=""
                  id="opcion"
                  value={opcionSeleccionada}
                  onChange={handleOpcionChange}
                >
                  <option value="">Periodo Académico</option>
                  <option value="I-PAC">I PAC</option>
                  <option value="II-PAC">II PAC</option>
                  <option value="III-PAC">III PAC</option>
                </select>
              </div>
              <div className="col-3 d-flex my-3 justify-content-start">
                <select
                  className="form-control btn-w3"
                  name=""
                  id="opcion"
                  value={opcionActual}
                  onChange={handleYearChange}
                >
                  <option value="">Año</option>
                  {opciones}
                </select>
              </div>
              
            </div>

            <div className="d-flex my-3 justify-content-center">
              <table
                id="cargaAcademicaId"
                className="table table-striped table-hover table-bordered"
              >
                <thead>
                  <th scope="col">Asignatura</th>
                  <th scope="col">comentarioI</th>
                  <th scope="col">comentarioII</th>
                  <th scope="col">comentarioIII</th>
                  <th scope="col">comentarioIIII</th>
                  <th scope="col">comentarioIIIII</th>
                  <th scope="col">comentarioIIIIII</th>
                 
                </thead>
                <tbody>
                  {verCarga.map((seccion) => (
                    <tr key={seccion.id_seccion}>
                      <td>{seccion.nombre_clase} </td>
                      <td>{seccion.comentarioI} </td>
                      <td>{seccion.comentarioII} </td>
                      <td>{seccion.comentarioIII} </td>
                      <td>{seccion.comentarioIIII} </td>
                      <td>{seccion.comentarioIIIII} </td>
                      <td>{seccion.comentarioIIIIII} </td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};
