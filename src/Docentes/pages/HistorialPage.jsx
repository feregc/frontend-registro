import React, { useState } from "react";
import { convertirFechaAño } from "../Helpers/convertirFecha";

export const HistorialPage = () => {
  const [numCuenta, setNumCuenta] = useState("");
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState([]);
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [perfilEstudiante, setPerfilEstudiante] = useState([]);
  const [paginas, setPaginas] = useState(1);
  const itemsPaginas = 10;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const responseEstudiante = await fetch(
        `http://localhost:8081/estudiante/${numCuenta}`
      );
      const imgPerfil = await responseEstudiante.json();
      setPerfilEstudiante(imgPerfil);
  
      const responseHistorial = await fetch(
        `http://localhost:8081/historialEstudiante/${numCuenta}`
      );
      const data = await responseHistorial.json();
      setEstudianteSeleccionado(data);
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
        <button className="btn btn-success mt-4" onClick={regresar}>
          Atrás
        </button>
        <div className="row">
          <div className="col">
            <form onSubmit={handleSubmit}>
              <div className="my-3 d-flex justify-content-center bg-primary">
                <h2 className="my-3">Buscar Estudiante</h2>
              </div>
              <div className="my-3 d-flex justify-content-center bg-primary">
                <label htmlFor="">
                  Ingrese el número de cuenta del alumno a buscar
                </label>
              </div>
              <div className="my-3 d-flex justify-content-center bg-primary">
                <input
                  type="text"
                  className="form-control w-50"
                  placeholder="Ingrese el número de cuenta"
                  value={numCuenta}
                  onChange={(e) => setNumCuenta(e.target.value)}
                />
              </div>
              <div className="my-3 d-flex justify-content-center">
                <button className="btn btn-w btn-primary" type="submit">
                  Buscar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {formularioEnviado && (
        <div className="container">
          {Array.isArray(estudianteSeleccionado) && estudianteSeleccionado.length > 0 ? (
            <div className="row">
              <div className="col">
                <div id="pdfContainer">
                  {/* Información del estudiante */}
  
                  <div className="container">
                    <div className="row my-4 p-2 border border-2 rounded-4">
                      <center><h2>Historial academico</h2></center>
                      <div className="col-6">
                        <p className="text-black fw-bold">
                          Cuenta: {perfilEstudiante.num_cuenta}
                        </p>
                        <p className="text-black fw-bold">
                          Nombre: {perfilEstudiante.primer_nombre}{" "}
                          {perfilEstudiante.segundo_nombre}
                        </p>
                        <p className="text-black fw-bold">
                          Apellido: {perfilEstudiante.primer_apellido}{" "}
                          {perfilEstudiante.segundo_apellido}
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-black fw-bold">
                          Carrera: {perfilEstudiante.nombre_carrera}
                        </p>
                        <p className="text-black fw-bold">
                          Centro: {perfilEstudiante.nombre_centro}
                        </p>
                        <p className="text-black fw-bold">
                          Índice: {perfilEstudiante.indice}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Tabla de historial académico */}
                  <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Código</th>
                  <th scope="col">Nombre de la Clase</th>
                  <th scope="col">Año</th>
                  <th scope="col">Período</th>
                  <th scope="col">Nota</th>
                </tr>
              </thead>
              <tbody>
                {estudianteSeleccionado.map((clase, index) => (
                  <tr key={index}>
                    <td scope="row">{clase.codigo}</td>
                    <td scope="row">{clase.nombre_clase}</td>
                    <td scope="row">
                      {convertirFechaAño(clase.anio)}
                    </td>
                    <td scope="row">{clase.periodo}</td>
                    <td scope="row">{clase.nota}</td>
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
                      {Array.from({ length: Math.ceil(estudianteSeleccionado.length / itemsPaginas) }, (_, i) => (
                        <li
                          key={i}
                          className={`page-item ${
                            paginas === i + 1 ? "active" : ""
                          }`}
                          onClick={() => setPaginas(i + 1)}
                        >
                          <span className="page-link">{i + 1}</span>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          paginas === Math.ceil(estudianteSeleccionado.length / itemsPaginas) ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setPaginas(paginas + 1)}
                          disabled={paginas === Math.ceil(estudianteSeleccionado.length / itemsPaginas)}
                        >
                          Siguiente
                        </button>
                      </li>
                    </ul>
                  </nav>

                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col">
                <div className="d-flex justify-content-center">
                  <div className="alert alert-warning" role="alert">
                    Estudiante no encontrado
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
