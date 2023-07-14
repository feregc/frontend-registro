import { useState, useEffect } from "react";
import "../../Assets/styles/styles-admin/Admin-asignar-rol.css";

export const RolDocente = () => {
  const [centroSeleccionado, setCentroSeleccionado] = useState(0);
  const [opcionDeCarrera, setOpcionDeCarrera] = useState(null);
  const [mostrarListaDeCarreras, setMostrarListaDeCarreras] = useState(false);

  const handleCentro = (event) => {
    setCentroSeleccionado(event.target.value);
    mostrar(event.target.value);
  };

  const opcionCarrera = (nombreCarrera) => {
    setOpcionDeCarrera(nombreCarrera);
  };

  const mostrar = (centroSeleccionado) => {
    if (centroSeleccionado !== "x") {
      setMostrarListaDeCarreras(true);
    } else {
      setMostrarListaDeCarreras(false);
    }
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center ">
        <div className="d-flex flex-column justify-content-center ">
          <div className="form">
            <br />
            <br />
            <h2 htmlFor="lang">Centro: </h2>
            <br />
            <select
              name="centros"
              id="lang"
              className="form-control2 w-75"
              value={centroSeleccionado}
              onChange={handleCentro}
            >
              <option value="x">Seleciona un centro</option>
              <option value="1">CU</option>
              <option value="2">UNAH-VS</option>
              <option value="3">UNAH-CURC</option>
              <option value="4">UNAH-CURLA</option>
              <option value="5">UNAH-CURLP</option>
              <option value="6">UNAH-CUROC</option>
              <option value="7">UNAH-CURNO</option>
              <option value="8">UNAH-TEC Danli</option>
              <option value="9">UNAH-TEC AGUÁN</option>
            </select>
            <br />
          </div>
        </div>
        {mostrarListaDeCarreras && (
          <div className="d-flex flex-column justify-content-center">
            <div className="form">
              <br />
              <h3>Carrera:</h3>
              <ListaDeCarreras
                centro={centroSeleccionado}
                opcion={opcionCarrera}
              />
              <br />
            </div>

            <div className="d-flex justify-content-center ">
              <div className=" w-75">
                <ListaDocentes
                  carrera={opcionDeCarrera}
                  centro={centroSeleccionado}
                />
              </div>
            </div>
          </div>
        )}

        {/* <div className="d-flex justify-content-center ">
          <div className=" w-75">
            <ListaDocentes
              carrera={opcionDeCarrera}
              centro={centroSeleccionado}
            />
          </div>
        </div> */}
      </div>
    </>
  );
};

const ListaDeCarreras = ({ centro, opcion }) => {
  const [carreras, setCarreras] = useState(null);
  const [cargaDeCarreras, setCargaDeCarreras] = useState(true);
  {
    /* datos de prueba*/
  }
  useEffect(() => {
    const fetchCarrera = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/carreras/${centro}`
        );
        const jsonData = await response.json();
        setCarreras(jsonData);
        setCargaDeCarreras(false);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchCarrera();
  }, [centro]);

  useEffect(() => {
    setCarreras(null);
    setCargaDeCarreras(true);
  }, [centro]);

  {
    /*Funcion para cargar la carrera*/
  }
  const opcionDeCarrera = (NombreDeCarrera) => {
    opcion(NombreDeCarrera);
  };
  {
    /**Toma el valor de la carrera seleccinada */
  }
  const handleCarrera = (event) => {
    opcionDeCarrera(event.target.value);
  };
  return (
    <>
      {cargaDeCarreras ? (
        <>
          <br />
          <h3>Cargando carreras</h3>
          <br />
        </>
      ) : (
        <select
          id="lang"
          className="form-control2 w-75"
          onChange={handleCarrera}
        >
          {carreras.map((carrera, index) => (
            <option key={index} value={carrera.nombre}>
              {carrera.nombre}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

const ListaDocentes = ({ carrera, centro }) => {
  const [docentes, setDocentes] = useState([]);
  const [rolSeleccionado, setRolSeleccionado] = useState({});
  const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false);
  const [realizarActualizacion, setRealizarActualizacion] = useState(true);

  const handleRol = async (event, numEmpleado) => {
    const { value } = event.target;
    setRolSeleccionado((prevRoles) => ({
      ...prevRoles,
      [numEmpleado]: value,
    }));
    if (realizarActualizacion == true) {
      try {
        const response = await fetch(
          `http://localhost:8081/docentes/${value}/${numEmpleado}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              num_empleado: numEmpleado,
              cargo: value,
            }),
          }
        );
        if (response.ok) {
        } else {
          console.log("Error al actualizar");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  useEffect(() => {
    const fetchDocente = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/docente/${carrera}/${centro}`
        );
        const jsonData = await response.json();
        setDocentes(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchDocente();
  }, [carrera]);
  const handleAceptar = () => {
    setMostrarAdvertencia(false);
  };

  useEffect(() => {
    const cantidadJefesDepartamento = Object.values(rolSeleccionado).filter(
      (rol) => rol === "Jefe de departamento"
    ).length;
    setMostrarAdvertencia(cantidadJefesDepartamento > 1);
    setRealizarActualizacion(cantidadJefesDepartamento <= 1);
  }, [rolSeleccionado]);

  // console.log(realizarActualizacion)

  return (
    <div className="d-flex flex-column justify-content-center">
      <div className="d-flex flex-column justify-content-center">
        {mostrarAdvertencia && (
          <>
            <br />
            <p>
              Solo puede existir un docente con el cargo de Jefe de departamento
            </p>
            <br />
            <div className="d-flex flex-column justify-content-center align-items-center">
              <button
                className="btn btn-success btn-w form-control"
                onClick={handleAceptar}
              >
                Aceptar
              </button>
            </div>
            <br />
          </>
        )}
        {!mostrarAdvertencia && (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col" className="">
                  Docentes
                </th>
                <th scope="col" className="">
                  Rol
                </th>
              </tr>
            </thead>
            <tbody>
              {docentes &&
                docentes.length > 0 &&
                docentes.map((dato) => (
                  <tr key={dato.num_empleado}>
                    <th scope="row">
                      {dato.nombres} {dato.apellidos}
                    </th>
                    <td>
                      <div>
                        <select
                          name="docentes"
                          id="lang"
                          className="form-control2"
                          value={rolSeleccionado[dato.num_empleado]}
                          onChange={(event) =>
                            handleRol(event, dato.num_empleado)
                          }
                        >
                          <option value={dato.cargo}>{dato.cargo}</option>
                          {dato.cargo !== "Docente" && (
                            <option value="Docente">Docente</option>
                          )}
                          {dato.cargo !== "Coordinador" && (
                            <option value="Coordinador">Coordinador</option>
                          )}
                          {dato.cargo !== "Jefe de departamento" && (
                            <option value="Jefe de departamento">
                              Jefe de departamento
                            </option>
                          )}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
