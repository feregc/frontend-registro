import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import * as XLSX from "xlsx";

export const CargaAcademica = () => {
  const [verCarga, setVerCarga] = useState([]);
  const num_empleado = localStorage.getItem("id");
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
        `http://localhost:8081/consulta-secciones/${carreraId}/${centroId}/${opcionActual}/${opcionSeleccionada}`
      );
      const jsonData = await response.json();
      setVerCarga(jsonData);
      console.log("carga ", jsonData);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: "#cargaAcademicaId" });

    doc.save("CargaAcademinca.pdf");
    console.log("si se imprime");
  };

  const generarExcel = () => {
    const wb = XLSX.utils.table_to_book(
      document.getElementById("cargaAcademicaId")
    );
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tabla.xlsx";
    a.click();

    // Liberar recursos
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col ">
            <br />
            <div className="d-flex my-3 justify-content-center">
              <h3>Carga Académica</h3>
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
              <div className="col-6 d-flex my-3 justify-content-end">
                <button
                  className="btn btn-w3 mx-2 btn-primary control-form"
                  type="button"
                  onClick={generarPDF}
                >
                  Descargar como archivo PDF
                </button>
                <button
                  className="btn btn-w3 mx-2 btn-primary control-form"
                  type="button"
                  onClick={generarExcel}
                >
                  Descargar como archivo Excel
                </button>
              </div>
            </div>

            <div className="d-flex my-3 justify-content-center">
              <table
                id="cargaAcademicaId"
                className="table table-striped table-hover table-bordered"
              >
                <thead>
                  <th scope="col">Sección</th>
                  <th scope="col">Cod. Asignatura</th>
                  <th scope="col">Asignatura</th>
                  <th scope="col">No. Docente</th>
                  <th scope="col">Docente</th>
                  <th scope="col">Cant. Estudiantes</th>
                  <th scope="col">Cupos Habilitados</th>
                  <th scope="col">Edificio</th>
                  <th scope="col">Aula</th>
                </thead>
                <tbody>
                  {verCarga.map((seccion) => (
                    <tr key={seccion.id_seccion}>
                      <td>{seccion.id_seccion} </td>
                      <td>{seccion.codigo_clase} </td>
                      <td>{seccion.nombre_clase} </td>
                      <td>{seccion.num_empleado} </td>
                      <td>{seccion.nombre_empleado} </td>
                      <td>{seccion.cant_estudiantes} </td>
                      <td>{seccion.cupos} </td>
                      <td>{seccion.nombre_edificio} </td>
                      <td>{seccion.num_aula} </td>
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
