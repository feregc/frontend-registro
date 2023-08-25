import React, { useState, useEffect } from "react";

export const CancelarSeccionesPage = () => {
  const [clases, setClases] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [showSecciones, setShowSecciones] = useState(false);
  const [docenteData, setDocenteData] = useState([]);

  const fetchDocenteData = (docenteId) => {
    fetch(`http://localhost:8081/docente/${docenteId}`)
      .then((response) => response.json())
      .then((data) => {
        setDocenteData(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del docente:", error);
      });
  };

  const fetchClases = () => {
    if (docenteData.length > 0 && docenteData[0].carrera_id) {
      fetch(
        `http://localhost:8081/clasesDisponibles/${docenteData[0].carrera_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setClases(data);
        })
        .catch((error) => {
          console.error("Error al obtener las clases:", error);
        });
    }
  };

  const mostrarSecciones = (idClase) => {
    fetch(`http://localhost:8081/seccionesDisponibles/${idClase}`)
      .then((response) => response.json())
      .then((data) => {
        setSecciones(data);
        setShowSecciones(true);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener las secciones:", error);
      });
  };

  const eliminarSeccion = (idSeccion) => {
    console.log(idSeccion);

    fetch(`http://localhost:8081/eliminarseccion/${idSeccion}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log('Sección eliminada:', data);
        // Actualizar las secciones después de eliminar
        const updatedSecciones = secciones.filter(
          (seccion) => seccion.id_seccion !== idSeccion
        );
        setSecciones(updatedSecciones);
        alert("Sección eliminada");
      })
      .catch((error) => {
        console.error("Error al eliminar la sección:", error);
        alert("Error al eliminar seccion");
      });
  };

  useEffect(() => {
    const docenteId = localStorage.getItem("id");
    if (docenteId) {
      fetchDocenteData(docenteId);
    }
  }, []);

  useEffect(() => {
    fetchClases();
  }, [docenteData]);

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
          <div className="col">
            <div className="d-flex justify-content-center my-3">
              <h3>Cancelar Secciones</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <table className="table table-hover table-stripted">
              <thead>
                <tr>
                  <th scope="col" className="text-center">Nombre de la Clase</th>
                  <th scope="col" className="text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {clases.map((clase) => (
                  <tr key={clase.id_clase}>
                    <td scope="row">{clase.nombre}</td>
                    <td scope="row" className="d-flex justify-content-center">
                      <button
                        className="btn btn-success btn-w"
                        onClick={() => mostrarSecciones(clase.id_clase)}
                      >
                        Secciones
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-6">
            {showSecciones && (
              <table className="table table-hover table-stripted">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">Sección</th>
                    <th scope="col" className="text-center">Nombres</th>
                    <th scope="col" className="text-center">Edificio</th>
                    <th scope="col" className="text-center">Aula</th>
                    <th scope="col" className="text-center">Hi</th>
                    <th scope="col" className="text-center">Hf</th>
                    <th scope="col" className="text-center">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {secciones.map((seccion) => (
                    <tr key={seccion.id_seccion}>
                      <td scope="row">{seccion.id_seccion}</td>
                      <td scope="row">
                        {seccion.nombres} {seccion.apellidos}
                      </td>
                      <td scope="row">{seccion.nombre_edificio}</td>
                      <td scope="row">{seccion.num_aula}</td>
                      <td scope="row">{seccion.horainicio}</td>
                      <td scope="row">{seccion.horafin}</td>
                      <td scope="row" className="d-flex justify-content-center">
                        <button
                          className="btn btn-success w-100"
                          onClick={() => eliminarSeccion(seccion.id_seccion)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
