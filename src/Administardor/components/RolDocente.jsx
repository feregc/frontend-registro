import { useState, useEffect } from "react";
import "../../Assets/styles/styles-admin/Admin-asignar-rol.css";
import { DocenteCard } from "../../Docentes/components/DocenteCard";

export const RolDocente = () => {
  const [centroSeleccionado, setCentroSeleccionado] = useState(0);
  const [opcionDeCarrera, setOpcionDeCarrera] = useState("");
  const [mostrarListaDeCarreras, setMostrarListaDeCarreras] = useState(false);
  const [docentesSeleccionado, setDocentesSeleccionado] = useState([]);
  const [correoDocente, setCorreoDocente] = useState("");
  const [formularioEnviado, setFormularioEnviado] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8081/docenteCorreo/${correoDocente}`
      );
      const data = await response.json();

      setDocentesSeleccionado(data);
      setFormularioEnviado(true);
    } catch (error) {
      console.log("Error:", error);
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
        <div className="row">
          <div className="my-3 d-flex justify-content-center">
            <h2>Cambiar Rol de Docente</h2>
          </div>
        </div>
        <div className="row my-3 ">
          <div className="d-flex justify-content-center">
            <div className="col-6">
              <div className="my-3 d-flex justify-content-center ">
                <h3 htmlFor="lang">Seleccione un Centro: </h3>
              </div>
              <div className="my-3 d-flex justify-content-center ">
                <select
                  name="centros"
                  id="lang"
                  className="form-control2 btn-w2"
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
              </div>
            </div>
            <div className="col-6">
              {mostrarListaDeCarreras && (
                <>
                  <div className="my-3 d-flex justify-content-center">
                    <h3>Seleccione una Carrera:</h3>
                  </div>
                  <div className="my-3 d-flex justify-content-center">
                    <ListaDeCarreras
                      centro={centroSeleccionado}
                      opcion={opcionCarrera}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center ">
          <div className="col">
            <div className="row"></div>

            {opcionDeCarrera && (
              <ListaDocentes
                carrera={opcionDeCarrera}
                centro={centroSeleccionado}
              />
            )}
          </div>
        </div>
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
          className="form-control2 btn-w2"
          onChange={handleCarrera}
        >
          <option value="">Seleccione una carrera</option>
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
  const [currentPage, setCurrentPage] = useState(1);
  const [docentesPerPage] = useState(4); // Number of docentes per page

  const indexOfLastDocente = currentPage * docentesPerPage;
  const indexOfFirstDocente = indexOfLastDocente - docentesPerPage;
  const currentDocentes = docentes.slice(
    indexOfFirstDocente,
    indexOfLastDocente
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(docentes.length / docentesPerPage); i++) {
    pageNumbers.push(i);
  }
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

  useEffect(() => {
    fetchDocente();
    setRolSeleccionado({});
  }, [carrera]);

  const actualizarRol = async (cargo, numEmpleado) => {
    try {
      if (cargo === "Jefe de departamento") {
        const existeJefeDepartamento = docentes.some(
          (docente) =>
            docente.cargo === "Jefe de departamento" &&
            docente.num_empleado !== numEmpleado
        );

        if (existeJefeDepartamento) {
          setMostrarAdvertencia(true);
          return;
        } else {
          setMostrarAdvertencia(false);
        }
      }

      const response = await fetch(
        `http://localhost:8081/docentes/${cargo}/${numEmpleado}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            num_empleado: numEmpleado,
            cargo,
          }),
        }
      );
      if (response.ok) {
        // Actualización exitosa
        fetchDocente(); // Actualizar la lista de docentes
      } else {
        console.log("Error al actualizar");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    const cantidadJefesDepartamento = docentes.filter(
      (docente) => docente.cargo === "Jefe de departamento"
    ).length;
    setRealizarActualizacion(cantidadJefesDepartamento === 0);
  }, [docentes]);

  const handleAceptar = () => {
    setMostrarAdvertencia(false);
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex flex-column justify-content-center">
          {mostrarAdvertencia && (
            <>
              <br />
              <p>
                Solo puede existir un docente con el cargo de Jefe de
                departamento
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
          {carrera && !mostrarAdvertencia && (
            <>
              <div className="container">
                <div className="row">
                  <div className="d-flex justify-content-center">
                    <div className="col">
                      <h3 className="d-flex justify-content-center my-3">
                        Seleccione un rol para un docente
                      </h3>
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
                          {currentDocentes.map((dato) => (
                            <tr key={dato.num_empleado}>
                              <th scope="row">
                                {dato.nombres} {dato.apellidos}
                              </th>
                              <th scope="row">
                                <div>
                                  <select
                                    name="docentes"
                                    id="lang"
                                    className="form-control2 btn-w2"
                                    value={rolSeleccionado[dato.num_empleado]}
                                    onChange={(event) =>
                                      actualizarRol(
                                        event.target.value,
                                        dato.num_empleado
                                      )
                                    }
                                    disabled={
                                      dato.cargo === "Jefe de departamento" &&
                                      rolSeleccionado[dato.num_empleado] ===
                                        "Jefe de departamento"
                                    }
                                  >
                                    <option value={dato.cargo}>
                                      {dato.cargo}
                                    </option>
                                    {dato.cargo !== "Docente" && (
                                      <option value="Docente">Docente</option>
                                    )}
                                    {dato.cargo !== "Coordinador" && (
                                      <option value="Coordinador">
                                        Coordinador
                                      </option>
                                    )}
                                    {dato.cargo !== "Jefe de departamento" && (
                                      <option value="Jefe de departamento">
                                        Jefe de departamento
                                      </option>
                                    )}
                                  </select>
                                </div>
                              </th>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="2">
                              <div className="d-flex justify-content-center">
                                <div>
                                  <nav>
                                    <ul className="pagination">
                                      {pageNumbers.map((number) => (
                                        <li key={number} className="page-item">
                                          <button
                                            className="page-link"
                                            onClick={() =>
                                              setCurrentPage(number)
                                            }
                                          >
                                            {number}
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  </nav>
                                </div>
                                <div></div>
                              </div>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
