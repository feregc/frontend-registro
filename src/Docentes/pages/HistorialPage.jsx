import React, { useState } from "react";
import { convertirFechaAño } from "../Helpers/convertirFecha";

export const HistorialPage = () => {
  const [numCuenta, setNumCuenta] = useState("");
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState([]);
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8081/historialEstudiante/${numCuenta}`
      );
      const data = await response.json();
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
          Atras
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
        <>
          {estudianteSeleccionado && Array.isArray(estudianteSeleccionado) ? (
            <>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <br />
                    <div className="my-6 d-flex justify-content-center bg-primary ">
                      <h3>Historial del Estudiante</h3>
                    </div>
                    <div className="container mt-5">
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
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
            </>
          ) : (
            <>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="d-flex justify-content-center">
                      <div className="alert alert-warning" role="alert">
                        Estudiante no encontrado
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
