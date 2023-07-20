import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const SubirNotas = () => {
  const num_empleado = localStorage.getItem("id");
  const [id,setId] = useState(0)

  const [alumno, setAlumno] = useState([]);
  const [editar, setEditar] = useState(false);
  const [clases, setClases] = useState([]);
  const [Clase, setClase] = useState(null);
  const [notasTemporales, setNotasTemporales] = useState([]);
  const location = useLocation();



  useEffect(() => {
    if (location.state) {
      const  data  = location.state;
      setId(data);
    }
  }, []);
  // Obtener datos de la clase, enviando el id del docente
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const url = `http://localhost:8081/clasesdocentes/${num_empleado}`;
        const result = await fetch(url);
        const data = await result.json();
        setClases(data);
      } catch {
        console.log("Error:", error);
      }
    };
    obtenerDatos();
  }, []);
  //Filtrar la clase por su id
  useEffect(() => {
    if (clases.length > 0) {
      const buscar = clases.find((clase) => clase.id_clase === parseInt(id));
      setClase(buscar || null);
    }
  }, [clases, id]);
  //Traer lista de alumnos de la BD
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
  }, [id, editar]);
  //registrar notas de cada input vinculado al num_cunenta de cada estudiante
  const numeroDeEntrada = (event, num_cuenta) => {
    const input = event.target.value;
    const notasTemporalesActualizadas = notasTemporales.map((notaTemporal) => {
      if (notaTemporal.num_cuenta === num_cuenta) {
        return { ...notaTemporal, nota: input };
      }
      return notaTemporal;
    });
    setNotasTemporales(notasTemporalesActualizadas);
  };
  //boton para activar los input de las notas a editar
  const handleEditar = () => {
    setEditar(true);
    const notasTemporalesInicializadas = alumno.map((dato) => ({
      num_cuenta: dato.num_cuenta,
      nota: dato.nota || "",
    }));
    setNotasTemporales(notasTemporalesInicializadas);
  };
  //boton para guardar las notas editadas
  const handleGuardar = async () => {
    for (const { num_cuenta, nota } of notasTemporales) {
      await guardarNotasEnBaseDeDatos(num_cuenta, nota);
    }
    setEditar(false);
  };
 

  const guardarNotasEnBaseDeDatos = async (num_cuenta, nota) => {
    try {
      const url = `http://localhost:8081/clase-pasada-nota/${id}/${num_cuenta}`;
      // const url = "http://localhost:8081/clase-pasada-nota/2/20231022"
      const data = { nota: nota };
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log(`Nota actualizada`);
      } else {
        console.log("Error al guardar la nota en la base de datos");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="col">
          <div className="row">
            <div className="d-flex justify-content-center my-3">
              {Clase && (
                <>
                  <h4>Clase: {Clase.nombre_clase}</h4>
                  <p>Sección: {Clase.id_seccion}</p>
                </>
              )}
            </div>
          </div>
          <div className="row">
            {/* Editar notas de los estudiantes */}
            {!editar && (
              <button className="btn btn-success m-1" onClick={handleEditar}>
                Editar
              </button>
            )}

            {/* Guardar notas de los estudiantes */}
            {editar && (
              <button className="btn btn-success m-1" onClick={handleGuardar}>
                Guardar
              </button>
            )}

            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Foto</th>
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
                      <th>
                        <img
                          style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: "red}",
                          }}
                          src=""
                          alt=""
                        />
                      </th>
                      <th scope="row">{dato.primer_nombre}</th>
                      <th scope="row">{dato.primer_apellido}</th>
                      <th>
                        {editar ? (
                          <input
                            className="form-control"
                            type="text"
                            value={
                              notasTemporales.find(
                                (notaTemporal) =>
                                  notaTemporal.num_cuenta === dato.num_cuenta
                              )?.nota || ""
                            }
                            onChange={(event) =>
                              numeroDeEntrada(event, dato.num_cuenta)
                            }
                          />
                        ) : (
                          <p>{dato.nota ? dato.nota : "--"}</p>
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
