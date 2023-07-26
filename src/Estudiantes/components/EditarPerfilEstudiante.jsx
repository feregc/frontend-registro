import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

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
        // setDatosPersonales(datos);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchEstudiante();
  }, []);
  const actualizarDescripcion = async () => {
    try {
      // setActualizando(true);
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
        history.back();
      } else {
        throw new Error("Error en la solicitud de actualización");
      }
    } catch (error) {
      console.error("Error al actualizar la descripción:", error);
    } finally {
      setTimeout(() => {
        // setActualizando(false);
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


  const navigate = useNavigate();
  const regresar = () => {
    navigate("../PerfilEstudiante")
  }


  return (
    <>
      <div className="container">
        <br />
        <div className="row">
          {/* Boton para regresar a la pagina anterior */}
          <button className="btn btn-success btn-w"
            onClick={regresar}>Atras</button>

          <div className="d-flex justify-content-center my-5">
            <h3>Editar Perfil</h3>
          </div>
          <div className="col-6 ">
            <div className="d-flex justify-content-center">
              <textarea
                className="w-75 h-75 rounded-3 p-3"
                placeholder="Escribe aquí tu nueva descripción"
                value={textDescripcion}
                onChange={editarDescripcion}
              ></textarea>
            </div>
            <br />
            <div className="d-flex justify-content-center ">
              <input
                placeholder="Ingrese una foto"
                className="rounded-3 form-control w-75"
                disabled={desabilitarBoton}
                type="file"
                accept="image/*"
                onChange={cargarImagen}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-w p-3 btn-primary rounded-3 mt-3 mb-5"
                type="submit"
                onClick={() => subirImagen()}
                disabled={desabilitarBoton}
              >
                Subir imagen
              </button>
            </div>
          </div>
          <div className="col-3">
            {/* <div className="container "> */}
            <div className="row d-flex flex-wrap ">
              {/*borar imagenes*/}
              {imgLimit &&
                imgLimit.length > 0 &&
                imgLimit.map((datoImg) => (
                  <>
                    <div
                      className="col-6 justify-content-center"
                      key={datoImg.id}
                    >
                      <div className=" p-2">
                        <img
                          className="img-fluid img-thumbnail"
                          src={datoImg.url}
                          alt="Imagen"
                        />
                        <FontAwesomeIcon icon="fa-solid fa-trash" />
                        <button
                          onClick={() => handleEliminarImagen(datoImg.id)}
                          className=" btn w-100 btn-primary rounded-3 my-2"
                        >
                          Borrar
                        </button>
                      </div>
                    </div>
                  </>
                ))}
              {/* </div> */}
            </div>
          </div>
          <div className="col-3">
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-w p-3 btn-primary rounded-3 mt-3"
                onClick={actualizarDescripcion}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
