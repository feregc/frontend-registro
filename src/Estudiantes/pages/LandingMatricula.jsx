import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertirSoloAFecha } from "../helpers/convertirFecha";

export const LandingMatricula = () => {
  const navigate = useNavigate();
  const onNavMatricula = () => {
    navigate("../matriculaClase");
  };
  const onNavCancelarClase = () => {
    navigate("../cancelarClase");
  };

  const [estudiante, setEstudiante] = useState([]);
  const [procesosDisponibles, setProcesosDisponibles] = useState([]);

  useEffect(() => {
    const numCuentaLocalStorage = localStorage.getItem("id");

    if (numCuentaLocalStorage) {
      fetch(`http://localhost:8081/estudiante/${numCuentaLocalStorage}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener los datos del estudiante");
          }
          return response.json();
        })
        .then((data) => {
          setEstudiante(data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del estudiante:", error);
        });
    }
  }, []);

  // Función para llamar al endpoint y guardar los datos en el estado
  const fetchProcesosDisponibles = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/proceso_disponibilidad"
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const jsonData = await response.json();
      setProcesosDisponibles(jsonData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  // useEffect para llamar a la función al cargar el componente
  useEffect(() => {
    fetchProcesosDisponibles();
  }, []);

  const {
    indiceI,
    fechainicioI,
    indiceII,
    fechainicioII,
    indiceIII,
    fechainicioIII,
    indiceIIII,
    fechainicioIIII,
    indiceIIIII,
    fechainicioIIIII,
  } = procesosDisponibles.length > 0 ? procesosDisponibles[0] : {};

  const verificarMatricula = (global, fechaActual) => {
    if (global >= indiceIIIII && fechaActual === convertirSoloAFecha(fechainicioIIIII)) {
      return true;
    }

    if (global >= indiceIIII && global <= indiceIIIII && fechaActual === convertirSoloAFecha(fechainicioIIII)) {
      return true;
    }

    if (global >= indiceIII && global <= indiceIIII && fechaActual === convertirSoloAFecha(fechainicioIII)) {
      return true;
    }

    if (global >= indiceII && global <= indiceIII && fechaActual === convertirSoloAFecha(fechainicioII)) {
      return true;
    }

    if (global >= indiceI && fechaActual === convertirSoloAFecha(fechainicioI)) {
      return true;
    }
    return false;
  };

  const fechaActuall = new Date();
  const anio = fechaActuall.getFullYear();
  const mes = String(fechaActuall.getMonth() + 1).padStart(2, '0');
  const dia = String(fechaActuall.getDate()).padStart(2, '0');
  const fechaEnFormato = `${anio}-${mes}-${dia}`;
  


  // const fechaActual = new Date().toISOString().slice(0, 10);
  const esDiaDeMatricula = verificarMatricula(estudiante?.indice, fechaEnFormato);
  const regresar = () => {
    history.back();
  };

  return (
    <>
      {esDiaDeMatricula ? (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <br />
          <br />
          <br />
          <br />
          <h3>Bienvenido al apartado de matrícula</h3>
          <br />
          <button className="btn btn-w btn-primary" onClick={onNavMatricula}>
            Matricular clases
          </button>
          <br />
          <button
            className="btn btn-w btn-primary"
            onClick={onNavCancelarClase}
          >
            Cancelar clases
          </button>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-3">
              <button className="btn btn-primary my-4 mb-5" onClick={regresar}>
                Atrás
              </button>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="alert alert-danger mt-5 d-flex justify-content-center" role="alert">
              Hoy no es su dia de matricula. Favor revisar el calendario de
              matricula
            </div>
          </div>
        </div>
      )}
      <div className="footer z-n1 position-absolute bottom-0 start-50 translate-middle-x">
        <img src="../src/Assets/img/footer-bg.png" alt="" />
      </div>
    </>
  );
};
