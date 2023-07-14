import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const LandingDocente = () => {
  const [clases, setClases] = useState([]);

  const num_empleado = localStorage.getItem("id");

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/clasesdocentes/${num_empleado}`
        );
        const jsonData = await response.json();
        setClases(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchClases();
  }, []);

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center my-3">
          <h4>Clases Asignadas</h4>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="row">
          <div className="col ">
            {clases &&
              clases.length > 0 &&
              clases.map((dato, index) => (
                <Link to={`../detalle-de-clase/${dato.id_clase}`} key={index}>
                  <button className="btn btn-success m-1">{dato.nombre_clase}</button>
                </Link>
              ))}
          </div>
        </div>
        </div>
        
      </div>
    </>
  );
};
