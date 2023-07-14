import { useState } from "react";
import { useLocation } from "react-router-dom";

export const Solicitudes = () => {
  const location = useLocation();
  const { tipoSolicitud } = location.state;
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const [justificacion, setDescripcion] = useState("");
  const num_cuenta = localStorage.getItem("id");

  const handleOpcionChange = (event) => {
    setOpcionSeleccionada(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleCrearSolicitud = () => {
    const nuevaSolicitud = {
      tipo_solicitud: tipoSolicitud,
      num_cuenta: num_cuenta,
      justificacion: justificacion,
    };

    fetch("http://localhost:8081/Crear_Solicitud", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaSolicitud),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Solicitud creada:", data);
      })
      .catch((error) => {
        console.error("Error al crear la solicitud:", error);
      });
  };

  const handleCancelar = () => {};

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <br />
            <br />
            <div className="d-flex justify-content-center my-3">
              <h3>Solicitud de {tipoSolicitud}</h3>
            </div>
            <br />
            <br />
            <div>
              {tipoSolicitud === "Cambio de Centro" && (
                <>
                  <div className="row my-2">
                    <div className="col-6">
                      <label htmlFor="opcion">Seleccione un centro:</label>
                    </div>
                    <div className="col-6">
                      <select
                        id="opcion"
                        className="form-control f-w"
                        value={opcionSeleccionada}
                        onChange={handleOpcionChange}
                      >
                        <option value="UNAH-CU">
                          UNAH - Ciudad Universitaria
                        </option>
                        <option value="UNAH-VS">UNAH - Valle de Sula</option>
                        <option value="UNAH-CURC">UNAH-CURC</option>
                        <option value="UNAH-CURLA">UNAH-CURLA</option>
                        <option value="UNAH-CURLP">UNAH-CURLP</option>
                        <option value="UNAH-CUROC">UNAH-CUROC</option>
                        <option value="UNAH-CURNO">UNAH-CURNO</option>
                        <option value="UNAH-TEC Danli">UNAH-TEC Danli</option>
                        <option value="UNAH-TEC AGUÁN">UNAH-TEC AGUÁN</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {tipoSolicitud === "Cambio de Carrera" && (
                <>
                  <div className="row my-2">
                    <div className="col-6">
                      <label htmlFor="opcion">
                        Seleccione la carrera a la que desea cambiar
                      </label>
                    </div>
                    <div className="col-6">
                      <select
                        id="opcion"
                        className="form-control f-w"
                        value={opcionSeleccionada}
                        onChange={handleOpcionChange}
                      >
                        <option value="">-- Carreras --</option>
                        <option value="opcion1">Opción 1</option>
                        <option value="opcion2">Opción 2</option>
                        <option value="opcion3">Opción 3</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
              {tipoSolicitud === "Cancelación Excepcional" && (
                <>
                  <div className="row my-2">
                    <div className="col-6">
                      <label htmlFor="opcion">
                        Seleccione la clase para la que desea hacer la solicitud{" "}
                      </label>
                    </div>
                    <div className="col-6">
                      <select
                        id="opcion"
                        className="form-control f-w"
                        value={opcionSeleccionada}
                        onChange={handleOpcionChange}
                      >
                        <option value="">-- Clases --</option>
                        <option value="opcion1">Opción 1</option>
                        <option value="opcion2">Opción 2</option>
                        <option value="opcion3">Opción 3</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
              {tipoSolicitud === "Pago Reposicion" && <></>}
              <div className="row">
                <div className="col-3">
                  <label htmlFor="descripcion">Justificación:</label>
                </div>
                <div className="col-9">
                  <textarea
                    id="justificacion"
                    className="form-control"
                    value={justificacion}
                    onChange={handleDescripcionChange}
                  />
                </div>
                <div className="row d-flex justify-content-center my-3">
                  <button
                      className="btn btn-success btn-w"
                      onClick={handleCrearSolicitud}
                    >
                      Crear Solicitud
                    </button>
                  {/* <div className="col-6">
                    <button
                      className="btn btn-success btn-w"
                      onClick={handleCancelar}
                    >
                      Cancelar
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
