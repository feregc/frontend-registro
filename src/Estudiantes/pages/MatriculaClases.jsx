import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const MatriculaClases = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [clases, setClases] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const num_cuenta = localStorage.getItem("id"); // Obtener el valor de num_cuenta desde localStorage

  useEffect(() => {
    // Obtener departamentos cuando el componente se monta
    fetch('http://localhost:8081/obtenerDeptos')
      .then(response => response.json())
      .then(data => {
        setDepartamentos(data);
      })
      .catch(error => {
        console.error('Error al obtener los departamentos:', error);
      });
  }, []);

  const handleDepartamentoClick = (id_carrera) => {
    fetch(`http://localhost:8081/clasesFaltantes?id_carrera=${id_carrera}&id_estudiante=${num_cuenta}`)
      .then(response => response.json())
      .then(data => {
        setClases(data);
        setSecciones([]); // Limpiar las secciones al cambiar de clases
      })
      .catch(error => {
        console.error('Error al obtener las clases faltantes:', error);
      });
  };

  const handleClaseClick = async (claseId) => {
    try {
      const response = await fetch(`http://localhost:8081/verificar-requisitos?id_clase=${claseId}&num_cuenta=${num_cuenta}`);
      const requisitosResponse = await response.json();
      
      if (requisitosResponse.resultado === "El estudiante cumple con los requisitos para la clase solicitada") {
        const responseMatriculada = await fetch(`http://localhost:8081/verifica-clase?id_clase=${claseId}&num_cuenta=${num_cuenta}`);
        const matriculaResponse = await responseMatriculada.json();
  
        if (!matriculaResponse.tiene_matricula) {
          const responseSecciones = await fetch(`http://localhost:8081/secciones-por-clase?id_clase=${claseId}`);
          const seccionesData = await responseSecciones.json();
          setSecciones(seccionesData);
        } else {
          // Mostrar alerta: Clase ya matriculada
          alert("Esta clase ya está matriculada.");
        }
      } else {
        // Mostrar alerta: Faltan requisitos
        alert("No cumples con los requisitos para esta clase.");
      }
    } catch (error) {
      console.error('Error al verificar requisitos y obtener secciones:', error);
    }
  };

  
  const handleSeccionClick = async (seccion) => {
    const horarioValido = await verificarHorario(seccion.id_seccion);
    if (!horarioValido) {
      alert("Conflicto de horario. Ya tienes una clase en este horario.");
    } else {
      const matriculaExitosa = await matricularEstudianteEnSeccion(seccion.id_seccion);
      if (matriculaExitosa) {
        alert("Error al realizar la matrícula. Por favor, inténtalo de nuevo.");
      } else {
        alert("Matrícula exitosa en la sección " + seccion.id_seccion);
      }
    }
  };
  
  const verificarHorario = async (idSeccion) => {
    try {
      const response = await fetch(`http://localhost:8081/verificar-horario?id_seccion=${idSeccion}&num_cuenta=${num_cuenta}`);
      const horarioResponse = await response.json();
      
      if (horarioResponse.resultado === "El estudiante ya está matriculado en otra clase a la misma hora") {
        alert("Conflicto de horario. Ya tienes una clase en este horario.");
        return false;
      }
      
      return true; 
    } catch (error) {
      console.error('Error al verificar el horario:', error);
      return false;
    }
  };
  
  const matricularEstudianteEnSeccion = async (idSeccion) => {
    try {
      const response = await fetch(`http://localhost:8081/insertMatricula?id_seccion=${idSeccion}&num_cuenta=${num_cuenta}`, {
        method: 'POST', 
      });
      const matriculaResponse = await response.json();
      return matriculaResponse.resultado === "Matrícula exitosa"; 
    } catch (error) {
      console.error('Error al matricular al estudiante:', error);
      return false;
    }
  };
  
  
  return (
    <div className="d-flex justify-content-center">
      <div className="col-3 mx-2">
        <br />
        {departamentos.map(departamento => (
          <button
            key={departamento.id_carrera}
            className="btn btn-w btn-h btn-primary"
            style={{ margin: '10px' }}
            onClick={() => handleDepartamentoClick(departamento.id_carrera)}
          >
            {departamento.nombre_carrera}
          </button>
        ))}
      </div>
      <div className="col-3 mx-2">
        {clases.map(clase => (
          <button
            key={clase.id_clase}
            className="btn btn-w btn-h btn-primary"
            style={{ margin: '10px' }}
            onClick={() => handleClaseClick(clase.id_clase)}
          >
            {clase.nombre}
          </button>
        ))}
      </div>
      <div className="col-3 mx-2">
  {secciones.map(seccion => (
    <button
      key={seccion.id_seccion}
      className="btn btn-w btn-h btn-primary"
      style={{ margin: '10px' }}
      onClick={() => handleSeccionClick(seccion)}
    >
      {seccion.id_seccion}
    </button>
  ))}
</div>
    </div>
  );
};
