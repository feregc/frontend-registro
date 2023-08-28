import { useState, useEffect } from "react";
// import { validation } from "./LoginValidation"
import axios from "axios";
import { validacionRegisto } from "../helpers/ValidacionRegistro";
import "../../Assets/styles/styles-forms/Forms-styles.css";
import "../../Assets/styles/styles-admin/Admin-registro-docentes.css";
import { useFormDocente } from "../helpers/useFormDocente";

export const RegistroDocete = () => {
  const initialData = {
    nombres: "",
    apellidos: "",
    identidad: "",
    email: "",
    password: "",
    password2: "",
    centro: "",
    carrera: ""
  };

  const onValidation = (formState) => {
    let isError = false;
    let errors = {};
    const regexEmail = /^[a-zA-Z0-9.]+@unah\.edu\.hn$/;
    const regexIdentidad = /^\d{4}-\d{4}-\d{5}$/;

    if (!formState.nombres.trim()) {
      errors.nombres = 'El campo "Nombres" no debe estar vacío.';
      isError = true;
    }

    if (!formState.apellidos.trim()) {
      errors.apellidos = 'El campo "Apellidos" no debe estar vacío.';
      isError = true;
    }

    if (!formState.identidad.trim()) {
      errors.identidad = 'El campo "Identidad" no debe estar vacío.';
      isError = true;
    } else if (!regexIdentidad.test(formState.identidad)) {
      errors.identidad = 'El campo "Identidad" no cumple el formato.';
      isError = true;
    }

    if (!formState.email.trim()) {
      errors.email = 'El campo "Correo Electrónico" no debe estar vacío.';
      isError = true;
    } else if (!regexEmail.test(formState.email)) {
      errors.email = "Correo Electrónico no es válido.";
      isError = true;
    }

    if (!formState.password.trim()) {
      errors.password = 'El campo "Contraseña" no debe estar vacío.';
      isError = true;
    }

    if (!formState.password2.trim()) {
      errors.password2 = 'El campo "Contraseña" no debe estar vacío.';
      isError = true;
    }

    if (formState.password.trim() !== formState.password2.trim()) {
      errors.password = "Las contraseñas no coinciden.";
      errors.password2 = "Las contraseñas no coinciden.";
      isError = true;
    }

    return isError ? errors : null;
  };

  const {
    formState,
    errors,
    loading,
    handleChange,
    handleSubmit,
    onResetForm,
  } = useFormDocente(initialData, onValidation);

  const regresar = () => {
    window.history.back();
  };


  const [carreras, setCarreras] = useState(null);

  useEffect(() => {
    const fetchCarrera = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/carreras/${formState.centro}`
        );
        const jsonData = await response.json();
        setCarreras(jsonData);
        console.log(jsonData)
        // setCargaDeCarreras(false);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchCarrera();
  }, [formState.centro]);

  // console.log(formState)

  return (
    <>
      <div className="container">
        <button className="btn btn-success my-4" onClick={regresar}>
          Atrás
        </button>
        <div className="rowd-flex justify-content-center align-items-center">
          <div className="form">
            <br />
            <h2>Registro de Docentes</h2>
            <br />
            <form onSubmit={handleSubmit}>
              <div className="container">
                <div className="row mb-3">
                  <div className="col ps-0 pe-1">
                    <label htmlFor="nombres">
                      <strong>Nombres</strong>
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Juan José"
                      className="rounded-3 form-control"
                      value={formState.nombres}
                      name="nombres"
                      onChange={handleChange}
                    />
                    {errors.nombres && (
                      <div className="alert alert-danger p-1" role="alert">
                        {errors.nombres}
                      </div>
                    )}
                  </div>
                  <div className="col ps-1 pe-0">
                    <label htmlFor="apellidos">
                      <strong>Apellidos</strong>
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Perez Gonzalez"
                      className="rounded-3 form-control"
                      value={formState.apellidos}
                      name="apellidos"
                      onChange={handleChange}
                    />
                    {errors.apellidos && (
                      <div className="alert alert-danger p-1" role="alert">
                        {errors.apellidos}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="identidad">
                  <strong>Número de Identidad</strong>
                </label>
                <input
                  type="text"
                  placeholder="Ej. 0801-1999-23112"
                  className="rounded-3 form-control"
                  value={formState.identidad}
                  name="identidad"
                  onChange={handleChange}
                />
                {errors.identidad && (
                  <div className="alert alert-danger p-1" role="alert">
                    {errors.identidad}
                  </div>
                )}
              </div>
              {/* <div className="d-flex flex-wrap"> */}
              <div className="mb-3">
                <label htmlFor="email">
                  <strong>Correo Electrónico</strong>
                </label>
                <input
                  type="email"
                  placeholder="ejemplo@unah.edu.hn"
                  className="rounded-3 form-control"
                  value={formState.email}
                  name="email"
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="alert alert-danger p-1" role="alert">
                    {errors.email}
                  </div>
                )}{" "}
              </div>
              <div className="mb-3">
                <label htmlFor="password">
                  <strong>Contraseña</strong>
                </label>
                <input
                  type="password"
                  placeholder="Ingrese su contraseña"
                  className="rounded-3 form-control"
                  value={formState.password}
                  name="password"
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="alert alert-danger p-1" role="alert">
                    {errors.password}
                  </div>
                )}
                <div className="mt-3 mb-3">
                  <label htmlFor="password">
                    <strong>Ingrese nuevamente la contraseña</strong>
                  </label>
                  <input
                    type="password"
                    placeholder="Ingrese su contraseña"
                    className="rounded-3 form-control"
                    value={formState.password2}
                    name="password2"
                    onChange={handleChange}
                  />
                  {errors.password2 && (
                    <div className="alert alert-danger p-1" role="alert">
                      {errors.password2}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="centro">
                  <strong>Asignar Centro</strong>
                </label>
                <select
                  value={formState.centro}
                  name="centro"
                  onChange={handleChange}
                  className="form-control2"
                >
                  <option value="x">Seleciona un centro</option>
                  <option value="1">CU</option>
                  <option value="2">UNAH-VS</option>
                  <option value="3">UNAH-CURC</option>
                  <option value="4">UNAH-CURLA</option>
                  <option value="5">UNAH-CURLP</option>
                  <option value="6">UNAH-CUROC</option>
                  <option value="7">UNAH-CURNO</option>
                  <option value="8">UNAH-TEC Danli</option>
                  <option value="9">UNAH-TEC AGUÁN</option>
                </select>
              </div>

              <div>
                <label htmlFor="carrera">
                  <strong>Asignar Carrera</strong>
                </label>
                <select
                  value={formState.carrera}
                  name="carrera"
                  className="form-control2"
                  onChange={handleChange}
                >
                  <option value="">Seleccione una carrera</option>
                  {carreras?.map((carrera, index) => (
                    <option key={index} value={carrera.id}>
                      {carrera.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="my-3 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success btn-w form-control"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};