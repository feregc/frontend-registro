
// import { useState, useRef, useContext } from "react";
// import { convertirCsvToJson } from "../helpers/convertirCsvToJson";
// import "../../Assets/styles/styles-admin/Admin-carga-estudiante.css";
// import "../../Assets/styles/styles-admin/Admin-home.css";
// import Swal from 'sweetalert2';
// import { AuthContext } from "../../Estudiantes/chat/auth/AuthContext";



// export const CargaEstudiantes = () => {
//   const [msg, setMsg] = useState({});
//   const [file, setFile] = useState();
//   const [json, setJson] = useState([{}]);
//   const [uploaded, setUploaded] = useState(false);
//   const [estudiantes, setEstudiantes] = useState([]);

//   const { register } = useContext( AuthContext );


//   const fileInputRef = useRef(null); // Referencia al input de tipo file

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     // Aquí puedes realizar acciones adicionales con el archivo, como validaciones
//     if (file) {
//       const fileName = file.name;
//       const fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);
//       if (fileExtension.toLowerCase() !== "csv") {
//         setMsg({
//           message: "Formato no aceptado. Por favor, sube un archivo CSV.",
//         });
//         fileInputRef.current.value = null; // Limpiar el campo de entrada de tipo file
//         return;
//       }
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

//         // AQUI TENGO QUE VOLVER A PEDIR LOS DATOS PARA INGRESARLOS EN MONGO
//         fetch("http://localhost:8081/estudiante")
//           .then((response) => response.json())
//           .then((data) => {
//             console.log(data.usuario);

//             data.usuario.map((estudiante) => (

//             const msgMDB = await register(estudiante.primer_nombre + estudiante.segundo_nombre + estudiante.primer_apellido, estudiante.correo_institucional, estudiante.password_institucional);

//             if (msg !== true) {
//               Swal.fire('Error', msg, 'error');
//             }


//             ))


//             setEstudiantes(data);
//           })
//           .catch((error) => {
//             console.error("Error al obtener estudiantes:", error);
//           });
//         //HASTA AQUI
//         // Procesar la respuesta del backend si es necesario
//         setMsg(data);
//         // console.log(data);
//       })
//       .catch((error) => {
//         console.error("Error al enviar los datos al backend:", error);
//       });
//   };

//   const regresar = () => {
//     window.history.back();
//   };

//   return (
//     <>
//       <div className="container">
//         <button className="btn btn-success my-4" onClick={regresar}>
//           Atrás
//         </button>
//         <div className="col my-5">
//           <div className="row">
//             <div className="my-3 d-flex justify-content-center">
//               <h2>Carga de Estudiantes</h2>
//             </div>
//             <div className="my-3 d-flex justify-content-center">
//               <p>Seleccione el archivo CSV con los datos de los estudiantes</p>
//             </div>
//             <div className="my-3 d-flex justify-content-center">
//               <div className="row">
//                 <div className="col">
//                   <div className="carga">
//                     <input
//                       ref={fileInputRef}
//                       className="form-control mb-3"
//                       type="file"
//                       id="formFile"
//                       onChange={handleFileUpload}
//                     />
//                     <button
//                       className="btn btn-w btn-success mt-3"
//                       onClick={handleSubmit}
//                       disabled={uploaded}
//                     >
//                       Subir Estudiantes
//                     </button>
//                     <br />
//                     <p>{msg?.message}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };



import { useState, useRef, useContext } from "react";
import { convertirCsvToJson } from "../helpers/convertirCsvToJson";
import "../../Assets/styles/styles-admin/Admin-carga-estudiante.css";
import "../../Assets/styles/styles-admin/Admin-home.css";
import Swal from 'sweetalert2';
import { AuthContext } from "../../Estudiantes/chat/auth/AuthContext";



export const CargaEstudiantes = () => {
  const [msg, setMsg] = useState({});
  const [json, setJson] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [estudiantes, setEstudiantes] = useState([]);

  const { register } = useContext(AuthContext);

  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);
      if (fileExtension.toLowerCase() !== "csv") {
        setMsg({
          message: "Formato no aceptado. Por favor, sube un archivo CSV.",
        });
        fileInputRef.current.value = null;
        return;
      }
      try {
        const jsonData = await convertirCsvToJson(file);
        setJson(jsonData);
      } catch (error) {
        console.error("Error al convertir CSV a JSON:", error);
      }
    }
  };

  const handleSubmit = async () => {
    setUploaded(true);
    try {
      const response = await fetch("http://localhost:8081/registro/estudiante", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      const responseData = await response.json();

      try {
        const estudiantesResponse = await fetch("http://localhost:8081/estudiante");
        const estudiantesData = await estudiantesResponse.json();
        console.log(estudiantesData);
        const promesas = estudiantesData.usuario.map(async (estudiante) => {
          const msgMDB = await register(
            estudiante.primer_nombre + ' ' + estudiante.segundo_nombre+ ' ' +estudiante.primer_apellido,
            estudiante.correo_institucional,
            estudiante.password_institucional
          );

          if (msgMDB !== true) {
            Swal.fire('Error', msgMDB, 'error');
          }

          return estudiante;
        });

        const resultados = await Promise.all(promesas);
        console.log("Resultados:", resultados);

        setEstudiantes(resultados);
      } catch (error) {
        console.error("Error al obtener estudiantes:", error);
      }

      setMsg(responseData);
    } catch (error) {
      console.error("Error al enviar los datos al backend:", error);
    }
  };

  const regresar = () => {
    window.history.back();
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-success my-4" onClick={regresar}>
          Atrás
        </button>
        <div className="col my-5">
          <div className="row">
            <div className="my-3 d-flex justify-content-center">
              <h2>Carga Archivo de Estudiantes</h2>
            </div>
            <div className="my-3 d-flex justify-content-center">
              <p>Seleccione el archivo CSV con los datos de los estudiantes</p>
            </div>
            <div className="my-3 d-flex justify-content-center">
              <div className="row">
                <div className="col">
                  <div className="carga">
                    <input
                      ref={fileInputRef}
                      className="form-control mb-3"
                      type="file"
                      id="formFile"
                      onChange={handleFileUpload}
                    />
                    <button
                      className="btn btn-w btn-success mt-3"
                      onClick={handleSubmit}
                      disabled={uploaded}
                    >
                      Cargar Datos
                    </button>
                    <br />
                    <p>{msg?.message}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
