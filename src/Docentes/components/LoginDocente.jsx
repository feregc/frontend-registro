import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { validacionRegisto } from "../../Administardor/helpers/ValidacionRegistro";
import "../../Assets/styles/styles-forms/Forms-styles.css";
import "../../Assets/styles/styles-docentes/Docente-home.css";

export const LoginDocente = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // const [error, setError] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    // setError(validacionRegisto(values));
    const { email, password } = values;
    axios
      .post("http://localhost:8081/login/docente", { email, password })
      .then((res) => {
        const { login, usuario, token } = res.data;
        console.log(usuario[0].cargo);
        if (login) {
          localStorage.setItem("token", token);
          localStorage.setItem("login", login);
          localStorage.setItem("cargo", usuario[0].cargo);
          localStorage.setItem("id", usuario[0].num_empleado);
          // console.log( usuario[0].num_empleado);
          console.log({ login, usuario, token });
          alert("Inicio sesion exitoso");
          navigate("/docente/home");
        } else {
          console.log({ login, usuario });
          alert("El usuario no existe");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-primary ">
        <div className="form">
          <br />
          <br />
          <br />
          <br />
          <h2>Inicio Sesión del Docente</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Correo Electrónico</strong>
              </label>
              <input
                type="email"
                placeholder="ejemplo@unah.edu.hn"
                className="rounded-3 form-control"
                name="email"
                onChange={handleInput}
              />
              {/* {error.email && (
                <span className="text-danger">{error.email}</span>
              )} */}
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Contraseña</strong>
              </label>
              <input
                type="password"
                placeholder="Ingrese su contraseña"
                className="rounded-3 form-control"
                name="password"
                onChange={handleInput}
              />
              {/* {error.password && (
                <span className="text-danger">{error.password}</span>
              )} */}
            </div>
            <p>
              Recuerda que si eres docente o administrador <br /> tu correo
              termina en @unah.edu.hn
            </p>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-w btn-success form-control"
              >
                Iniciar Sesión
              </button>
            </div>
            <br />
            <br />
            <p>
              Al hacer click estas aceptando nuestros términos y condiciones
            </p>
          </form>
        </div>
      </div>
      <div className="footer z-n1 position-absolute bottom-0 start-50 translate-middle-x">
        <img src="../src/Assets/img/footer-bg.png" alt="" />
      </div>
    </>
  );
};
