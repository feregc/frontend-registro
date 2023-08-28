import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { validacionRegisto } from "../../Administardor/helpers/ValidacionRegistro";
import "../../Assets/styles/styles-forms/Forms-styles.css";
import "../../Assets/styles/styles-landing/Footer-styles.css";
import { AuthContext } from "../chat/auth/AuthContext";

export const LoginEstudiante = () => {
  const navigate = useNavigate();
  const { login: loginToSocketBackend } = useContext(AuthContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
    rememberme: false,
  });

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setValues((form) => ({
        ...form,
        email,
        rememberme: true,
      }));
    }
  }, []);

  const toggleCheck = () => {
    console.log("??");
    setForm({
      ...form,
      rememberme: !form.rememberme,
    });
  };

  // const [error, setError] = useState({});

  const handleSubmit = async (event) => { // Agrega la palabra clave async aquí
    event.preventDefault();
    // setError(validacionRegisto(values));
    const { email, password } = values;
    try {
      const res = await axios.post("http://localhost:8081/login/estudiante", { email, password });
      const { login, usuario, token } = res.data;

      if (login) {
        localStorage.setItem("token", token);
        localStorage.setItem("login", login);
        localStorage.setItem("id", usuario[0].num_cuenta);
        console.log({ login, usuario, token });
        alert("Inicio de Sesión Exitoso");

        // Aquí se asume que `login` es una función asincrónica del otro componente
        await loginToSocketBackend(email, password); // Esperar a la función login
        console.log('Socketssss');
        navigate("/estudiante/home");
      } else {
        console.log({ login, usuario });
        alert("Correo o Contraseña no válido, por favor verifique los datos.");
      }
    } catch (err) {
      alert("Correo o Contraseña no válido, por favor verifique los datos.");
    }
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
          <h2>Inicio Sesión como Estudiante</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Correo Electrónico</strong>
              </label>
              <input
                type="email"
                placeholder="ejemplo@unah.hn"
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
            <Link
              className="d-flex justify-content-end mb-3"
              to="/recuperacion/estudiante"
            >
              Olvidaste tu contraseña?
            </Link>
            <p>
              Recuerda que como estudiante <br /> tu correo termina en @unah.hn
            </p>
            <button type="submit" className="btn btn-success form-control">
              Iniciar Sesión
            </button>
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
