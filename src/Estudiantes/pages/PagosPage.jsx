import "../../Assets/styles/styles-landing/Landin-styles.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export const PagosPage = () => {
  const [pagos, setPagos] = useState({
    matricula: false,
    laboratorio: false,
    reposicion: false,
  });

  const precios = {
    matricula: 270,
    laboratorio: 150,
    reposicion: 100,
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPagos((prevPagos) => ({ ...prevPagos, [name]: checked }));
  };

  const calcularTotal = () => {
    let total = 0;
    Object.keys(pagos).forEach((pago) => {
      if (pagos[pago]) {
        total += precios[pago];
      }
    });
    return total;
  };

  const deshabilitarCheckbox = (opcion) => {};

  return (
    <>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="col my-3">
              <h3>Estado de cuenta</h3>
              <div className="form-check my-3">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="matricula"
                    checked={pagos.matricula}
                    onChange={handleCheckboxChange}
                    disabled={precios.matricula}
                  />
                  Pago de Matrícula - L.{precios.matricula}
                </label>
              </div>
              <div className="form-check my-3">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="laboratorio"
                    checked={pagos.laboratorio}
                    onChange={handleCheckboxChange}
                    disabled={precios.laboratorio}
                  />
                  Pago de Laboratorio - L.{precios.laboratorio}
                </label>
              </div>
              <div className="form-check my-3">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="reposicion"
                    checked={pagos.reposicion}
                    onChange={handleCheckboxChange}
                    disabled={!pagos.reposicion}
                  />
                  Pago de Reposición - L.{precios.reposicion}
                </label>
              </div>
              <br />
              <br />
              <h4>Total: L.{calcularTotal()}</h4>
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
};
