import { useState } from "react";
import { useLocation } from "react-router-dom";

import { useEffect } from "react";
const num_cuenta = localStorage.getItem("id");

export const Solicitudes = () => {
  const location = useLocation();
  const { tipoSolicitud } = location.state;
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const [opcionSeleccionadaNombre, setOpcionSeleccionadaNombre] = useState('');
  const [opcionSeleccionada2, setOpcionSeleccionada2] = useState("");
  const [justificacion, setDescripcion] = useState("");
  const [imgPerfilEstudiante, setImgPerfilEstudiante] = useState({});
  const [carreras, setCarreras] = useState([]);
  const [centro, setCentro] = useState([]);
  useEffect(() => {
    const fetchEstudiante = async () => {
      try {
        const response = await fetch(`http://localhost:8081/estudiante/${num_cuenta}`);
        const imgPerfil = await response.json();
        setImgPerfilEstudiante(imgPerfil);
        console.log(imgPerfil.centro_id);
        if (imgPerfil.centro_id) {
          fetchCarreras(imgPerfil.centro_id);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
  
    const fetchCarreras = async (centroId) => {
      try {
        const response = await fetch(`http://localhost:8081/carreras/${centroId}`);
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
  
    fetchEstudiante();
    fetchCentro();
    fetchCarreras();
  }, [num_cuenta]);
 
  const handleOpcionChange = (event) => {
    const opcionSeleccionadaNombre = event.target.options[event.target.selectedIndex].text;
    const selectedOptionValue = event.target.value;
    setOpcionSeleccionada(selectedOptionValue);
  setopcionSeleccionadaNombre(opcionSeleccionadaNombre);
    
  };
  const handleOpcion2Change = (event) => {
    const selectedOption2Text = event.target.options[event.target.selectedIndex].text;
    const selectedOption2Value = event.target.value;
    setOpcionSeleccionada2(selectedOption2Value);
    setopcionSeleccionadaNombre(selectedOption2Text);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleCrearSolicitud = () => {
    // Convertir cadena vacía a null si no se ha seleccionado ninguna opción
    const idCarrera = opcionSeleccionada2 !== "" ? opcionSeleccionada2 : null;
    const idCentro = opcionSeleccionada !== "" ? opcionSeleccionada : null;
  
    const nuevaSolicitud = {
      tipo_solicitud: tipoSolicitud,
      num_cuenta: num_cuenta,
      justificacion: 
       imgPerfilEstudiante.primer_nombre + " " + 
       imgPerfilEstudiante.segundo_nombre + " " + 
       imgPerfilEstudiante.primer_apellido + " " + 
       imgPerfilEstudiante.segundo_apellido + " " + " numero de cuenta " + " " + 
       imgPerfilEstudiante.num_cuenta + "  solicitud de " +
        tipoSolicitud + " razon " + 
        justificacion,
      id_carrera: idCarrera,
      id_centro: idCentro,
      // id_clase: ;
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

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col px-5">
            <br />
            <br />
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

              {/* {tipoSolicitud === "Cancelación Excepcional" && (
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
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
