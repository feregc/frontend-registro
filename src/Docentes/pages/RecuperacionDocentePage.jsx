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
          //console.log(data[0]);
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
    <form onSubmit={handleSubmit}>
        <div className="mt-6 d-flex flex-column align-items-center bg-primary">
          <h3 className="mt-6">Docentes disponibles</h3>
        </div>
        <div className="mt-6 d-flex flex-column align-items-center bg-primary">
          <label htmlFor="">Ingrese el correo del docente a buscar</label>
        </div>
        <div className="mt-6 d-flex flex-column align-items-center bg-primary">
          <input
            type="text"
            placeholder="Ingrese el correo del docente"
            value={correoDocente}
            onChange={(e) => setCorreoDocente(e.target.value)}
          />
        </div>
        <button type="submit">Buscar</button>
      </form>

      {formularioEnviado && (
        <>
          {docentesSeleccionado && Array.isArray(docentesSeleccionado) ? (
            <>
              <br /><br />
              <div className="mt-6 d-flex flex-column align-items-center bg-primary ">
                <h3 className="mt-6">Docentes Encontrados</h3>
              </div>
              <br />
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
            </>
          ) : (
            <div className="alert alert-warning" role="alert">
              Docente no encontrado
            </div>
          )}
        </>
      )}
    </>
  );
};
