import React, { useEffect, useState } from "react";
import { FormProcesoMatricula } from "../components/FormProcesoMatricula";
import { CardProcMatricula } from "../components/CardProcMatricula";
export const ProcesoMatriclaPage = () => {
  const [data, setData] = useState([]);
  const [validador, setValidador] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8081/proceso");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, [validador]);

  const handleCrearProceso = (msg) => {
    setValidador(msg);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <FormProcesoMatricula onCrear={handleCrearProceso} />
          </div>
          <div className="col-4 my-3">
            <br /><br />
            <br />
            <h3 className="mt-3">Procesos Anteriores</h3>
  
            {data.slice(-5).reverse().map((dat) => (
              <CardProcMatricula
                key={dat.id}
                procesos={dat}
              // onBorrar={handleBorrarProceso}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};