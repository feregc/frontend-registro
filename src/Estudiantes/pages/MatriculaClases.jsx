import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MatriculaClases = () => {
  const [departamentos, setDepartamentos] = useState([
    { id: 1, nombre: 'Matemáticas' },
    { id: 2, nombre: 'Ciencias' },
    { id: 3, nombre: 'Historia' },
  ]);
  const [clases, setClases] = useState([]);
  const [secciones, setSecciones] = useState([]);

  const clasesPorDepartamento = {
    1: [
      { id: 1, nombre: 'Álgebra' },
      { id: 2, nombre: 'Cálculo' },
    ],
    2: [
      { id: 3, nombre: 'Biología' },
      { id: 4, nombre: 'Química' },
    ],
    3: [
      { id: 5, nombre: 'Antigua' },
      { id: 6, nombre: 'Moderna' },
    ],
  };

  const seccionesPorClase = {
    1: [
      { id: 1, nombre: 'A' },
      { id: 2, nombre: 'B' },
    ],
    2: [
      { id: 3, nombre: 'A' },
      { id: 4, nombre: 'B' },
    ],
    3: [
      { id: 5, nombre: 'A' },
      { id: 6, nombre: 'B' },
    ],
    4: [
      { id: 7, nombre: 'A' },
      { id: 8, nombre: 'B' },
    ],
    5: [
      { id: 9, nombre: 'A' },
      { id: 10, nombre: 'B' },
    ],
    6: [
      { id: 11, nombre: 'A' },
      { id: 12, nombre: 'B' },
    ],
  };
  
  const navigate = useNavigate();

  const handleDepartamentoClick = (departamentoId) => {
    const clasesDelDepartamento = clasesPorDepartamento[departamentoId];
    setClases(clasesDelDepartamento);
    setSecciones([]);
  };

  const handleClaseClick = (claseId) => {
    const seccionesDeClase = seccionesPorClase[claseId];
    setSecciones(seccionesDeClase);
  };

  return (
    <div className="d-flex justify-content-center">
  <div className="col-3 mx-2">
    <br />
    {departamentos.map(departamento => (
      <button
        key={departamento.id}
        className="btn btn-w btn-h btn-primary"
        style={{ margin: '10px' }}
        onClick={() => handleDepartamentoClick(departamento.id)}
      >
        {departamento.nombre}
      </button>
    ))}
  </div>
  <div className="col-3 mx-2">
    {clases.map(clase => (
      <button
        key={clase.id}
        className="btn btn-w btn-h btn-primary"
        style={{ margin: '10px' }}
        onClick={() => handleClaseClick(clase.id)}
      >
        {clase.nombre}
      </button>
    ))}
  </div>
  <div className="col-3 mx-2">
    {secciones.map(seccion => (
      <button
        key={seccion.id}
        className="btn btn-w btn-h btn-primary"
        style={{ margin: '10px' }}
        onClick={() => {
          // Aquí podrías realizar alguna acción relacionada con la sección seleccionada
        }}
      >
        {seccion.nombre}
      </button>
    ))}
  </div>
</div>

  );
};
