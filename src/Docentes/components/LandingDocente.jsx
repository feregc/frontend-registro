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
        <div className="row">
          <div className="col d-flex justify-content-center my-3">
            <h3 className="my-3">Clases Asignadas</h3>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center align-items-center">
            {clases &&
              clases.length > 0 &&
              clases.map((dato, index) => (
                <Link to={`../detalle-de-clase/${dato.id_clase}`} key={index}>
                  <div className="row">
                    <div className="col-6">
                      <button className="btn btn-w btn-h mx-2 btn-success">
                        {dato.nombre_clase}
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
