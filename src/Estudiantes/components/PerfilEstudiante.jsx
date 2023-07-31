import "../../Assets/styles/styles-estudiantes/perfil-estudiante.css";
import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const regresar = () => {
    navigate("../home")
  }

  return (
    <>
      <div className="container">
        {/* Boton para regresar a la pagina anterior */}
        <button className="btn btn-success my-4"
          onClick={regresar}>Atras</button>
        <div className="d-flex justify-content-center my-3">
          <h3>Información General</h3>
        </div>
        {/* Contenedor */}
        <div className=" row">
          {/* Carrusel */}
          <div
            id="carouselExample"
            className="carousel img-size d-flex align-items-center slide col-3"
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
          <div className="card1 p-5 col-5 d-flex flex-column align-items-start justify-content-center">
            <p>
              Nombre: {imgPerfilEstudiante.primer_nombre}{" "}
              {imgPerfilEstudiante.segundo_nombre}{" "}
              {imgPerfilEstudiante.primer_apellido}{" "}
              {imgPerfilEstudiante.segundo_apellido}{" "}
            </p>
            <p>Carrera: {imgPerfilEstudiante.nombre_carrera}</p>
            <p>Número de cuenta: {imgPerfilEstudiante.num_cuenta}</p>
            <p>Índice Global: {imgPerfilEstudiante.indice}</p>
            <p>Centro: {imgPerfilEstudiante.nombre_centro}</p>
            <p>
              Correo Institucional: {imgPerfilEstudiante.correo_institucional}
            </p>
          </div>
          <div className="col-4 d-flex  justify-content-end align-items-center">
            <Link to="../EditarPerfilEstudiante">
              <button className="btn btn-w p-3 btn-primary mt-1 mb-5 ">
                Editar Perfil
              </button>
            </Link>
          </div>
        </div>
        {/* Descripción del estudiante */}
        <div className="card2 col my-3">
          <div className="d-flex justify-content-center my-3">
            <h3>Descripción</h3>
          </div>
          <br />
          <div className="card3 h-75 rounded-3">
            {imgPerfilEstudiante.descripcion}
          </div>
        </div>
      </div>
    </>
  );
};
