import { useState } from "react";
import { useLocation } from "react-router-dom";
import { convertirFecha } from "../helpers/convertirFecha";
import { useEffect } from "react";

const num_cuenta = localStorage.getItem("id");

export const Solicitudes = () => {
  const location = useLocation();
  const { tipoSolicitud } = location.state;
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const [opcionSeleccionadaNombre, setOpcionSeleccionadaNombre] = useState("");
  const [opcionSeleccionada2, setOpcionSeleccionada2] = useState("");
  const [opcionSeleccionada3, setOpcionSeleccionada3] = useState("");
  const [justificacion, setDescripcion] = useState("");
  const [imgPerfilEstudiante, setImgPerfilEstudiante] = useState({});
  const [carreras, setCarreras] = useState([]);
  const [centro, setCentro] = useState([]);
  const [data, setData] = useState([]);
  const [clases, setClases] = useState([]);
  const [documento, setDocumento] = useState(null);

  useEffect(() => {
    // Función para obtener los datos del endpoint
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/proceso-anio-periodo"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const fecha = convertirFecha(data[0]?.anio);
      const periodo = data[0]?.periodo;

      const obtenerClases = async () => {
        try {
          const response = await fetch(
            `http://localhost:8081/clases-matriculadas/${num_cuenta}/${fecha}/${periodo}`
          );
          if (!response.ok) {
            throw new Error("Error al obtener las clases");
          }
          const jsonData = await response.json();
          setClases(jsonData);
          console.log(jsonData);
        } catch (error) {
          console.log("Error:", error);
        }
      };

      obtenerClases();
    }
  }, [data, num_cuenta]);

  useEffect(() => {
    const fetchEstudiante = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/estudiante/${num_cuenta}`
        );
        const imgPerfil = await response.json();
        setImgPerfilEstudiante(imgPerfil);

        if (imgPerfil.centro_id) {
          fetchCarreras(imgPerfil.centro_id);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    const fetchCarreras = async (centroId) => {
      try {
        const response = await fetch(
          `http://localhost:8081/carreras/${centroId}`
        );
        const carrerasData = await response.json();
        setCarreras(carrerasData);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    const fetchCentro = async () => {
      try {
        const response = await fetch(`http://localhost:8081/VerCentros`);
        const centrosData = await response.json();
        setCentro(centrosData);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchCarreras();
    fetchEstudiante();
    fetchCentro();
  }, [num_cuenta]);

  const handleOpcionChange = (event) => {
    const opcionSeleccionadaNombre =
      event.target.options[event.target.selectedIndex].text;
    const selectedOptionValue = event.target.value;
    setOpcionSeleccionada(selectedOptionValue);
    setopcionSeleccionadaNombre(opcionSeleccionadaNombre);
  };
  const handleOpcion2Change = (event) => {
    const selectedOption2Text =
      event.target.options[event.target.selectedIndex].text;
    const selectedOption2Value = event.target.value;
    setOpcionSeleccionada2(selectedOption2Value);
    opcionSeleccionadaNombre(selectedOption2Text);
  };
  const handleOpcion3Change = (event) => {
    const selectedOption3Text =
      event.target.options[event.target.selectedIndex].text;
    const selectedOption3Value = event.target.value;
    setOpcionSeleccionada3(selectedOption3Value);
    opcionSeleccionadaNombre(selectedOption3Text);
  };
  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleCrearSolicitud = () => {
    // Convertir cadena vacía a null si no se ha seleccionado ninguna opción

    const idCarrera = opcionSeleccionada2
      ? parseInt(opcionSeleccionada2)
      : null;
    const idCentro = opcionSeleccionada ? parseInt(opcionSeleccionada) : null;
    const idClase = opcionSeleccionada3 ? parseInt(opcionSeleccionada3) : null;

    const formData = new FormData();
    formData.append("tipo_solicitud", tipoSolicitud);
    formData.append("num_cuenta", num_cuenta);
    formData.append(
      "justificacion",
      `${imgPerfilEstudiante.primer_nombre}
       ${imgPerfilEstudiante.segundo_nombre}
        ${imgPerfilEstudiante.primer_apellido} 
        ${imgPerfilEstudiante.segundo_apellido} 
        número de cuenta ${imgPerfilEstudiante.num_cuenta} 
        solicitud de ${tipoSolicitud} por motivo de  
        ${justificacion}`
    );
    formData.append("id_carrera", idCarrera);
    formData.append("id_centro", idCentro);
    formData.append("id_clase", idClase);
    formData.append("Documento", documento || "");

    fetch("http://localhost:8081/Crear_Solicitud", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Solicitud creada:", data);
        alert("Solicitud creada exitosamente");
      })
      .catch((error) => {
        console.error("Error al crear la solicitud:", error);
        alert("Error al crear la solicitud");
      });
    window.history.back();
  };

  const handleCancelar = () => {
    window.history.back();
  };

  const regresar = () => {
    window.history.back();
  };

  const handleDocumentoChange = (event) => {
    setDocumento(event.target.files[0]); // Tomar el primer archivo seleccionado
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-success mt-4" onClick={regresar}>
          Atras
        </button>
        <div className="row">
          <div className="col px-5">
            <div className="d-flex justify-content-center my-3">
              <h3>Solicitud de {tipoSolicitud}</h3>
            </div>
            <br />
            <div className="d-flex align-items-center justify-content-center my-3">
              {tipoSolicitud === "Cambio de Centro" && (
                <>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="row my-1">
                      <div className="col-6">
                        <label htmlFor="opcion">Seleccione un centro:</label>
                      </div>
                      <div className="col-6">
                        <select
                          id="opcion"
                          className="form-control"
                          value={opcionSeleccionada}
                          onChange={handleOpcionChange}
                        >
                          <option value="">-- Centro --</option>
                          {centro.map((centro) => (
                            <option key={centro.id} value={centro.id}>
                              {centro.nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-6 my-3">
                        <label htmlFor="descripcion">Justificación:</label>
                      </div>
                      <div className="col-6 my-3">
                        <textarea
                          id="justificacion"
                          className="form-control "
                          value={justificacion}
                          onChange={handleDescripcionChange}
                        />
                      </div>
                      <div className="col-6 my-3">
                        <label htmlFor="descripcion">PDF Respaldo</label>
                      </div>
                      <div className="col-6 my-3">
                        <input
                          placeholder="Ingrese un PDF"
                          className="rounded-3 form-control"
                          type="file"
                          accept="application/pdf"
                          onChange={handleDocumentoChange}
                        />
                      </div>
                      <div className="col-6 d-flex justify-content-center my-3">
                        <button
                          className="btn btn-success btn-w"
                          onClick={handleCrearSolicitud}
                        >
                          Crear Solicitud
                        </button>
                      </div>
                      <div className="col-6 d-flex justify-content-center my-3">
                        <button
                          className="btn btn-success btn-w"
                          onClick={handleCancelar}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {tipoSolicitud === "Cambio de Carrera" && (
                <>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="row my-1">
                      <div className="col-6 ">
                        <label htmlFor="opcion">
                          Seleccione la carrera a la que desea cambiar
                        </label>
                      </div>
                      <div className="col-6">
                        <select
                          id="opcion2"
                          className="form-control"
                          value={opcionSeleccionada2}
                          onChange={handleOpcion2Change}
                        >
                          <option value="">-- Carreras --</option>
                          {carreras.map((carreras) => (
                            <option key={carreras.id} value={carreras.id}>
                              {carreras.nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-6 my-3">
                        <label htmlFor="descripcion">Justificación:</label>
                      </div>
                      <div className="col-6 my-3">
                        <textarea
                          id="justificacion"
                          className="form-control "
                          value={justificacion}
                          onChange={handleDescripcionChange}
                        />
                      </div>
                      <div className="col-6 my-3">
                        <label htmlFor="descripcion">PDF Respaldo</label>
                      </div>
                      <div className="col-6 my-3">
                        <input
                          placeholder="Ingrese un PDF"
                          className="rounded-3 form-control"
                          type="file"
                          accept="application/pdf"
                          onChange={handleDocumentoChange}
                        />
                      </div>
                      <div className="col-6 d-flex justify-content-center my-3">
                        <button
                          className="btn btn-success btn-w"
                          onClick={handleCrearSolicitud}
                        >
                          Crear Solicitud
                        </button>
                      </div>
                      <div className="col-6 d-flex justify-content-center my-3">
                        <button
                          className="btn btn-success btn-w"
                          onClick={handleCancelar}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {tipoSolicitud === "Pago Reposición" && (
                <>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="row my-1">
                      <div className="col-6 my-3">
                        <label htmlFor="descripcion">Justificación:</label>
                      </div>
                      <div className="col-6 my-3">
                        <textarea
                          id="justificacion"
                          className="form-control "
                          value={justificacion}
                          onChange={handleDescripcionChange}
                        />
                      </div>
                      <div className="col-6 my-3">
                        <label htmlFor="descripcion">PDF Respaldo</label>
                      </div>
                      <div className="col-6 my-3">
                        <input
                          placeholder="Ingrese un PDF"
                          className="rounded-3 form-control "
                          type="file"
                          accept="application/pdf"
                          onChange={handleDocumentoChange}
                        />
                      </div>

                      <div className="col-6 d-flex justify-content-center my-3">
                        <button
                          className="btn btn-success btn-w"
                          onClick={handleCrearSolicitud}
                        >
                          Crear Solicitud
                        </button>
                      </div>
                      <div className="col-6 d-flex justify-content-center my-3">
                        <button
                          className="btn btn-success btn-w"
                          onClick={handleCancelar}
                        >
                          Cancelar
                        </button>
                      </div>
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
                        id="opcion2"
                        className="form-control"
                        value={opcionSeleccionada3}
                        onChange={handleOpcion3Change}
                      >
                        <option value="">-- clases --</option>
                        {clases.map((clases) => (
                          <option key={clases.id} value={clases.id_clase}>
                            {clases.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-6 my-3">
                      <label htmlFor="descripcion">Justificación:</label>
                    </div>
                    <div className="col-6 my-3">
                      <textarea
                        id="justificacion"
                        className="form-control "
                        value={justificacion}
                        onChange={handleDescripcionChange}
                      />
                    </div>
                    <div className="col-6 my-3">
                      <label htmlFor="descripcion">PDF Respaldo</label>
                    </div>
                    <div className="col-6 my-3">
                      <input
                        placeholder="Ingrese un PDF"
                        className="rounded-3 form-control"
                        type="file"
                        accept="application/pdf"
                        onChange={handleDocumentoChange}
                      />
                    </div>

                    <div className="col-6 d-flex justify-content-center my-3">
                      <button
                        className="btn btn-success btn-w"
                        onClick={handleCrearSolicitud}
                      >
                        Crear Solicitud
                      </button>
                    </div>
                    <div className="col-6 d-flex justify-content-center my-3">
                      <button
                        className="btn btn-success btn-w"
                        onClick={handleCancelar}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
