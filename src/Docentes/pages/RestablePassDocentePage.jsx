import { useState } from "react";
import "../../Assets/styles/styles-forms/Forms-styles.css";
// import { Link } from 'react-router-dom';

export const RestablePassDocentePage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Obtener el token y la marca de tiempo
    const token = window.location.pathname.substring(14); // Suponiendo que la URL tiene el formato '/reset-password/{token}'
    const expiration = new URLSearchParams(window.location.search).get(
      "expires"
    );
    const email = new URLSearchParams(window.location.search).get("email");

    // Validar que la contraseña y su confirmación coincidan
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    // Verificar si el enlace ha expirado
    if (Date.now() > parseInt(expiration, 10)) {
      setMessage(
        "El enlace ha expirado. Por favor, solicita un nuevo enlace de recuperación de contraseña."
      );
      return;
    }

    setSubmitButtonDisabled(true);

    //   console.log('Restableciendo contraseña con exito');
    //   Enviar la solicitud al backend para restablecer la contraseña
    fetch("http://localhost:8081/reset-password-docente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        setMessage("Error al restablecer la contraseña.");
        console.error(error);
      })
      .finally(() => {
        // Habilitar el botón después de recibir la respuesta del backend
        setSubmitButtonDisabled(false);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-primary ">
        <div className="form">
          <br />
          <br />
          <h1>Restablecer contraseña de docente</h1>
          <br />
          <div className="d-flex flex-wrap">
            <form onSubmit={handleSubmit}>
              <label htmlFor="password">Nueva contraseña:</label>
              <input
                type="password"
                id="password"
                className="rounded-3 form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <label className="mt-3" htmlFor="confirmPassword">
                Confirmar contraseña:
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="rounded-3 form-control "
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
              <button
                type="submit"
                className="btn btn-success form-control mt-3"
                disabled={
                  message === "Contraseña restablecida exitosamente." ||
                  message ===
                    "El enlace ha expirado. Por favor, solicita un nuevo enlace de recuperación de contraseña." ||
                  submitButtonDisabled
                }
              >
                Restablecer contraseña
              </button>
            </form>
          </div>
          {message && (
            <div role="alert">
              {(() => {
                switch (message) {
                  case "Las contraseñas no coinciden.":
                    return (
                      <div className="alert alert-danger p-1 mt-2" role="alert">
                        {message}
                      </div>
                    );
                  case "El enlace ha expirado. Por favor, solicita un nuevo enlace de recuperación de contraseña.":
                    return (
                      <>
                        <div
                          className="alert alert-warning p-1 mt-2"
                          role="alert"
                        >
                          {message}
                        </div>
                        {/* <Link to="/recuperacion/estudiante">
                                                <button>Solicitar enlace</button>
                                            </Link> */}
                      </>
                    );
                  case "Error al restablecer la contraseña.":
                    return (
                      <div className="alert alert-danger p-1 mt-2" role="alert">
                        {message}
                      </div>
                    );
                  default:
                    return (
                      <>
                        <div
                          className="alert alert-success p-1 mt-2"
                          role="alert"
                        >
                          {message}
                        </div>
                        {/* <Link to="/log/estudiante">
                                                <button>Iniciar Sesión</button>
                                            </Link> */}
                      </>
                    );
                }
              })()}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
