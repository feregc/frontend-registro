import { useEffect, useState } from "react";
import { Modal } from "react-modal";

export const CargaAcademica = () => {
  const {verCarga, setVerCarga} = useState([]);
  const num_empleado = localStorage.getItem("id");
  const {
    nombres,
    apellidos,
    identidad,
    correo,
    centro,
    carrera,
    cargo,
  } = docente;

  useEffect(() => {
    const verCarga = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/consulta-secciones/${carrera}/${centro}/2`
        );
        const jsonData = await response.json();
        setVerCarga(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    verCarga();
  }, []);
  
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
                  <tr>
                    <th>[]</th>
                    <th>IS901</th>
                    <th>[nombre_clase]</th>
                    <th>12</th>
                    <th>María Rodríguez</th>
                    <th>15</th>
                    <th>15</th>
                    <th>B2</th>
                    <th>105</th>
                  </tr>
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
