import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const DocenteCard = ({ docente }) => {
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
  const [imagen, setImagen] = useState([]);

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

  useEffect(() => {
    const image = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/obtenerImagenes?id_docente=${num_empleado}`
        );
        const jsonData = await response.json();
        setImagen(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    image();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-center">
              <div className="card m-3 w-75">
                <div className="card-body">
                  <h5 className="card-title">
                    <div className="d-flex justify-content-center">
                      <br />
                      Docente: {nombres} {apellidos}
                    </div>
                  </h5>
                  <br />
                  <div className="row">
                    <div className="col-4 d-flex justify-content-center">
                      {imagen && imagen.length > 0 ? (
                        <div className="">
                          <img
                            src={imagen[0].url}
                            className="img-size5  img-thumbnail"
                            alt="..."
                          />
                        </div>
                      ) : (
                        <FontAwesomeIcon
                          className="img-size5 img-thumbnail"
                          style={{ color: "#006494" }}
                          icon={faUser}
                        />
                      )}
                    </div>
                    <div className="col-8 d-flex justify-content-start">
                      <p className="card-text">
                        Número de empleado: {num_empleado}
                        <br />
                        Identidad: {identidad}
                        <br />
                        Correo: {correo}
                        <br />
                        Centro: {nombre_centro}
                        <br />
                        Centro: {carrera}
                        <br />
                        Cargo: {cargo}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-w btn-primary"
                      onClick={handleResetPassword}
                    >
                      Restablecer contraseña
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
          </div>
        </div>
      </div>
    </>
  );
};
