import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const EvaluacionPage = () => {
  const [verCarga, setVerCarga] = useState([]);
  const [docente, setDocente] = useState({});
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const [opcionActual, setOpcionActual] = useState("");
  const [opciones, setOpciones] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const { num_empleado } = useParams();

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setOpcionActual(selectedYear);
  };

  const handleOpcionChange = (event) => {
    const selectedOptionValue = event.target.value;
    setOpcionSeleccionada(selectedOptionValue);
  };

  useEffect(() => {
    const getCurrentYear = () => {
      return new Date().getFullYear();
    };

    const generateYearOptions = () => {
      const currentYear = getCurrentYear();
      const years = [currentYear, currentYear - 1, currentYear - 2];
      const options = years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ));
      setOpciones(options);
    };

    generateYearOptions();
  }, []);

  useEffect(() => {
    obtenerDocente();
    async function obtenerDocente() {
      try {
        const response = await fetch(
          `http://localhost:8081/docente/${num_empleado}`
        );
        const jsonData = await response.json();
        const docenteData = jsonData[0];
        setDocente(docenteData);
      } catch (error) {
        console.error("Error al obtener el docente:", error);
      }
    }
  }, [num_empleado]);

  useEffect(() => {
    if (docente.centro_id && docente.carrera_id) {
      obtenerCarga(docente.carrera_id, docente.centro_id);
    }
  }, [docente, opcionActual, opcionSeleccionada]);

  async function obtenerCarga(carreraId, centroId) {
    try {
      const response = await fetch(
        `http://localhost:8081/Evaluaciones/${num_empleado}/${opcionActual}/${opcionSeleccionada}`
      );
      const jsonData = await response.json();
      setVerCarga(jsonData);
    } catch (error) {
      console.error("Error al obtener la carga académica:", error);
    }
  }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const filteredItems = verCarga.filter((seccion) =>
    seccion.nombre_clase.toLowerCase().includes(searchText.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const regresar = () => {
    history.back();
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <br />
            <div className="col-3">
              <button className="btn btn-primary my-4" onClick={regresar}>
                Atrás
              </button>
            </div>
            <div className="d-flex my-3 justify-content-center">
              <h3>
                Evaluaciones docente de: {docente.nombres} {docente.apellidos}
              </h3>
            </div>

            <div className="row justify-content-center">
              <div className="col-3 d-flex my-3 justify-content-center">
                <select
                  className="form-control"
                  name=""
                  id="opcion"
                  value={opcionSeleccionada}
                  onChange={handleOpcionChange}
                >
                  <option value="">Periodo Académico</option>
                  <option value="I-PAC">I PAC</option>
                  <option value="II-PAC">II PAC</option>
                  <option value="III-PAC">III PAC</option>
                </select>
              </div>
              <div className="col-3 d-flex my-3 justify-content-center">
                <select
                  className="form-control"
                  name=""
                  id="opcion"
                  value={opcionActual}
                  onChange={handleYearChange}
                >
                  <option value="">Año</option>
                  {opciones}
                </select>
              </div>
              <div className="col-3 d-flex my-3 justify-content-center">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filtra por la clase"
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            <div className="col">
              <div className="container">
                <div className="row">
                  <div className="col">
                    {currentItems.map((seccion, index) => (
                      <div key={index}>
                        <h5 className="text-center my-3">Evaluación: No. {index + 1}</h5>
                        <h5 className="text-center my-3">Asignatura: {seccion.nombre_clase}</h5>
                        <table className="table table-striped table-bordered table-bordered my-4">
                          <thead>
                            <tr>
                              <th scope="col" className="text-center">
                                Categoría
                              </th>
                              <th scope="col" className="text-center">Observaciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td scope="row">
                                Capacidad de comunicación
                              </td>
                              <td>{seccion.comentarioI}</td>
                            </tr>
                            <tr>
                              <td scope="row">
                                Organización y estructura de la clase
                              </td>
                              <td>{seccion.comentarioII}</td>
                            </tr>
                            <tr>
                              <td scope="row">
                                Habilidad fomentar la participación
                              </td>
                              <td>{seccion.comentarioIII}</td>
                            </tr>
                            <tr>
                              <td scope="row">
                                Capacidad para motivar y mantener el interés
                              </td>
                              <td>{seccion.comentarioIIII}</td>
                            </tr>
                            <tr>
                              <td scope="row">
                                Capacidad para explicar
                              </td>
                              <td>{seccion.comentarioIIIII}</td>
                            </tr>
                            <tr>
                              <td scope="row">
                                Aspectos en los que puede mejorar el docente
                              </td>
                              <td>{seccion.comentarioIIIIII}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredItems.length}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => paginate(number)}
              className={`page-link ${number === currentPage ? "active" : ""}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
