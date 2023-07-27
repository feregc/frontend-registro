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

  return (
    <>
      <div className="container">
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
                  <th scope="col">Nombre de la Clase</th>
                  <th scope="col">Ver</th>
                </tr>
              </thead>
              <tbody>
                {clases.map((clase) => (
                  <tr key={clase.id_clase}>
                    <td scope="row">{clase.nombre}</td>
                    <td scope="row">
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
                    <th scope="col">Sección</th>
                    <th scope="col">Nombres</th>
                    <th scope="col">Edificio</th>
                    <th scope="col">Aula</th>
                    <th scope="col">Hi</th>
                    <th scope="col">Hf</th>
                    <th scope="col">Eliminar</th>
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
                      <td scope="row">
                        <button
                          className="btn btn-success btn-w"
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
