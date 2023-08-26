import React, { useState, useEffect } from "react";

export const CancelarSeccionesPage = () => {
  const [clases, setClases] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [showSecciones, setShowSecciones] = useState(false);
  const [docenteData, setDocenteData] = useState([]);
  const [paginas, setPaginas] = useState(1);
  const itemsPaginas = 9;
  const [pag, setPag] = useState(1);
  const itemsPag = 9;

  const fetchDocenteData = (docenteId) => {
    fetch(`http://localhost:8081/docente/${docenteId}`)
      .then((response) => response.json())
      .then((data) => {
        setDocenteData(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del docente:", error);
      });
  };

  const fetchClases = () => {
    if (docenteData.length > 0 && docenteData[0].carrera_id) {
      fetch(
        `http://localhost:8081/clasesDisponibles/${docenteData[0].carrera_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setClases(data);
        })
        .catch((error) => {
          console.error("Error al obtener las clases:", error);
        });
    }
  };

  const mostrarSecciones = (idClase) => {
    fetch(`http://localhost:8081/seccionesDisponibles/${idClase}`)
      .then((response) => response.json())
      .then((data) => {
        setSecciones(data);
        setShowSecciones(true);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener las secciones:", error);
      });
  };

  const eliminarSeccion = (idSeccion) => {
    console.log(idSeccion);

    fetch(`http://localhost:8081/eliminarseccion/${idSeccion}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log('Sección eliminada:', data);
        // Actualizar las secciones después de eliminar
        const updatedSecciones = secciones.filter(
          (seccion) => seccion.id_seccion !== idSeccion
        );
        setSecciones(updatedSecciones);
        alert("Sección eliminada");
      })
      .catch((error) => {
        console.error("Error al eliminar la sección:", error);
        alert("Error al eliminar seccion");
      });
  };

  useEffect(() => {
    const docenteId = localStorage.getItem("id");
    if (docenteId) {
      fetchDocenteData(docenteId);
    }
  }, []);

  useEffect(() => {
    fetchClases();
  }, [docenteData]);

  const regresar = () => {
    window.history.back();
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-success mt-4" onClick={regresar}>
          Atrás
        </button>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-center my-3">
              <h3>Cancelar Secciones</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <table className="table table-hover table-stripted">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    Nombre de la Clase
                  </th>
                  <th scope="col" className="text-center">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {clases
                  .slice((paginas - 1) * itemsPaginas, paginas * itemsPaginas)
                  .map((clase) => (
                    <tr key={clase.id_clase}>
                      <td scope="row">{clase.nombre}</td>
                      <td scope="row" className="d-flex justify-content-center">
                        <button
                          className="btn btn-success btn-w"
                          onClick={() => mostrarSecciones(clase.id_clase)}
                        >
                          Secciones
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
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
                {Array.from(
                  {
                    length: Math.ceil(clases.length / itemsPaginas),
                  },
                  (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        paginas === i + 1 ? "active" : ""
                      }`}
                      onClick={() => setPaginas(i + 1)}
                    >
                      <span className="page-link">{i + 1}</span>
                    </li>
                  )
                )}
                <li
                  className={`page-item ${
                    paginas === Math.ceil(clases.length / itemsPaginas)
                      ? "disabled"
                      : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPaginas(paginas + 1)}
                    disabled={
                      paginas === Math.ceil(clases.length / itemsPaginas)
                    }
                  >
                    Siguiente
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-6">
            {showSecciones && (
              <>
                <table className="table table-hover table-stripted">
                  <thead>
                    <tr>
                      <th scope="col" className="text-center">
                        Sección
                      </th>
                      <th scope="col" className="text-center">
                        Nombres
                      </th>
                      <th scope="col" className="text-center">
                        Edificio
                      </th>
                      <th scope="col" className="text-center">
                        Aula
                      </th>
                      <th scope="col" className="text-center">
                        Hi
                      </th>
                      <th scope="col" className="text-center">
                        Hf
                      </th>
                      <th scope="col" className="text-center">
                        Eliminar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {secciones.map((seccion) => (
                      <tr key={seccion.id_seccion}>
                        <td scope="row">{seccion.id_seccion}</td>
                        <td scope="row">
                          {seccion.nombres} {seccion.apellidos}
                        </td>
                        <td scope="row">{seccion.nombre_edificio}</td>
                        <td scope="row">{seccion.num_aula}</td>
                        <td scope="row">{seccion.horainicio}</td>
                        <td scope="row">{seccion.horafin}</td>
                        <td
                          scope="row"
                          className="d-flex justify-content-center"
                        >
                          <button
                            className="btn btn-success w-100"
                            onClick={() => eliminarSeccion(seccion.id_seccion)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${paginas === 1 ? "disabled" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setPaginas(paginas - 1)}
                        disabled={paginas === 1}
                      >
                        Anterior
                      </button>
                    </li>
                    {Array.from(
                      {
                        length: Math.ceil(secciones.length / itemsPag),
                      },
                      (_, i) => (
                        <li
                          key={i}
                          className={`page-item ${
                            pag === i + 1 ? "active" : ""
                          }`}
                          onClick={() => setPag(i + 1)}
                        >
                          <span className="page-link">{i + 1}</span>
                        </li>
                      )
                    )}
                    <li
                      className={`page-item ${
                        pag === Math.ceil(secciones.length / itemsPag)
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setPaginas(pag + 1)}
                        disabled={
                          pag === Math.ceil(secciones.length / itemsPag)
                        }
                      >
                        Siguiente
                      </button>
                    </li>
                  </ul>
                </nav>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
