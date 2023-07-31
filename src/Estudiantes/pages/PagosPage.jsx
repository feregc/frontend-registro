import { useEffect, useState } from "react";

export const PagosPage = () => {
  const num_cuenta = localStorage.getItem("id");

  const [pagos, setPagos] = useState({
    matricula: true,
    reposicion: false,
  });

  const precios = {
    matricula: 270,
    reposicion: 100,
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPagos((prevPagos) => ({
      ...prevPagos,
      [name]: checked,
    }));
  };

  const calcularTotal = () => {
    let total = 270;
    Object.keys(pagos).forEach((pago) => {
      if (pagos[pago]) {
        total += precios[pago];
      }
    });
    return total;
  };

  // Effect para obtener el estado del pago de reposición desde el servidor
  useEffect(() => {
    fetch(`http://localhost:8081/PagoReposicion/${num_cuenta}`)
      .then((response) => response.json())
      .then((data) => {
        setPagos({ reposicion: data.Pago_reposolicitud });
      })
      .catch((error) => {
        console.error(
          "Error al obtener el estado del pago de reposición:",
          error
        );
      });
  }, [num_cuenta]);

  const regresar = () => {
    window.history.back();
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-success mt-4" onClick={regresar}>
          Atras
        </button>
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
                    disabled={true}
                  />
                  Pago de Matrícula - L.{precios.matricula}
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
                    disabled={true}
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
