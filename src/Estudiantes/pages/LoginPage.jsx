import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import { AuthContext } from "../chat/auth/AuthContext";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberme: false,
  });

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setForm((form) => ({
        ...form,
        email,
        rememberme: true,
      }));
    }
  }, []);

    //solo para cambiar los imput
  const onChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const toggleCheck = () => {
    console.log("??");
    setForm({
      ...form,
      rememberme: !form.rememberme,
    });
  };

    //Aqui ejecuta el inicio de sesion en el sockets
  const onSubmit = async (ev) => {
    ev.preventDefault();

    form.rememberme
      ? localStorage.setItem("email", form.email)
      : localStorage.removeItem("email");

    const { email, password } = form;
    const ok = await login(email, password);

    if (!ok) {
      Swal.fire("Error", "Verifique el usuario y contraseña", "error");
    }
  };

    //Esto solo verifica que este lleno los campos
  const todoOk = () => {
    return form.email.length > 0 && form.password.length > 0 ? true : false;
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <form
        className="form d-flex justify-content-center align-items-center"
        onSubmit={onSubmit}
      >
        <h1 className="my-4">Chat - Ingreso</h1>

        <input
          className="form-control my-3 w-25 btn-h"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
        />
        <input
          className="form-control my-3 w-25 btn-h"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
        />
        <div className="form-check" onClick={() => toggleCheck()}>
          <input
            className="form-check-input"
            id="ckb1"
            type="checkbox"
            name="rememberme"
            checked={form.rememberme}
            readOnly
          />
          <label className="mx-2"> Recordarme</label>
        </div>

        <div className="mt-5">
          <button
            type="submit"
            className="btn btn-success btn-w btn-h"
            disabled={!todoOk()}
          >
            Ingresar
          </button>
        </div>
      </form>
    </>
  );
};
