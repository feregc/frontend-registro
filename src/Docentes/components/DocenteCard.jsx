import React, { useState } from "react";

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

  return (
    <>
      <div className="col-6">
        <div className="card m-3">
          <div className="card-body">
            <h5 className="card-title">
              Docente: {nombres} {apellidos}
            </h5>
            {/* <img src={foto} alt={`Foto de ${nombres} ${apellidos}`} /> */}
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
            <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleResetPassword}>
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
    </>
  );
};
