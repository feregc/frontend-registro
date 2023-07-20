import React, { useState, useEffect } from 'react';
import { convertirFecha } from '../helpers/convertirFecha';

const MatriculaComponent = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [clasesDepartamento, setClasesDepartamento] = useState([]);
  const [seccionesClase, setSeccionesClase] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState('');
  const [selectedClase, setSelectedClase] = useState('');
  const [datosClases, setDatosClases] = useState([]);
  const [requisitosCumplidos, setRequisitosCumplidos] = useState(false);
  const [verificarRequisitosResult, setVerificarRequisitosResult] = useState('');
  const [backendMessage, setBackendMessage] = useState('');

  const id = localStorage.getItem('id');

  const [data, setData] = useState([]);

  useEffect(() => {
    // Función para obtener los datos del endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/proceso-anio-periodo');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const jsonData = await response.json();
        // console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, []);

  const fecha = convertirFecha(data[0]?.anio)
  

  useEffect(() => {
    // Realizar la solicitud HTTP al endpoint
    fetch(`http://localhost:8081/clasesFaltantesEstudiante/${id}`)
      .then(response => response.json())
      .then(data => setDatosClases(data))
      .catch(error => {
        console.error('Error al obtener las clases del estudiante:', error);
      });
  }, []);

  useEffect(() => {
    const carrerasUnicas = [...new Set(datosClases.map(clase => clase.nombre_carrera))];
    setDepartamentos(carrerasUnicas);
  }, [datosClases]);

  const handleDepartamentoClick = (departamento) => {
    const clases = datosClases.filter((clase) => clase.nombre_carrera === departamento);
    setClasesDepartamento(clases);
    setSelectedDepartamento(departamento);
    setSelectedClase('');
    setSeccionesClase([]);
  };

  const handleClaseClick = (clase) => {
    setSelectedClase(clase);
    const secciones = datosClases.filter((item) => item.nombre_clase === clase);
    setSeccionesClase(secciones);
  };

  const handleSeccionClick = (idSeccion) => {
    const seccion = seccionesClase.find((seccion) => seccion.id_seccion === idSeccion);
    if (seccion) {
      fetch(`http://localhost:8081/verificar-horario/${idSeccion}/${id}/${fecha}/${data[0]?.periodo}`)
        .then(response => response.json())
        .then(data => {
          if (data.resultado === 'El estudiante no tiene otra clase matriculada a la misma hora') {
            fetch(`http://localhost:8081/verificar-requisitos/${seccion.id_clase}`)
              .then(response => response.json())
              .then(data => {
                setVerificarRequisitosResult(data.resultado);
                if (data.resultado === 'El estudiante cumple con los requisitos para la clase solicitada') {
                  setRequisitosCumplidos(true);
                  setBackendMessage(data.resultado);
                } else {
                  setRequisitosCumplidos(false);
                  setBackendMessage(data.resultado);
                }
              })
              .catch(error => {
                console.error('Error al verificar los requisitos:', error);
              });
          } else {
            setBackendMessage(data.resultado);
            setRequisitosCumplidos(false);
          }
        })
        .catch(error => {
          console.error('Error al verificar el horario:', error);
          setRequisitosCumplidos(false);
        });
    }
  };

  const handleMatriculaClick = () => {

    const claseSeleccionada = clasesDepartamento.find((clase) => clase.nombre_clase === selectedClase);
    if (claseSeleccionada) {
      const idClase = claseSeleccionada.id_clase;
      fetch(`http://localhost:8081/insertMatricula`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          num_cuenta: id,
          idSeccion: idClase
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log('Resultado de matriculaSeccion:', data.message);
          alert('matriculado con exito')
          //navegar hasta la pagina anterior
        })
        .catch(error => {
          console.error('Error al ejecutar matriculaSeccion:', error);
        });
    }
  };

  const renderDepartamentos = () => {
    return departamentos.map((departamento) => (
      <div key={departamento} onClick={() => handleDepartamentoClick(departamento)}>
        {departamento}
      </div>
    ));
  };

  const renderClases = () => {
    const uniqueClases = Array.from(new Set(clasesDepartamento.map(clase => clase.nombre_clase)));

    return uniqueClases.map((clase) => (
      <div key={clase} onClick={() => handleClaseClick(clase)}>
        {clase}
      </div>
    ));
  };

  const renderSecciones = () => {
    return seccionesClase.map((seccion) => (
      <div key={seccion.id_seccion} onClick={() => handleSeccionClick(seccion.id_seccion)}>
        <div>Sección: {seccion.id_seccion}</div>
        <div>Docente: {seccion.nombres} {seccion.apellidos}</div>
        <div>Hora: {seccion.horainicio} - {seccion.horafin}</div>
      </div>
    ));
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <div>DEPARTAMENTOS</div>
          {renderDepartamentos()}
        </div>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <div>CLASE</div>
          {selectedDepartamento && (
            <div>{renderClases()}</div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div>SECCIONES</div>
          {selectedClase && (
            <div>{renderSecciones()}</div>
          )}
        </div>
      </div>

      {/* Tarjeta para mostrar el mensaje del backend */}
      {backendMessage && (
        <div className={`alert alert-${backendMessage === 'El estudiante cumple con los requisitos para la clase solicitada' ? 'success' : 'danger'}`} role="alert">
          {backendMessage}
        </div>
      )}

      <button onClick={handleMatriculaClick} disabled={!requisitosCumplidos}>
        Matricular
      </button>
    </div>
  );
};

export default MatriculaComponent;
