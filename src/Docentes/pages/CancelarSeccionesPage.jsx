import React, { useState, useEffect } from 'react';

export const CancelarSeccionesPage = () => {
    const [clases, setClases] = useState([]);
    const [secciones, setSecciones] = useState([]);
    const [showSecciones, setShowSecciones] = useState(false);
    const [docenteData, setDocenteData] = useState([]);
  
    const fetchDocenteData = (docenteId) => {
      
      fetch(`http://localhost:8081/docente/${docenteId}`)
        .then((response) => response.json())
        .then((data) => {
          setDocenteData(data);
        })
        .catch((error) => {
          console.error('Error al obtener los datos del docente:', error);
        });
    };
  
    const fetchClases = () => {
      
      if (docenteData.length > 0 && docenteData[0].carrera_id) {
        fetch(`http://localhost:8081/clasesDisponibles/${docenteData[0].carrera_id}`)
          .then((response) => response.json())
          .then((data) => {
            setClases(data);
          })
          .catch((error) => {
            console.error('Error al obtener las clases:', error);
          });
      }
    };
  
    const mostrarSecciones = (idClase) => {
      
      fetch(`http://localhost:8081/seccionesDisponibles/${idClase}`)
        .then((response) => response.json())
        .then((data) => {
          setSecciones(data);
          setShowSecciones(true);
        })
        .catch((error) => {
          console.error('Error al obtener las secciones:', error);
        });
    };
  
    const eliminarSeccion = (idSeccion) => {
      console.log(idSeccion);
      
      fetch(`http://localhost:8081/eliminarseccion/${idSeccion}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log('Sección eliminada:', data);
          // Actualizar las secciones después de eliminar
          const updatedSecciones = secciones.filter((seccion) => seccion.id_seccion !== idSeccion);
          setSecciones(updatedSecciones);
          alert('Sección eliminada')
        })
        .catch((error) => {
          console.error('Error al eliminar la sección:', error);
          alert('Error al eliminar seccion')
        });
    };
  
    useEffect(() => {
      const docenteId = localStorage.getItem('id');
      if (docenteId) {
        fetchDocenteData(docenteId);
      }
    }, []);
  
    useEffect(() => {
      fetchClases();
    }, [docenteData]);
  
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Nombre de la Clase</th>
              <th>Ver</th>
            </tr>
          </thead>
          <tbody>
            {clases.map((clase) => (
              <tr key={clase.id_clase}>
                <td>{clase.nombre}</td>
                <td>
                  <button onClick={() => mostrarSecciones(clase.id_clase)}>Secciones</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {showSecciones && (
          <table>
            <thead>
              <tr>
                <th>#Sección</th>
                <th>Nombres</th>
                <th>Edificio</th>
                <th>Aula</th>
                <th>Hi</th>
                <th>Hf</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {secciones.map((seccion) => (
                <tr key={seccion.id_seccion}>
                  <td>{seccion.id_seccion}</td>
                  <td>{seccion.nombres} {seccion.apellidos}</td>
                  <td>{seccion.nombre_edificio}</td>
                  <td>{seccion.num_aula}</td>
                  <td>{seccion.horainicio}</td>
                  <td>{seccion.horafin}</td>
                  <td>
                    <button onClick={() => eliminarSeccion(seccion.id_seccion)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
};
