import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const LandingMatricula = () => {
    const navigate = useNavigate();
    const onNavMatricula = () => {
        navigate("../matriculaClase");
      };
      const onNavCancelarClase = () => {
        navigate("../cancelarClase");
      };

      const [procesosDisponibles, setProcesosDisponibles] = useState([]);

      // Función para llamar al endpoint y guardar los datos en el estado
      const fetchProcesosDisponibles = async () => {
        try {
          const response = await fetch('http://localhost:8081/proceso_disponibilidad');
          if (!response.ok) {
            throw new Error('Error al obtener los datos');
          }
          const jsonData = await response.json();
          setProcesosDisponibles(jsonData);
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      };
    
      // useEffect para llamar a la función al cargar el componente
      useEffect(() => {
        fetchProcesosDisponibles();
      }, []);
    
     
      console.log(procesosDisponibles);
    

  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <br />
        <br />
        <br />
        <br />
        <h3>Bienvenido al apartado de matricula</h3>
        <br />
        <button className="btn btn-primary" onClick={onNavMatricula}>
          Matricula
        </button>
        <br />
        <button className="btn btn-primary" onClick={onNavCancelarClase}>
          Cancelar clases
        </button>
      </div>
      <div className="footer z-n1 position-absolute bottom-0 start-50 translate-middle-x">
        <img src="../src/Assets/img/footer-bg.png" alt="" />
      </div>
    </>
  )
}
