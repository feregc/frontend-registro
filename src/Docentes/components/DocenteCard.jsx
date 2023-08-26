import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const DocenteCard = ({ docente }) => {
  const navigate = useNavigate();
  const {
    num_empleado,
    nombres,
    apellidos,
    identidad,
    correo,
    nombre_centro,
    carrera,
    cargo,
  } = docente;
  const [message, setMessage] = useState("");
  const [img, setImg] = useState([]);
  // const [docentesSeleccionado, setDocentesSeleccionado] = useState([]);
  // console.log(docente);

  // const imgElement = document.getElementById("img-cont");

  const verificarDocente = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/obtenerImagenes?id_docente=${num_empleado}`
      );
      const jsonData = await response.json();
      // console.log(jsonData);
      // jsonData.forEach((obj) => {
      //   const url = obj.url;
      //   console.log(url);
      //   imgElement.src = url;
      // });

      setImg(jsonData);
    } catch (error) {
      console.error("Error al obtener los datos del docente:", error);
    }
  };

  useEffect(() => {
    verificarDocente();
  }, []);

  console.log(img[0]?.url);
  // verificarDocente();

  const handleResetPassword = () => {
    fetch("http://localhost:8081/forgot-password-docente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        setMessage("Error al enviar la solicitud.");
        console.error(error);
      });

    console.log(`Restablecer contraseña del docente ${nombres} ${apellidos}`);
  };

  const handleVerclases = () => {
    navigate(`/docente/VerNotasDocentePage/${num_empleado}`);
  };
  const handleEvaluacionDoc = () => {
    navigate(`/docente/VerEvaluaciones/${num_empleado}`);
  };

  return (
    <>
      <div className="col">
        <div className="card m-3">
          <div className="card-body">
            {/* <h5 className="card-title">
              Docente: {nombres} {apellidos}
            </h5> */}
            <div className="row">
              <div className="col-4">
                <img
                  id="img-cont"
                  src={img[0]?.url}
                  className="img-size2 img-thumbnail"
                  alt={`Foto de ${nombres} ${apellidos}`}
                />
              </div>
              <div className="col-8 d-flex justify-content-start">
                <div className="row">
                  <div className="row">
                    <div className="col">Nombre: </div>
                    <div className="col">
                      {nombres} {apellidos}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">Número de Empleado: </div>
                    <div className="col">{num_empleado}</div>
                  </div>
                  <div className="row">
                    <div className="col">DNI: </div>
                    <div className="col">{identidad}</div>
                  </div>
                  <div className="row">
                    <div className="col">Correo: </div>
                    <div className="col">{correo}</div>
                  </div>
                  <div className="row">
                    <div className="col">Centro: </div>
                    <div className="col">{nombre_centro}</div>
                  </div>
                  <div className="row">
                    <div className="col">Carrera: </div>
                    <div className="col">{carrera}</div>
                  </div>
                  <div className="row">
                    <div className="col">Cargo: </div>
                    <div className="col">{cargo}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row my-4 d-flex justify-content-end">
              <button
                className="btn btn-primary btn-w mx-2"
                onClick={handleResetPassword}
              >
                Restablecer contraseña
              </button>
              <button
                className="btn btn-primary btn-w mx-2"
                onClick={handleVerclases}
              >
                Ver Clases
              </button>
              <button
                className="btn btn-primary btn-w mx-2"
                onClick={handleEvaluacionDoc}
              >
                Evaluacion Docente
              </button>
            </div>
            {/* {message && <p>{message}</p>} */}

            {message && (
              <div role="alert">
                {(() => {
                  switch (message) {
                    case "Error al enviar la solicitud.":
                      return (
                        <div
                          className="alert alert-danger p-1 mt-2"
                          role="alert"
                        >
                          {message}
                        </div>
                      );
                    default:
                      return (
                        <div
                          className="alert alert-success p-1 mt-2"
                          role="alert"
                        >
                          {message}
                        </div>
                      );
                  }
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
