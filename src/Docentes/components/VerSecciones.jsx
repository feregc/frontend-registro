import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const VerSecciones = () => {
  const [docenteData, setDocenteData] = useState([]);
  const [clases, setClases] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const docenteId = localStorage.getItem("id");
    if (docenteId) {
      fetchDocenteData(docenteId);
    }
  }, []);

  useEffect(() => {
    fetchClases();
  }, [docenteData]);

  const mostrarSecciones = (clase) => {
    navigate(
      "../verSecciones/editarSeccion",
      { state: clase }
    )
  }

  return (
    <>
      <br />
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
                  onClick={() => mostrarSecciones(clase)}
                >
                  Secciones
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>)
}