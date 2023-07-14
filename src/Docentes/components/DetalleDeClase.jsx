import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchClase, fetchAlumnos } from "../Helpers/api";

export const DetalleClase = () => {
  const { id } = useParams();
  const [alumno, setAlumno] = useState([]);
  // const [nota, setNota] = useEffect(false);

  //Lista de alumnos
  const [valorInput, setValorInput] = useState(0);
  const [editar, setEditar] = useState(false);
  const [numCuenta, setNumCuenta] = useState(null);

  useEffect(() => {
    const fetchclase = async () => {
      try {
        const response = await fetch(`http://localhost:8081/clasealumno/${id}`);
        const jsonData = await response.json();
        setAlumno(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchclase();
  }, []);

  {
    /*Para los datos de los detalles de la clase utilizar la misma peticion desde el helpers
    Hacer petición para saber si esta activo el registro de notas
    Hacer petición que captura las notas ingresadas en caso de que este activo el registro y usar el enter para enviar los datos a la bd
   */
  }

  const handleEditar = (num_cuenta) => {
    setNumCuenta(num_cuenta);
    setEditar(true);
  };
  const handleGuardar = async () => {
    setEditar(false);
    // Almacenar datos de la nota
    try {
      const response = await fetch(
        `http://localhost:8081/notaEstudiante/nota/${numCuenta}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nota: valorInput }),
        }
      );
      if (response.ok) {
        console.log("Nota guardada exitosamente");
      } else {
        throw new Error("Error al guardar la nota");
      }
      const resp = await fetch(`http://localhost:8081/clasealumno/${id}`);
      const jsonData = await resp.json();
      setAlumno(jsonData);
    } catch (error) {
      console.error("Error al realizar la petición:", error);
    }
  };
  // Obtener datos de la clase, enviando el codigo de la clase
  // useEffect(() => {
  //   const obtenerDatos = async () => {
  //     const data = await fetchClase();
  //     setClase(data)
  //     const alumnos = await fetchAlumnos();
  //     setAlumno(alumnos)
  //   };s
  //   obtenerDatos();
  // }, [valorInput]);

  // Validar entrada de notas
  const numeroDeEntrada = (event) => {
    const input = event.target.value;
    if (input == "") {
      console.log("El input no deve estar vacio");
    } else {
      setValorInput(input);
    }
  };

  return (
    <>
      <div className="container">
        <div className="col">
          <div className="row">
            <div className="d-flex justify-content-center my-3">
            <h3>Lista de Estudiantes Matriculados</h3>
            </div>
          </div>
          <div className="row">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Nota</th>
                </tr>
              </thead>
              <tbody>
                {alumno &&
                  alumno.length > 0 &&
                  alumno.map((dato, index) => (
                    <tr key={index}>
                      <th scope="row">{dato.primer_nombre}</th>
                      <th scope="row">{dato.primer_apellido}</th>
                      {/* Lista de estudiantes que pertenecen a la clase */}
                      <th scope="row">
                        {" "}
                        {editar && dato.num_cuenta === numCuenta ? (
                          <>
                            <div className="container">
                              <div className="row">
                                <div className="col-8">
                                  <input
                                    className="form-control"
                                    type="text"
                                    onChange={numeroDeEntrada}
                                  />
                                </div>
                                <div className="col-4">
                                  <button
                                    className="btn btn-success"
                                    onClick={handleGuardar}
                                  >
                                    Guardar
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <p>{dato.nota}</p>
                            <button
                              className="btn btn-success"
                              disabled={false}
                              onClick={() => handleEditar(dato.num_cuenta)}
                            >
                              Editar
                            </button>
                          </>
                        )}
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
