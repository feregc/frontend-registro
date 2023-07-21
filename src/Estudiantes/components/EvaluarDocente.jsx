import { preguntas } from "../helpers/api";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const EvaluarDocente = () => {
  const [respuestas, setRespuestas] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const num_cuenta = localStorage.getItem("id");
  const { data } = location.state;
  // Datos de clase y docente
 
  // ---------------------

  const handleOpciones = (index, value) => {
    setRespuestas((prevRespuestas) => {
      const updatedRespuestas = [...prevRespuestas];
      updatedRespuestas[index] = value;
      return updatedRespuestas;
    });
  };

  const handleTextArea = (event) => {
    const { value } = event.target;
    setRespuestas((prevRespuestas) => {
      const updatedRespuestas = [...prevRespuestas];
      updatedRespuestas[preguntas.length] = value;
      return updatedRespuestas;
    });
  };

  const validarFormulario = (data) => {
    const opcionesValidas = ["Bueno", "Muy bueno", "Excelente"];

    for (const clave in data) {
      if (
        [
          "comentarioI",
          "comentarioII",
          "comentarioIII",
          "comentarioIIII",
          "comentarioIIIII",
        ].includes(clave)
      ) {
        const valor = data[clave];
        if (!opcionesValidas.includes(valor)) {
          return false;
        }
      }
    }

    if (
      typeof data.comentarioIIIIII !== "string" ||
      data.comentarioIIIIII.length <= 1 ||
      data.comentarioIIIIII === undefined
    ) {
      return false;
    }
    return true;
  };

  const enviarRespuesta = () => {
    const respuestaData = {
      id_seccion: data.id_seccion,
      num_empleado: data.num_empleado,
      num_cuenta: num_cuenta,
      comentarioI: `${respuestas[0]}`,
      comentarioII: `${respuestas[1]}`,
      comentarioIII: `${respuestas[2]}`,
      comentarioIIII: `${respuestas[3]}`,
      comentarioIIIII: `${respuestas[4]}`,
      comentarioIIIIII: `${respuestas[5]}`,
    };
    if (validarFormulario(respuestaData)) {
     
      fetch("http://localhost:8081/comentarios-insertar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(respuestaData),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Respuestas enviadas con éxito");
          } else {
            console.log("Error al enviar las respuestas");
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });

      navigate("../ver-calificaciones");
    } else {
      console.log("Completar todas las opciones del formulario");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="row my-4">
              <div className="d-flex justify-content-center">
                <h3>Calificar Docentes</h3>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Preguntas</th>
                  <th scope="col">Opción</th>
                </tr>
              </thead>
              <tbody>
                {preguntas.map((dato, index) => (
                  <tr key={index}>
                    <th scope="row">{dato.pregunta}</th>
                    <th scope="row">
                      <select
                      className="form-control"
                        value={respuestas[index]}
                        onChange={(event) =>
                          handleOpciones(index, event.target.value)
                        }
                      >
                        <option value="null">Seleccionar opción</option>
                        <option value="Bueno">Bueno</option>
                        <option value="Muy bueno">Muy bueno</option>
                        <option value="Excelente">Excelente</option>
                      </select>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="col my-4">
              <div className="d-flex justify-content-center">
                <p>
                  Lista aspectos en los que consideras que puede mejorar el
                  docente
                </p>
              </div>
              <textarea
                className="w-100"
                value={respuestas[preguntas.length] || ""}
                onChange={handleTextArea}
              ></textarea>
            </div>
            <div className="row my-2">
              <div className="d-flex justify-content-center">
                <button className="btn btn-success btn-w form-control" onClick={enviarRespuesta}>Enviar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
