import "../../Assets/styles/styles-estudiantes/perfil-estudiante.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const PerfilEstudiante = () => {
  const [imgPerfilEstudiante, setImgPerfilEstudiante] = useState({});

  const num_cuenta = localStorage.getItem("id");

  useEffect(() => {
    const fetchEstudiante = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/estudiante/${num_cuenta}`
        );
        const imgPerfil = await response.json();
        setImgPerfilEstudiante(imgPerfil);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchEstudiante();
  }, []);

  {
    /**Datos de pueba */
  }
  const [imagen, setImagen] = useState([]);

  useEffect(() => {
    const image = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/obtenerImagenes?id_estudiante=${num_cuenta}`
        );
        const jsonData = await response.json();
        setImagen(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    image();
  }, []);

  return (
    <>
      <div className="container">
        <h3 className="mt-5">Información General</h3>
        <br />
        {/* Contenedor */}
        <div className=" row">
          {/* Carrusel */}
          <div
            id="carouselExample"
            className="carousel img-size d-flex align-items-center slide col-4"
          >
            <div className="carousel-inner">
              {imagen.map((img, index) => (
                <div
                  key={img.id}
                  className={` carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <div className="">
                    <img
                      src={img.url}
                      className="img-size2 img-thumbnail"
                      alt="..."
                    />
                  </div>
                </div>
              ))}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Anterior</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Próxima</span>
              </button>
            </div>
          </div>

          {/* Datos generales */}
          <div className="card1 p-5 col d-flex flex-column align-items-start justify-content-center">
            <p>
              Nombre: {imgPerfilEstudiante.primer_nombre}{" "}
              {imgPerfilEstudiante.segundo_nombre}{" "}
              {imgPerfilEstudiante.primer_apellido}{" "}
              {imgPerfilEstudiante.segundo_apellido}{" "}
            </p>
            <p>Carrera: {imgPerfilEstudiante.carrera}</p>
            <p>Número de cuenta: {imgPerfilEstudiante.num_cuenta}</p>
            <p>Índice Global: {imgPerfilEstudiante.indice}</p>
            <p>
              Correo Institucional: {imgPerfilEstudiante.correo_institucional}
            </p>
          </div>
        </div>
        {/* Descripción del estudiante */}
        <div className="card2 border-3">
          <h3 className="mt-3">Descripción</h3>
          <br />
          <div className="card3 border-3">
            {imgPerfilEstudiante.descripcion}
          </div>
        </div>

        <div className="mt-5 d-flex flex-colum justify-content-center">
          <Link to="../EditarPerfilEstudiante">
            <button className="btn p-3 btn-primary mt-1 mb-5 ">
              Editar Perfil
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
