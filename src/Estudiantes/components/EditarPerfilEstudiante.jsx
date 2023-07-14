import React from "react";
import { useState, useEffect } from "react";

export const EditarPerfilEstudiante = () => {
  const [textDescripcion, setTextDescripcion] = useState("");
  const [actualizando, setActualizando] = useState(false);
  const [datoPersonales, setDatosPersonales] = useState({});
  const [imgLimit, setImgLimit] = useState([]);
  const [imagen, setImagen] = useState("");

  const num_cuenta = localStorage.getItem("id");

  const editarDescripcion = (event) => {
    setTextDescripcion(event.target.value);
  };
  useEffect(() => {
    const fetchEstudiante = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/estudiante/${num_cuenta}`
        );
        const datos = await response.json();
        setDatosPersonales(datos);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchEstudiante();
  }, []);
  const actualizarDescripcion = async () => {
    try {
      setActualizando(true);
      const body = JSON.stringify({ descripcion: textDescripcion });
      const response = await fetch(
        `http://localhost:8081/estudiantesDescri/descripcion/${num_cuenta}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );
      if (response.ok) {
        console.log("Descripción actualizada exitosamente");
      } else {
        throw new Error("Error en la solicitud de actualización");
      }
    } catch (error) {
      console.error("Error al actualizar la descripción:", error);
    } finally {
      setTimeout(() => {
        setActualizando(false);
      }, 1000);
    }
  };
  {
    /*Subir imagen*/
  }
  const cargarImagen = (event) => {
    const file = event.target.files[0];
    setImagen(file);
  };
  const subirImagen = async () => {
    const formData = new FormData();
    formData.append("foto", imagen);
    formData.append("id_estudiante", num_cuenta);
    try {
      const response = await fetch("http://localhost:8081/cargarimagen", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Imagen enviada exitosamente");
      } else {
        throw new Error("Error en la solicitud de envío");
      }
    } catch (error) {
      console.error("Error al enviar la imagen:", error);
    }
  };

  {
    /**Datos de pueba para controlar el numero de imagenes */
  }
  const desabilitarBoton = imgLimit.length >= 3;


  useEffect(() => {
    const image = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/obtenerImagenes?id_estudiante=${num_cuenta}`
        );
        const jsonData = await response.json();
        setImgLimit(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    image();
  }, [subirImagen]);

  {
    /*Borrar una imagen*/
  }

  const imgX = async (id_) => {
    try {
      const body = JSON.stringify({ id: id_ });
      const response = await fetch(`http://localhost:8081/eliminarimagen`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      if (response.ok) {
        console.log("Imagen eliminada");
      } else {
        throw new Error("Error en la solicitud de actualización");
      }
    } catch (error) {
      console.error("Error al actualizar la descripción:", error);
    }
  };

  const handleEliminarImagen = async (id) => {
    await imgX(id);
    setImgLimit(imgLimit.filter((imagen) => imagen.id !== id));
  };
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center ">
        <br /><br />
        <h3>Editar Perfil</h3>
        <br />
        {/*Actualización de la descripcion*/}
        <div className=" d-flex flex-column justify-content-center align-items-center w-100 h-100">
          {actualizando && (
            <div>
              <span style={{ marginLeft: "10px" }}>Actualizando</span>
            </div>
          )}
          <textarea
            className="w-75 h-75 rounded-3"
            placeholder="Escribe aquí tu nueva descripción"
            value={textDescripcion}
            onChange={editarDescripcion}
          ></textarea>
          <br />
        </div>
        <button
          className="btn p-3 btn-primary rounded-3 mt-3"
          onClick={actualizarDescripcion}
        >
          Actualizar descripción
        </button>
        <hr />
        <div className="container">
          <div className="row">
            <div className="d-flex flex-row flex-wrap align-items-center align-content-center  ">
              {/*borar imagenes*/}
              {imgLimit &&
                imgLimit.length > 0 &&
                imgLimit.map((datoImg) => (
                  <>
                    <div
                      className="d-flex flex-row flex-wrap align-items-center col-4 px-3 justify-content-center"
                      key={datoImg.id}
                    >
                      <div className="w-100 h-100">
                        <img
                          className="img-fluid img-thumbnail"
                          src={datoImg.url}
                          alt="Imagen"
                        />
                      </div>

                      <div className=" ">
                        <button
                          onClick={() => handleEliminarImagen(datoImg.id)}
                          className=" btn btn-primary rounded-3 mt-3 mb-5"
                        >
                          Borrar
                        </button>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          
          <input
            placeholder="Ingrese una foto"
            className="rounded-3 form-control"
            disabled={desabilitarBoton}
            type="file"
            accept="image/*"
            onChange={cargarImagen}
          />

          <button
            className="btn p-3 btn-primary rounded-3 mt-3 mb-5"
            type="submit"
            onClick={() => subirImagen()}
            disabled={desabilitarBoton}
          >
            Subir imagen
          </button>
        </div>
      </div>
    </>
  );
};
