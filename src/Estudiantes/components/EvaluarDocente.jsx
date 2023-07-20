
import { preguntas } from "../helpers/api";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const EvaluarDocente = () => {

  const [respuestas, setRespuestas] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [dataGenral, setDataGeneral] = useState([]);
  const num_cuenta = localStorage.getItem("id");

  // Datos de clase y docente
  useEffect(() => {
    if (location.state) {
      const { data } = location.state;
      setDataGeneral(data)
    }
  }, []);
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
      if (["comentarioI", "comentarioII", "comentarioIII", "comentarioIIII", "comentarioIIIII"].includes(clave)) {
        const valor = data[clave];
        if (!opcionesValidas.includes(valor)) {
          return false;
        }
      } 
    }

    if (typeof(data.comentarioIIIIII) !== "string" ||
    data.comentarioIIIIII.length <= 1 ||
    data.comentarioIIIIII === undefined) {
      return false;
    }
    return true;
  }

  const enviarRespuesta = () => {
    const respuestaData = {
      "id_seccion": dataGenral[0].id_seccion,
      "num_empleado": dataGenral[0].num_empleado,
      "num_cuenta": num_cuenta,
      "comentarioI": `${respuestas[0]}`,
      "comentarioII": `${respuestas[1]}`,
      "comentarioIII": `${respuestas[2]}`,
      "comentarioIIII": `${respuestas[3]}`,
      "comentarioIIIII": `${respuestas[4]}`,
      "comentarioIIIIII": `${respuestas[5]}`
    }


    if (validarFormulario(respuestaData)) {

      console.log(validarFormulario(respuestaData))
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
      <br />
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
          <tr>
            <th>
              <p>Lista aspectos en los que consideras que puede mejorar el docente</p>
              <textarea
                style={{ width: '300px', height: '150px' }}
                value={respuestas[preguntas.length] || ""}
                onChange={handleTextArea}
              ></textarea>
            </th>
          </tr>
        </tbody>
      </table>

      <button onClick={enviarRespuesta}>Enviar</button>
    </>
  );
};
