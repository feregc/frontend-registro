import { useState, useEffect } from "react";
import "../../Assets/styles/styles-docentes/Docente-perfil.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

export const VerPerfilDeDocente = () => {
  const [verVideo, setVerVideo] = useState({});
  const [imagen, setImagen] = useState([]);
  const [info, setInfo] = useState([]);

  const location = useLocation();
  const num_empleado = location.state;


  // Carga de imagen
  useEffect(() => {
    const image = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/obtenerImagenes?id_docente=${num_empleado}`
        );
        const jsonData = await response.json();
        setImagen(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    image();
  }, []);

  // Informacion general del docente

  useEffect(() => {
    const image = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/docente/${num_empleado}`
        );
        const jsonData = await response.json();
        setInfo(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    image();
  }, []);

  // Cargar el video de presentacion del docente
  useEffect(() => {
    const fetchDocente = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/obtenerVideo?id_docente=${num_empleado}`
        );
        const imgPerfil = await response.json();
        setVerVideo(imgPerfil);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchDocente();
  }, []);

  const navigate = useNavigate();
  const regresar =()=>{
    navigate("../clases-matriculadas")
  }

  return (
    <>

      <div className="container">
        <br />
        <button  className="btn btn-success btn-w" 
        onClick={regresar}>Atras</button>

        <h3 className="mt-5">Información General</h3>
        <br />
        {/* Contenedor */}
        <div className=" row d-flex align-items-center">
          <div
            id="carouselExample"
            className="img-size d-flex align-items-center col-4"
          >
            {imagen && imagen.length > 0 ? (
              <div className="">
                <img
                  src={imagen[0].url}
                  className="img-size2  img-thumbnail"
                  alt="..."
                />
              </div>
            ) : (
              <FontAwesomeIcon
                className="img-size2 img-thumbnail"
                style={{ color: "#006494" }}
                icon={faUser}
              />
            )}
          </div>
          {/* Datos generales */}
          {info.length > 0 && (
            <div className="card1 p-5 col d-flex flex-column align-items-start justify-content-center">
              <p>Nombre: {info[0].nombres}</p>
              <p> Apellido: {info[0].apellidos}</p>
              <p>Correo Institucional {info[0].correo}</p>
              <p> Cargo: {info[0].cargo}</p>
              <p> Carrera: {info[0].carrera}</p>
            </div>
          )}
        </div>
        {/* Descripción del docente */}
        <div className="card2 border-3">
          <h3 className="mt-3"> Video de presentación</h3>
          <br />
          {verVideo.length > 0 ? (
            <video
              className="vid"
              src={verVideo[0].url}
              type="video/mp4"
              controls
            ></video>
          ) : (
            <div className=" card">
              <p className="">Video de precentación...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

