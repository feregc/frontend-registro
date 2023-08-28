import { preguntas } from "../helpers/api";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const EvaluarDocente = () => {
  const [respuestas, setRespuestas] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [dataGenral, setDataGeneral] = useState([]);
  const num_cuenta = localStorage.getItem("id");

  const { data } = location.state;

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

  // const validarFormulario = (data) => {
  //   const opcionesValidas = ["Bueno", "Muy bueno", "Excelente"];

  //   for (const clave in data) {
  //     if (
  //       [
  //         "comentarioI",
  //         "comentarioII",
  //         "comentarioIII",
  //         "comentarioIIII",
  //         "comentarioIIIII",
  //       ].includes(clave)
  //     ) {
  //       const valor = data[clave];

  //       if (!opcionesValidas.includes(valor) && (
  //         typeof(data.comentarioIIIIII) !== "string" ||
  //         data.comentarioIIIIII.length < 0 ||
  //         data.comentarioIIIIII === undefined)) {
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // };

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
          console.log(
            !opcionesValidas.includes(valor),
            "Las opciones estan bien"
          );
          return false;
        }
      }
    }

    const comentarioIIIIII = data["comentarioIIIIII"];

    if (
      typeof comentarioIIIIII !== "string" ||
      comentarioIIIIII.trim() === ""
    ) {
      console.log("No es un string");
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

    // validarFormulario(respuestaData)
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

  const regresar = () => {
    navigate("../ver-calificaciones");
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-success mt-4" onClick={regresar}>
          Atrás
        </button>
        <div className="row">
          <div className="col">
            <div className="row my-4">
              <br />

              <div className="d-flex justify-content-center">
                <h3>Calificar Docente</h3>
              </div>
            </div>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    Preguntas
                  </th>
                  <th scope="col" className="text-center">
                    Opción
                  </th>
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
                        <option value="null">Opciones</option>
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
                className="w-100 rounded-3 p-3"
                placeholder="Escribe aquí los que consideras que puede mejorar el docente"
                onChange={handleTextArea}
              ></textarea>
            </div>
            <div className="row my-2">
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-success btn-w form-control"
                  onClick={enviarRespuesta}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
