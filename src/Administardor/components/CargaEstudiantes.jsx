// import { useState } from "react";
// import { convertirCsvToJson } from "../helpers/convertirCsvToJson";
// import "../../Assets/styles/styles-admin/Admin-carga-estudiante.css";
// import "../../Assets/styles/styles-admin/Admin-home.css";

// export const CargaEstudiantes = () => {
//   const [msg, setMsg] = useState({});
//   const [file, setFile] = useState();
//   const [json, setJson] = useState([{}]);
//   const [uploaded, setUploaded] = useState(false);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     // Aquí puedes realizar acciones adicionales con el archivo, como validaciones
//     if (file) {
//       convertirCsvToJson(file).then((jsonData) => {
//         // Enviar jsonData al backend
//         // console.log(jsonData);
//         setJson(jsonData);
//       });
//     }

//     // setFile(file); // Guardar el archivo en el estado de tu componente
//   };

//   const handleSubmit = () => {
//     setUploaded(true);
//     fetch("http://localhost:8081/registro/estudiante", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(json),
//     })
//       .then((response) => {
//         response.json();
//       })
//       .then((data) => {
//         // Procesar la respuesta del backend si es necesario
//         setMsg(data);
//         // console.log(data);
//       })
//       .catch((error) => {
//         console.error("Error al enviar los datos al backend:", error);
//       });
//   };

//   return (
//     <>
//       <div className="d-flex flex-column justify-content-center align-items-center bg-primary ">
//         <br />
//         <br />
//         <br />
//         <br />
//         <h2>Carga de Estudiantes</h2>
//         <br />
//         <p>Seleccione el archivo CSV con los datos de los estudiantes</p>
//         <br />
//         <div className="carga">
//           <input
//             className="form-control mb-3"
//             type="file"
//             id="formFile"
//             onChange={handleFileUpload}
//           />
//           <button
//             className="btn btn-w btn-success mt-3"
//             onClick={handleSubmit}
//             disabled={uploaded}
//           >
//             Subir Estudiantes
//           </button>
//           <br />
//           <p>{msg?.message}</p>
//         </div>
//       </div>
//     </>
//   );
// };

import { useState, useRef } from "react";
import { convertirCsvToJson } from "../helpers/convertirCsvToJson";
import "../../Assets/styles/styles-admin/Admin-carga-estudiante.css";
import "../../Assets/styles/styles-admin/Admin-home.css";
export const CargaEstudiantes = () => {
  const [msg, setMsg] = useState({});
  const [file, setFile] = useState();
  const [json, setJson] = useState([{}]);
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef(null); // Referencia al input de tipo file

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Aquí puedes realizar acciones adicionales con el archivo, como validaciones
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);
      if (fileExtension.toLowerCase() !== "csv") {
        setMsg({ message: "Formato no aceptado. Por favor, sube un archivo CSV." });
        fileInputRef.current.value = null; // Limpiar el campo de entrada de tipo file
        return;
      }
      convertirCsvToJson(file).then((jsonData) => {
        // Enviar jsonData al backend
        // console.log(jsonData);
        setJson(jsonData);
      });
    }
    // setFile(file); // Guardar el archivo en el estado de tu componente
  };
  const handleSubmit = () => {
    setUploaded(true);
    fetch("http://localhost:8081/registro/estudiante", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        // Procesar la respuesta del backend si es necesario
        setMsg(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error al enviar los datos al backend:", error);
      });
  };
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center bg-primary ">
        <br />
        <br />
        <br />
        <br />
        <h2>Carga de Estudiantes</h2>
        <br />
        <p>Seleccione el archivo CSV con los datos de los estudiantes</p>
        <br />
        <div className="carga">
          <input
            ref={fileInputRef}
            className="form-control mb-3"
            type="file"
            id="formFile"
            onChange={handleFileUpload}
          />
          <button
            className="btn btn-w btn-success mt-3 form-control"
            onClick={handleSubmit}
            disabled={uploaded}
          >
            Subir Estudiantes
          </button>
          <br />
          <p>{msg?.message}</p>
        </div>
      </div>
    </>
  );
};