import { useState, useEffect } from "react";
import html2canvas from "html2canvas";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

export const HistorialAcademico = () => {
  const num_cuenta = localStorage.getItem("id");
  const [paginas, setPaginas] = useState(1);
  const itemsPaginas = 8;

  const [perfilEstudiante, setPerfilEstudiante] = useState([]);
  const [dataClase, setdataClase] = useState([]);

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const descargarPDF = async () => {
    const imgCanvas = await html2canvas(
      document.getElementById("imageContainer")
    );
    const imgData = imgCanvas.toDataURL("../img/logo.png");

    // Divir en 11 registros por paguina
    const registrosPorPagina = 11;
    const gruposDeRegistros = [];
    for (let i = 0; i < dataClase.length; i += registrosPorPagina) {
      gruposDeRegistros.push(dataClase.slice(i, i + registrosPorPagina));
    }

    const classesByYear = {}; // Objeto para almacenar las asignaturas por año

    dataClase.forEach((clase) => {
      const year = clase.anio;
      if (!classesByYear[year]) {
        classesByYear[year] = []; // Crea un nuevo arreglo para el año si no existe
      }
      classesByYear[year].push(clase); // Agrega la asignatura al arreglo correspondiente al año
    });

    const docDefinition = {
      content: [
        {
          columns: [
            // Primera columna para el logo de UNAH
            {
              width: "16%",
              image: imgData,
              fit: [40, 59.6],
            },
            // Segunda columna para la información general de unah
            {
              width: "75%",
              text: [
                {
                  text: "Universidad Nacional Autónoma de Honduras\n",
                  style: "header",
                  alignment: "center",
                  margin: [0, 10, 0, 5],
                },
                {
                  text: "Dirección de Ingresos Permanencia y Promoción\n",
                  style: "subheader",
                  alignment: "center",
                  margin: [0, 5, 0, 10],
                },
                {
                  text: "Historial Académico\n\n",
                  style: "subheader",
                  alignment: "center",
                  margin: [0, 5, 0, 20],
                },
              ],
            },
          ],
        },
        { text: "\n" },
        {
          table: {
            widths: ["50%", "50%"],
            body: [
              [
                {
                  table: {
                    widths: ["auto"],
                    body: [
                      [
                        {
                          text: `Cuenta: ${perfilEstudiante.num_cuenta}`,
                          style: "cellText",
                        },
                      ],
                      [
                        {
                          text: `Nombre: ${perfilEstudiante.primer_nombre.toUpperCase()} ${perfilEstudiante.segundo_nombre.toUpperCase()}`,
                          style: "cellText",
                        },
                      ],
                      [
                        {
                          text: `Apellido: ${perfilEstudiante.primer_apellido.toUpperCase()} ${perfilEstudiante.segundo_apellido.toUpperCase()}`,
                          style: "cellText",
                        },
                      ],
                    ],
                  },
                  layout: {
                    fillColor: "#E0E0E0", // Color de fondo gris
                    hLineWidth: () => 0, // Eliminar bordes horizontales
                    vLineWidth: () => 0, // Eliminar bordes verticales
                  },
                },
                {
                  table: {
                    widths: ["auto"],
                    body: [
                      [
                        {
                          text: `Carrera: ${perfilEstudiante.nombre_carrera.toUpperCase()}`,
                          style: "cellText",
                        },
                      ],
                      [
                        {
                          text: `Centro: ${perfilEstudiante.nombre_centro}`,
                          style: "cellText",
                        },
                      ],
                      [
                        {
                          text: `Índice: ${perfilEstudiante.indice}`,
                          style: "cellText",
                        },
                      ],
                    ],
                  },
                  layout: {
                    fillColor: "#d1d1d1", // Color de fondo gris
                    hLineWidth: () => 0, // Eliminar bordes horizontales
                    vLineWidth: () => 0, // Eliminar bordes verticales
                  },
                },
              ],
            ],
          },
          fillColor: "#d1d1d1", // Color de fondo gris para toda la tabla
          layout: "noBorders", // Eliminar bordes de la tabla principal
          hLineWidth: () => 0, // Eliminar bordes horizontales de la tabla principal
          vLineWidth: () => 0, // Eliminar bordes verticales de la tabla principal
        },
        { text: "\n" },
        // Información de las clases
        {
          fillColor: "#d1d1d1",
          text: `${perfilEstudiante.nombre_carrera.toUpperCase()}`,
          style: "subheader",
          alignment: "center",
          margin: [5, 10, 5, 0],
        },
        ...Object.keys(classesByYear).map((year) => [
          { text: "\n" },
          {
            text: `------------------------------------------------ ${year} ------------------------------------------------`, // Mostrar el año
            style: "subheader",
            alignment: "center",
            margin: [5, 10, 5, 0],
          },
          { text: "\n" },
          {
            table: {
              headerRows: 1,
              widths: ["auto", "*", "auto", "auto", "auto", "auto"],
              body: [
                ["CÓDIGO", "ASIGNATURA", "UV", "PERIODO", "NOTA", "OBS"],
                ...classesByYear[year]
                .sort((a, b) => a.periodo.localeCompare(b.periodo))
                .map((clase) => [
                  clase.codigo,
                  clase.nombre,
                  5,
                  clase.periodo,
                  clase.nota,
                  clase.nota > 65 ? "APR" : "RPB",
                ]),
              ],
            },
            layout: "lightHorizontalLines",
            tableLayouts: {
              exampleLayout: {
                hLineWidth: function (i, node) {
                  return i === 0 || i === node.table.body.length ? 1 : 0;
                },
                vLineWidth: function (i) {
                  return 0;
                },
              },
            },
            style: "exampleLayout",
          },
          {
            text: `Total Aprobadas: ${classesByYear[year].filter((clase) => clase.nota > 65).length}`,
            margin: [5, 10, 5, 0],
            alignment: "left",
          },
          
        ]),
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
        },
      },
    };

    // Generar el PDF
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.download(
      `Historial-Academico-${perfilEstudiante.primer_nombre}-${perfilEstudiante.primer_apellido}.pdf`
    );
  };

  useEffect(() => {
    const fetchEstudiante = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/estudiante/${num_cuenta}`
        );
        const imgPerfil = await response.json();
        setPerfilEstudiante(imgPerfil);
      } catch (error) {
        console.log("Error:", error);
      }
    }; 
    fetchEstudiante();
  }, []);

  useEffect(() => {
    const obtenerHistorial = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/clases-historial/${num_cuenta}`
        );
        const clase = await response.json();
        setdataClase(clase);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    obtenerHistorial();
  }, []);

  const regresar = () => {
    history.back();
  };

  const totalPaginas = Math.ceil(dataClase.length / itemsPaginas);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <button className="btn btn-primary my-4" onClick={regresar}>
              Atrás
            </button>
          </div>
          <div className="col-9 d-flex justify-content-end">
            <button
              className="btn btn-w btn-primary my-4"
              onClick={descargarPDF}
            >
              Descargar PDF
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div id="pdfContainer">
              <div className="container">
                <div className="row">
                  <div className="col-1">
                    <img
                      id="imageContainer"
                      className="d-flex justify-content-center"
                      src="../src/Assets/img/logo-unah.jpg"
                      style={{ width: "90px", height: "148.8px" }}
                      alt=""
                    />
                  </div>
                  <div className="col-11">
                    <h4 className="d-flex justify-content-center text-black">
                      Universidad Nacional Autónoma de Honduras
                    </h4>
                    <h6 className="d-flex justify-content-center text-black">
                      Dirección de Ingresos Permanencia y Promoción
                    </h6>
                    <h6 className="d-flex justify-content-center text-black">
                      Historial Académico
                    </h6>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row my-4 p-2 border border-2 rounded-4">
                  <div className="col-6">
                    <p className="text-black fw-bold">
                      Cuenta: {perfilEstudiante.num_cuenta}
                    </p>
                    <p className="text-black fw-bold">
                      Nombre: {perfilEstudiante.primer_nombre}{" "}
                      {perfilEstudiante.segundo_nombre}
                    </p>
                    <p className="text-black fw-bold">
                      Apellido: {perfilEstudiante.primer_apellido}{" "}
                      {perfilEstudiante.segundo_apellido}
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-black fw-bold">
                      Carrera: {perfilEstudiante.nombre_carrera}
                    </p>
                    <p className="text-black fw-bold">
                      Centro: {perfilEstudiante.nombre_centro}
                    </p>
                    <p className="text-black fw-bold">
                      Índice: {perfilEstudiante.indice}
                    </p>
                  </div>
                </div>
              </div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      CÓDIGO
                    </th>
                    <th scope="col" className="text-center">
                      ASIGNATURA
                    </th>
                    <th scope="col" className="text-center">
                      UV
                    </th>
                    <th scope="col" className="text-center">
                      PERIODO
                    </th>
                    <th scope="col" className="text-center">
                      AÑO
                    </th>
                    <th scope="col" className="text-center">
                      NOTA
                    </th>
                    <th scope="col" className="text-center">
                      OBS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataClase
                    .slice((paginas - 1) * itemsPaginas, paginas * itemsPaginas)
                    .sort((a, b) => {
                      if (a.anio === b.anio) {
                        return a.periodo - b.periodo;
                      }
                      return a.anio - b.anio;
                    })
                    .map((clase, index) => (
                      <tr key={index}>
                        <th scope="row" className="text-center">
                          {clase.codigo}
                        </th>
                        <th scope="row" className="text-center">
                          {clase.nombre}
                        </th>
                        <th scope="row" className="text-center">
                          5
                        </th>
                        <th scope="row" className="text-center">
                          {clase.periodo}
                        </th>
                        <th scope="row" className="text-center">
                          {clase.anio}
                        </th>
                        <th scope="row" className="text-center">
                          {clase.nota}
                        </th>
                        {clase.nota > 65 ? (
                          <th scope="row" className="text-center">
                            APR
                          </th>
                        ) : (
                          <th scope="row" className="text-center">
                            RPB
                          </th>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
              {/* Paginación */}
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${paginas === 1 ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setPaginas(paginas - 1)}
                      disabled={paginas === 1}
                    >
                      Anterior
                    </button>
                  </li>
                  {Array.from({ length: totalPaginas }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        paginas === i + 1 ? "active" : ""
                      }`}
                      onClick={() => setPaginas(i + 1)}
                    >
                      <span className="page-link">{i + 1}</span>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      paginas === totalPaginas ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setPaginas(paginas + 1)}
                      disabled={paginas === totalPaginas}
                    >
                      Siguiente
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
