import { useState, useEffect } from "react"
import html2canvas from "html2canvas"; 

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";


export const HistorialAcademico = () => {

  const num_cuenta = localStorage.getItem("id")
  const [paginas, setPaginas] = useState(1);
  const itemsPaginas = 11;
 
  const [perfilEstudiante, setPerfilEstudiante] = useState([])
  const [dataClase, setdataClase] = useState([])

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const descargarPDF = async () => {
    const imgCanvas = await html2canvas(document.getElementById("imageContainer"));
    const imgData = imgCanvas.toDataURL("../img/logo.png");

    // Divir en 11 registros por paguina 
    const registrosPorPagina = 11;
    const gruposDeRegistros = [];
    for (let i = 0; i < dataClase.length; i += registrosPorPagina) {
      gruposDeRegistros.push(dataClase.slice(i, i + registrosPorPagina));
    }

    const docDefinition = {
      content: [
        {
          columns: [
            // Primera columna para el logo de UNAH
            {
              width: "23%",
              image: imgData,
              fit: [100, 100],
            },
            // Segunda columna para la información general de unah
            {
              width: "75%",
              text: [
                { text: "Universidad Nacional Autónoma de Honduras\n", style: "header", alignment: "center", margin: [0, 10, 0, 5] },
                { text: "Dirección de Ingresos Permanencia y Promoción\n", style: "subheader", alignment: "center", margin: [0, 5, 0, 10] },
                { text: "Historial Académico\n\n", style: "subheader", alignment: "center", margin: [0, 5, 0, 20] },
              ],
            },
          ],
        },
        {
          columns: [
            // Primera columna para datos de estudiante
            {
              width: "50%",
              text: [
                { text: `Cuenta: ${perfilEstudiante.num_cuenta}\n`, margin: [0, 0, 0, 5] },
                { text: `Nombre: ${perfilEstudiante.primer_nombre.toUpperCase()} ${" "} ${perfilEstudiante.segundo_nombre.toUpperCase()}\n`, margin: [0, 0, 0, 5] },
                { text: `Apellido: ${perfilEstudiante.primer_apellido.toUpperCase()} ${" "} ${perfilEstudiante.segundo_apellido.toUpperCase()}\n`, margin: [0, 0, 0, 5] },
              ],
            },
            // Segunda columna para datos de estudiante
            {
              width: "50%",
              text: [
                { text: `Carrera ${perfilEstudiante.nombre_carrera.toUpperCase()}\n`, margin: [0, 0, 0, 5] },
                { text: `Centro ${perfilEstudiante.nombre_centro}\n`, margin: [0, 0, 0, 5] },
                { text: `Indice ${perfilEstudiante.nota}\n`, margin: [0, 0, 0, 20] },//Editar por el indice
              ],
            },
          ],
        },
        // Información de las clases
        {
          text: "INGENIERIA EN SISTEMAS",
          style: "subheader",
          alignment: "center",
          margin: [0, 10, 0, 0],
        },

        
        {
          table: {
            headerRows: 1,
            widths: ["auto", "*", "auto", "auto", "auto", "auto"],
            body: [
              [
                "CODIGO",
                "NOMBRE",
                "UV",
                "PERIODO",
                "NOTA",
                "OBS",
              ],
              ...dataClase.map((clase) => [
                clase.codigo,
                clase.nombre,
                5,
                clase.periodo +" "+clase.anio,
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
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 16,
          bold: true,
        },
      },
    };

    // Generar el PDF
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.download("HistorialAcademico.pdf");
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

  const totalPaginas = Math.ceil(dataClase.length / itemsPaginas);
  return (
    <>
      <button className="btn btn-primary my-4" onClick={descargarPDF}>
        Descargar PDF
      </button>
      <div id="pdfContainer">
        <div className="container">
          <img id="imageContainer" src='../src/Assets/img/logo-unah.jpg' style={{ width: '130px', height: '200px' }} alt="" />
          <center><h2>Universidad Nacional Autónoma de honduras</h2></center>
          <p>Dirección de Ingresos Permanencia y Promoción</p>
          <p>Historial Academico</p>
        </div>
        <hr />
        <div className="container">
          <p>Cuenta: {perfilEstudiante.num_cuenta}</p>
          <p>Nombre: {perfilEstudiante.primer_nombre}{' '} {perfilEstudiante.segundo_nombre}</p>
          <p>Apellido: {perfilEstudiante.primer_apellido}{' '} {perfilEstudiante.segundo_apellido}</p>
          <p>Carrera: {perfilEstudiante.nombre_carrera}</p>
          <p>Centro: {perfilEstudiante.centro}</p>
          <p>Indice: {perfilEstudiante.nota}</p>{/* Editar por el indice */}
        </div>
        <br />
        <p>{perfilEstudiante.nombre_carrera}</p>
        <br />
      

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">CODIGO</th>
              <th scope="col">NOMBRE</th>
              <th scope="col">UV</th>
              <th scope="col">PERIODO</th>
              <th scope="col">NOTA</th>
              <th scope="col">OBS</th>
            </tr>
          </thead>
          <tbody>
            {dataClase.slice((paginas - 1) * itemsPaginas, paginas * itemsPaginas).map((clase, index) => (
              <tr key={index}>
                <th scope="row">{clase.codigo}</th>
                <th scope="row">{clase.nombre}</th>
                <th scope="row">5</th>
                <th scope="row">{clase.periodo+" "+clase.anio}</th>
                <th scope="row">{clase.nota}</th>
                {clase.nota > 65 ? (<th scope="row">APR</th>) : (<th scope="row">RPB</th>)}
              </tr>
            ))}
          </tbody>
        </table>
        {/* Paginación */}
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${paginas === 1 ? "disabled" : ""}`}>
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
                className={`page-item ${paginas === i + 1 ? "active" : ""}`}
                onClick={() => setPaginas(i + 1)}
              >
                <span className="page-link">{i + 1}</span>
              </li>
            ))}
            <li className={`page-item ${paginas === totalPaginas ? "disabled" : ""}`}>
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
    </>
  )
}
