import { useEffect, useState } from "react";

import { DocenteCard } from "../components/DocenteCard";
import "../../Assets/styles/styles-docentes/Docente-lista.css";

export const RecuperacionDocentePage = () => {
  const [email, setEmail] = useState("");
  const [docenteLogeado, setDocenteLogeado] = useState({});
  const [docentesSeleccionado, setDocentesSeleccionado] = useState();

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      fetch(`http://localhost:8081/docente/${id}`)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data[0]);
          setDocenteLogeado(data[0]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { carrera, centro_id } = docenteLogeado;
        // console.log({ carrera, centro_id });
        const response = await fetch(
          `http://localhost:8081/docentes/${carrera}/${centro_id}`
        );
        const data = await response.json();
        //console.log('datos:', data);
        setDocentesSeleccionado(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [docenteLogeado]);

  return (
    <>
    <br /><br />
      <div className="mt-6 d-flex flex-column align-items-center bg-primary ">
        <h3 className="mt-6">Docentes disponibles</h3>
      </div>
      <br />
      <div className="container">
        <ul id="card-doc" className="row">
          {docentesSeleccionado?.map((docente) => (
            <DocenteCard key={docente.num_empleado} docente={docente} />
          ))}
        </ul>
      </div>
    </>
  );
};
