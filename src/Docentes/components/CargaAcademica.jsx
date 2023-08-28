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
        `http://localhost:8081/consulta-secciones/${carreraId}/${opcionActual}/${opcionSeleccionada}`
      );
      const jsonData = await response.json();
      setVerCarga(jsonData);
      console.log("carga ", jsonData);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const generarPDF = () => {
    // Crear un nuevo documento PDF
    const doc = new jsPDF();

    // Configurar la tabla con los datos
    const tableData = verCarga.map((carga) => [
      carga.id_seccion,
      carga.codigo_asignatura,
      carga.nombre_clase,
      carga.num_empleado,
      carga.nombre_empleado,
      carga.cupos,
      carga.nombre_edificio,
      carga.num_aula,
    ]);

    // Agregar el encabezado de la tabla
    const headers = [
      "Sección",
      "Cod. Asignatura",
      "Asignatura",
      "No. Docente",
      "Docente",
      "Cupos Habilitados",
      "Edificio",
      "Aula",
    ];

    // Agregar información antes de la tabla
    const titulo = `\t\tCarga Académica, Año: ${opcionActual}, Periodo: ${opcionSeleccionada}`;

    const docWidth = doc.internal.pageSize.getWidth();

    const tituloWidth =
      (doc.getStringUnitWidth(titulo) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const tituloX = (docWidth - tituloWidth) / 2;
    // Establecer tamaño de fuente y posición para el título
    doc.setFontSize(12);
    doc.setTextColor(0, 100, 148);
    doc.text(titulo, tituloX, 15);

    // Establecer posición para la tabla
    const yPosition = 25;

    // Agregar la tabla al documento PDF
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: yPosition,
      styles:{
        lineColor: [232, 241, 242],
        lineWidth: 0.5,
      }
    });
    doc.save("CargaAcademinca.pdf");
    console.log("si se imprime");
  };

  const generarExcel = () => {
    const rows = verCarga.map((carga) => ({
      seccion: carga.id_seccion,
      codigoClase: carga.codigo_asignatura,
      nombreClase: carga.nombre_clase,
      numEmpleado: carga.num_empleado,
      empleado: carga.nombre_empleado,
      cupos: carga.cupos,
      edificio: carga.nombre_edificio,
      aula: carga.num_aula,
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, "CargaAcademica");
    XLSX.utils.sheet_add_aoa(worksheet, [
      [
        "Sección",
        "Cod. Asignatura",
        "Asignatura",
        "No. Docente",
        "Docente",
        "Cupos Habilitados",
        "Edificio",
        "Aula",
      ], //Agrega correo
    ]);
    XLSX.writeFile(workbook, `CargaAcademica.xlsx`, {
      compression: true,
    });
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
                  Descargar PDF
                </button>
                <button
                  className="btn btn-w3 mx-2 btn-primary control-form"
                  type="button"
                  onClick={generarExcel}
                >
                  Descargar Excel
                </button>
              </div>
            </div>

            <div className="d-flex my-3 justify-content-center">
              <table
                id="cargaAcademicaId"
                className="table table-striped table-bordered border-white"
              >
                <thead>
                  <th scope="col">Sección</th>
                  <th scope="col">Cod. Asignatura</th>
                  <th scope="col">Asignatura</th>
                  <th scope="col">No. Docente</th>
                  <th scope="col">Docente</th>
                  <th scope="col">Cupos Habilitados</th>
                  <th scope="col">Edificio</th>
                  <th scope="col">Aula</th>
                </thead>
                <tbody>
                  {verCarga.map((seccion) => (
                    <tr key={seccion.id_seccion}>
                      <td>{seccion.id_seccion} </td>
                      <td>{seccion.codigo_asignatura} </td>
                      <td>{seccion.nombre_clase} </td>
                      <td>{seccion.num_empleado} </td>
                      <td>{seccion.nombre_empleado} </td>
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
