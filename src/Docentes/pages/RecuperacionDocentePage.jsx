import { useEffect, useState } from "react";

import { DocenteCard } from "../components/DocenteCard";
import "../../Assets/styles/styles-docentes/Docente-lista.css";
export const RecuperacionDocentePage = () => {
  const [email, setEmail] = useState("");
  const [docenteLogeado, setDocenteLogeado] = useState({});
  const [docentesSeleccionado, setDocentesSeleccionado] = useState([]);
  const [correoDocente, setCorreoDocente] = useState("");
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      fetch(`http://localhost:8081/docente/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setDocenteLogeado(data[0]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

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

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <form onSubmit={handleSubmit}>
              <div className="my-3 d-flex justify-content-center bg-primary">
                <h3 className="my-3">Docentes disponibles</h3>
              </div>
              <div className="my-3 d-flex justify-content-center bg-primary">
                <label htmlFor="">Ingrese el correo del docente a buscar</label>
              </div>
              <div className="my-3 d-flex justify-content-center bg-primary">
                <input
                  type="text"
                  className="form-control w-50"
                  placeholder="Ingrese el correo del docente"
                  value={correoDocente}
                  onChange={(e) => setCorreoDocente(e.target.value)}
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
          {docentesSeleccionado && Array.isArray(docentesSeleccionado) ? (
            <>
              <div className="container">
                <div className="row">
                  <div className="col">
                      <br />
                    <div className="my-6 d-flex justify-content-center bg-primary ">
                      <h3 className="my-6">Docentes Encontrados</h3>
                    </div>
                    <div className="my-6 d-flex align-items-center">
                      <div className="container">
                        <ul id="card-doc" className="row">
                          {docentesSeleccionado.map((docente) => (
                            <DocenteCard
                              key={docente.num_empleado}
                              docente={docente}
                            />
                          ))}
                        </ul>
                      </div>
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
                        Docente no encontrado
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
