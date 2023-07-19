import { useEffect, useState } from "react";
import { Modal } from "react-modal";

export const CargaAcademica = () => {
  const [verCarga, setVerCarga] = useState([]);
  const num_empleado = localStorage.getItem("id");
  const [docente, setDocente] = useState({});

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
        console.error("Error al obtener las solicitudes del coordinador:", error);
      }
    }
  }, [num_empleado]);

  useEffect(() => {
    if (docente.centro_id && docente.carrera_id) {
      obtenerCarga(docente.carrera_id, docente.centro_id);
    }
  }, [docente]);

  async function obtenerCarga(carreraId, centroId) {
    try {
      const response = await fetch(
        `http://localhost:8081/consulta-secciones/${carreraId}/${centroId}/2`
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
            <div className="d-flex my-3 justify-content-center">
              <h3>Carga Académica</h3>
            </div>
            <div className="d-flex my-3 justify-content-center">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <th scope="col" >Sección</th>
                  <th scope="col" >Cod. Asignatura</th>
                  <th scope="col" >Asignatura</th>
                  <th scope="col" >No. Docente</th>
                  <th scope="col" >Docente</th>
                  <th scope="col" >Cant. Estudiantes</th>
                  <th scope="col" >Cupos Habilitados</th>
                  <th scope="col" >Edificio</th>
                  <th scope="col" >Aula</th>
                </thead>
                <tbody>
                  {verCarga.map((seccion) => (
                    <tr key={seccion.id_seccion}>
                      <td>{seccion.id_seccion}</td>
                      <td>{seccion.id_clase}</td>
                      <td>{seccion.nombre_clase}</td>
                      <td>{seccion.num_empleado}</td>
                      <td>{seccion.nombre_empleado}</td>
                      <td>{seccion.cant_estudiantes}</td>
                      <td>{seccion.cupos}</td>
                      <td>{seccion.nombre_edificio}</td>
                      <td>{seccion.num_aula}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex my-3 justify-content-center">
              <button
              
              className="btn btn-w mx-2 btn-primary control-form"
              >
                Descargar
              </button>
              <button
              className="btn btn-w mx-2 btn-primary control-form"
              >
                Ampliar Cupos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal
        isOpen={abrirModal}
        onRequestClose={cerrarModal}
      >
        <h4>Hola Modal</h4>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut dolorum tenetur illum illo, quaerat dicta? Molestias harum ratione officiis a exercitationem, tenetur laborum quidem quis, nesciunt, consectetur dolores asperiores velit.
        </div>

      </Modal> */}
    </>
  );
};
