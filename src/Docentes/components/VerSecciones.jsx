import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const VerSecciones = () => {
  const [docenteData, setDocenteData] = useState([]);
  const [clases, setClases] = useState([]);
  const navigate = useNavigate();
  const [paginas, setPaginas] = useState(1);
  const itemsPaginas = 9;

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

  useEffect(() => {
    const docenteId = localStorage.getItem("id");
    if (docenteId) {
      fetchDocenteData(docenteId);
    }
  }, []);

  useEffect(() => {
    fetchClases();
  }, [docenteData]);

  const mostrarSecciones = (clase) => {
    navigate("../verSecciones/editarSeccion", { state: clase });
  };
  const regresar = () => {
    window.history.back();
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-success mt-4" onClick={regresar}>
          Atrás
        </button>
        <div className="row my-3">
          <div className="my-3 d-flex justify-content-center">
            <h2>Secciones de Asignaturas</h2>
          </div>
        </div>
        <div className="row">
          <div className="row">
            <div className="col">
              <table className="table table-bordered table-stripted">
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
                        <td scope="row" className="text-center">
                          {clase.nombre}
                        </td>
                        <td
                          scope="row"
                          className="d-flex justify-content-center"
                        >
                          <button
                            className="btn btn-success btn-w"
                            onClick={() => mostrarSecciones(clase)}
                          >
                            Secciones
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col">
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
          </div>
        </div>
      </div>
    </>
  );
};
