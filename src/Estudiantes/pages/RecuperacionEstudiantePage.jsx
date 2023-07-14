import React, { useState } from "react";

export const RecuperacionEstudiantePage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendLink, setSendLink] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSendLink(true);
    fetch("http://localhost:8081/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        setMessage("Error al enviar la solicitud.");
        console.error(error);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-primary ">
        <div className="form">
          <br />
          <br />
          <br />
          <br />
          <h2>Recuperación de contraseña</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">Correo electrónico:</label>
              <input
                className="rounded-3 form-control"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-success form-control"
              disabled={sendLink}
            >
              {" "}
              Enviar
            </button>
          </form>
          <br />
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
};
