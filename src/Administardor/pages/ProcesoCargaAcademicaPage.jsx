import React, { useEffect, useState } from "react";
import { FormProcesoMatricula } from "../components/FormProcesoMatricula";
import { CardProcMatricula } from "../components/CardProcMatricula";
import { FormProcesoCarga } from "../components/FormProcesoCarga";
import { CardProcesoCarga } from "../components/CardProcesoCarga";
export const ProcesoCargaAcademicaPage = () => {
  const [data, setData] = useState([]);
  const [validador, setValidador] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8081/procesoCarga");
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
            <FormProcesoCarga onCrear={handleCrearProceso} />
            
          </div>
          <div className="col-4 my-3">
            <br />
            <br /><h3 >Cargas Anteriores</h3>
  
            {data.slice(-5).reverse().map((dat) => (
              <CardProcesoCarga
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