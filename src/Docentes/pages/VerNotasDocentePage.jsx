import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
export const VerNotasDocentePage = () => {

  const {num_empleado } = useParams();
  const [docente, setDocente] = useState({});
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const [clases, setClases] = useState([]);
  const [alumno, setAlumno] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentAlumno = alumno.slice(indexOfFirstItem, indexOfLastItem);


  const handleOpcionChange = (event) => {
    const selectedOptionValue = event.target.value;
  setOpcionSeleccionada(selectedOptionValue);
  console.log(selectedOptionValue);
  };

 
  useEffect(() => {
    obtenerDocente();
    async function obtenerDocente() {
      try {
        const response = await fetch(
          `http://localhost:8081/docente/${num_empleado}`
        );
        const jsonData = await response.json();
        const docenteData = jsonData[0]; 
        setDocente(docenteData);
        console.log("docente ", docenteData);
      } catch (error) {
        console.error(
          "Error al obtener las solicitudes del coordinador:",
          error
        );
      }
    }
  }, [num_empleado,opcionSeleccionada]);

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const responseClases = await fetch(
          `http://localhost:8081/clasesdocentes/${num_empleado}`
        );
        const jsonDataClases = await responseClases.json();
        setClases(jsonDataClases);
        console.log(jsonDataClases);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    const fetchAlumno = async () => {
      try {
        if (opcionSeleccionada) {
          const responseAlumno = await fetch(
            `http://localhost:8081/estudiantes-seccion/${opcionSeleccionada}`
          );
          const jsonDataAlumno = await responseAlumno.json();
          setAlumno(jsonDataAlumno);
          console.log(jsonDataAlumno);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    Promise.all([fetchClases(), fetchAlumno()]);
  }, [num_empleado, opcionSeleccionada]);
  const regresar = () => {
    history.back();
  };

  return (
    <>
      <div className="container">
        <div className="row">
          
          <div className="col ">
          <div className="col-3">
            <button className="btn btn-primary my-4" onClick={regresar}>
              Atrás
            </button>
          </div>
            <br />
            <div className="d-flex my-3 justify-content-center">
              <h3>Calificaciones Ingesadas por {docente.nombres} {docente.apellidos}</h3>
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
              <option value="">-- Clases --</option>
              {clases.map((clase) => ( 
                <option key={clase.id_clase} value={clase.id_clase}>
                  {clase.nombre_clase + " seccion "  + clase.dias}
                </option>
              ))}
            </select>
               
              </div>
              
              
            </div>

            <div className="d-flex my-3 justify-content-center">
              <table
                id="cargaAcademicaId"
                className="table table-striped table-bordered table-bordered"
              >
                <thead>
                <tr>
                  
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Nota</th>
                  <th scope="col">Obserbación</th>
                </tr>
              </thead>
                <tbody>
                {currentAlumno.map((alumnoData, index) => (
            <tr key={index}>
            
             
              <td>{`${alumnoData.primer_nombre} ${alumnoData.segundo_nombre}`}</td>
              <td>{`${alumnoData.primer_apellido} ${alumnoData.segundo_apellido}`}</td>
              <td>{alumnoData.nota}</td>
              <td>{alumnoData.nota > 65 ? (
                          <th scope="row" className="text-center">
                            APR
                          </th>
                        ) : (
                          <th scope="row" className="text-center">
                            RPB
                          </th>
                        )}</td>
            </tr>
          ))}
                </tbody>
              </table>
              
            </div>
            <div className="d-flex justify-content-center">
  <ul className="pagination">
    {Array(Math.ceil(alumno.length / itemsPerPage))
      .fill()
      .map((_, index) => (
        <li key={index} className="page-item">
          <button
            className="page-link"
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        </li>
      ))}
  </ul>
</div>

          </div>
        </div>
      </div>
    </>
  );

};


