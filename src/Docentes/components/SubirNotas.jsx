import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SubirNotas = () => {
  const num_empleado = localStorage.getItem("id");
  // const [id, setId] = useState(0);

  const [alumno, setAlumno] = useState([]);
  const [editar, setEditar] = useState(false);
  const [clases, setClases] = useState([]);
  const [Clase, setClase] = useState(null);
  const [notasTemporales, setNotasTemporales] = useState([]);
  const [mostrarObservacion, setMostrarObservacion] = useState(true);
  const location = useLocation();
  const id = location.state;

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
  }, [clases]);
  //Traer lista de alumnos de la BD
  useEffect(() => {
    const fetchclase = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/estudiantes-seccion/${id}`
        );
        const jsonData = await response.json();
        setAlumno(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchclase();
  }, [editar]);

  const validarNota = (valor) => {
    const numero = parseInt(valor);
    return valor === "" || (!isNaN(numero) && numero >= 0 && numero <= 100);
  };

  const numeroDeEntrada = (event, num_cuenta) => {
    const input = event.target.value;
    if (validarNota(input)) {
      const notasTemporalesActualizadas = notasTemporales.map(
        (notaTemporal) => {
          if (notaTemporal.num_cuenta === num_cuenta) {
            return { ...notaTemporal, nota: input };
          }
          return notaTemporal;
        }
      );

      setNotasTemporales(notasTemporalesActualizadas);
    }
  };

  //boton para activar los input de las notas a editar
  const handleEditar = () => {
    setEditar(true);
    setMostrarObservacion(false);
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
    setMostrarObservacion(true);
  };

  // Reemplazar endpont por el nuevo, el cual recive: id_clase, nota y num_cuenta
  // router.post('/insertar-nota-clasepasada', insertarclasepasada
  const guardarNotasEnBaseDeDatos = async (num_cuenta, nota) => {
    try {
      const url = `http://localhost:8081/insertar-nota-clasepasada`;

      const data = {
        id_clase: id,
        id_estudiante: num_cuenta,
        nota: nota,
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // console.log(`Nota actualizada`);
      } else {
        console.log("Error al guardar la nota en la base de datos");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const notificarSubidaDeNotas = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/enviar-correos-notificacion/${id}`
      );
      if (response.ok) {
        alert(`Notificación enviada`);
      }
    } catch (error) {
      console.error("Error-->", error);
    }
  };

  const navigate = useNavigate();

  const regresar = () => {
    navigate(`../detalle-de-clase/${id}`);
  };

  return (
    <>
      <div className="container">
        {/* Boton para regresar a la pagina anterior */}
        <button className="btn btn-success my-3" onClick={regresar}>
          Atrás
        </button>
        <div className="col">
          <div className="row">
            <div className="d-flex justify-content-center my-3">
              {Clase && (
                <>
                  <div className="col">
                    <div className="d-flex justify-content-center my-3">
                      <h4>Clase: {Clase.nombre_clase}</h4>
                    </div>
                    <div className="d-flex justify-content-center my-3">
                      <h5>Sección: {Clase.id_seccion}</h5>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col">
            <div className="row">
              {/* Editar notas de los estudiantes */}
              {!editar && (
                <>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-w btn-success m-1"
                      onClick={handleEditar}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-w btn-success m-1"
                      onClick={notificarSubidaDeNotas}
                    >
                      Notificar a Estudiantes
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col">
            <div className="row">
              {/* Guardar notas de los estudiantes */}
              {editar && (
                <>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-w btn-success m-1"
                      onClick={handleGuardar}
                    >
                      Guardar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="row my-3">
            <table className="table table-striped table-bordered ">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    Nombre
                  </th>
                  <th scope="col" className="text-center">
                    Apellido
                  </th>
                  <th scope="col" className="text-center">
                    Nota
                  </th>
                  <th scope="col" className="text-center">
                    Observación
                  </th>
                </tr>
              </thead>
              <tbody>
                {alumno?.map((dato, index) => (
                  <tr key={index}>
                    <td scope="row" className="text-center">
                      {dato.primer_nombre}
                    </td>
                    <td scope="row" className="text-center">
                      {dato.primer_apellido}
                    </td>
                    <td scope="row" className="text-center">
                      {editar ? (
                        <>
                          <td scope="row" className="text-center">
                            <input
                              className="form-control "
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
                          </td>

                          {!validarNota(
                            notasTemporales.find(
                              (notaTemporal) =>
                                notaTemporal.num_cuenta === dato.num_cuenta
                            )?.nota
                          ) && (
                            <p style={{ color: "red" }}>
                              Ingrese un valor válido (0-100)
                            </p>
                          )}
                        </>
                      ) : (
                        <p>{dato.nota ? dato.nota : "--"}</p>
                      )}
                    </td>
                    {dato.nota === "" ? (
                      <td scope="row" className="text-center">
                        {" "}
                      </td>
                    ) : (
                      mostrarObservacion &&
                      (dato.nota >= 65 ? (
                        <td scope="row" className="text-center">
                          Aprobó
                        </td>
                      ) : (
                        <td scope="row" className="text-center">
                          Reprobó
                        </td>
                      ))
                    )}
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
