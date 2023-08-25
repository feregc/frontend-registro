import { useState, useEffect } from "react";

export const EditarPerfil = () => {
  const num_empleado = localStorage.getItem("id");
  const [imagen, setImagen] = useState("");
  const [video, setVideo] = useState("");
  const [imgLimit, setImgLimit] = useState([]);

  const [videoLimit, setVideoLimit] = useState([]);

  // Cargar imagen actual
  useEffect(() => {
    const image = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/obtenerImagenes?id_docente=${num_empleado}`
        );
        const jsonData = await response.json();
        setImgLimit(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    image();
  }, [imgLimit]);

  const desabilitarBoton = imgLimit.length >= 1;
  const desabilitarBotonV = videoLimit.length >= 1;

  const handleEliminarImagen = async (id) => {
    await imgX(id);
    setImgLimit(imgLimit.filter((imagen) => imagen.id !== id));
  };
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

  const cargarImagen = (event) => {
    const file = event.target.files;
    setImagen(file);
  };

  const subirImagen = async () => {
    const formData = new FormData();
    formData.append("foto", imagen[0]);
    formData.append("id_docente", num_empleado);
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

  // Video
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/obtenerVideo?id_docente=${num_empleado}`
        );
        const videoPres = await response.json();
        setVideoLimit(videoPres);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchVideo();
  }, [videoLimit]);

  const handleEliminarVideo = async (id) => {
    await videoDelete(id);
    setVideoLimit(videoLimit.filter((video) => video.id !== id));
  };
  const videoDelete = async (id_) => {
    try {
      const body = JSON.stringify({ id: id_ });
      const response = await fetch(`http://localhost:8081/eliminarVideo`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      if (response.ok) {
        console.log("Video eliminado");
      } else {
        throw new Error("Error en la solicitud de actualización");
      }
    } catch (error) {
      console.error("Error al eliminar el video", error);
    }
  };

  const cargarVideo = (event) => {
    const file = event.target.files;
    setVideo(file);
  };

  const subirVideo = async () => {
    const formData = new FormData();
    formData.append("video", video[0]);
    formData.append("id_docente", num_empleado);
    try {
      const response = await fetch("http://localhost:8081/cargarvideo", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Video enviado exitosamente");
      } else {
        throw new Error("Error en la solicitud de envío");
      }
    } catch (error) {
      console.error("Error al enviar el video", error);
    }
  };

  const regresar = () => {
    window.history.back();
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-success mt-4" onClick={regresar}>
          Atrás
        </button>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="my-3 d-flex justify-content-center">
                <h3>Editar Perfil</h3>
              </div>
            </div>
            <div className="row my-3 ">
              <div className="d-flex justify-content-center">
                <input
                  placeholder="Ingrese una foto"
                  className="rounded-3 form-control btn-w2"
                  disabled={desabilitarBoton}
                  type="file"
                  accept="image/*"
                  onChange={cargarImagen}
                />
              </div>
              <div className=" row my-3  ">
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-w btn-primary rounded-3 mt-3 mb-5"
                    type="submit"
                    onClick={() => subirImagen()}
                    disabled={desabilitarBoton}
                  >
                    Subir imagen
                  </button>
                </div>
              </div>
            </div>
            <div className="row my-3">
              <div className="d-flex justify-content-center">
                <input
                  title="Cargar video"
                  className="rounded-3 form-control btn-w2"
                  disabled={desabilitarBotonV}
                  type="file"
                  accept="video/*"
                  onChange={cargarVideo}
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-w btn-primary rounded-3 mt-3 mb-5"
                  type="submit"
                  onClick={() => subirVideo()}
                  disabled={desabilitarBotonV}
                >
                  Subir video
                </button>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="row my-3">
              <div className="my-2 d-flex justify-content-center">
                {imgLimit.length > 0 && (
                  <img
                    className="img-fluid img-thumbnail img-size2"
                    src={imgLimit[0].url}
                    alt="Imagen"
                  />
                )}
              </div>
              <div className="my-2 d-flex justify-content-center">
                {imgLimit.length > 0 && (
                  <button
                    onClick={() => handleEliminarImagen(imgLimit[0].id)}
                    className=" btn btn-primary rounded-3 btn-w2"
                  >
                    Borrar
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="row my-3">
            <div className="my-2 d-flex justify-content-center">
              {videoLimit.length > 0 && (
                      <video
                      className="img-fluid img-thumbnail img-size2"
                        src={videoLimit[0].url}
                        type="video/mp4"
                        controls
                      ></video>
                    )}
              </div>
              <div className="my-2 d-flex justify-content-center">
              {videoLimit.length > 0 && (
                      <button
                        onClick={() => handleEliminarVideo(videoLimit[0].id)}
                        className=" btn btn-primary rounded-3 btn-w2"
                      >
                        Borrar
                      </button>
                    )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-3 d-flex flex-column justify-content-center align-items-center ">
        <br />
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="container">
            <div className="row">
              <div className="d-flex flex-row flex-wrap align-items-center align-content-center  ">
                {/*borar imagenes*/}
                <div className="d-flex flex-row flex-wrap align-items-center col-4 px-3 justify-content-center">
                  {/* <div className=" ">
                    {imgLimit.length > 0 && (
                      <button
                        onClick={() => handleEliminarImagen(imgLimit[0].id)}
                        className=" btn btn-primary rounded-3 mt-3 mb-5"
                      >
                        Borrar
                      </button>
                    )}
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Video */}
          <div className="container">
            <div className="row">
              <div className="d-flex flex-row flex-wrap align-items-center align-content-center  ">
                <div className="d-flex flex-row flex-wrap align-items-center col-4 px-3 justify-content-center">
                  <div className="w-100 h-100">
                    
                  </div>
                  <div className=" ">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
