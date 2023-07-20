
import React, { useEffect, useState } from 'react';
import { convertirFecha } from '../helpers/convertirFecha';

export const CancelarClase = () => {
  const id = localStorage.getItem('id');

  const [data, setData] = useState([]);
  const [clases, setClases] = useState([]);

  useEffect(() => {
    // Función para obtener los datos del endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/proceso-anio-periodo');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const fecha = convertirFecha(data[0]?.anio);
      const periodo = data[0]?.periodo;

      const obtenerClases = async () => {
        try {
          const response = await fetch(
            `http://localhost:8081/clases-matriculadas/${id}/${fecha}/${periodo}`
          );
          if (!response.ok) {
            throw new Error('Error al obtener las clases');
          }
          const jsonData = await response.json();
          setClases(jsonData);
        } catch (error) {
          console.log("Error:", error);
        }
      };

      obtenerClases();
    }
  }, [data, id]);

  const handleCancelarClase = async (num_cuenta, id_seccion) => {
    const confirmation = window.confirm('¿Estás seguro de que quieres cancelar esta clase?');

    if (confirmation) {
      try {
        const response = await fetch(`http://localhost:8081/eliminar-clase/${num_cuenta}/${id_seccion}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error al eliminar la clase');
        }

        // Actualizamos la lista de clases después de eliminar
        setClases((prevClases) => prevClases.filter((clase) => clase.id_seccion !== id_seccion));

        // Mostramos una alerta de éxito
        window.alert('Clase cancelada correctamente.');
      } catch (error) {
        console.log("Error al cancelar la clase:", error);
      }
    } else {
      // El usuario ha cancelado, no hacemos nada
    }
  };

  return (
    <div>
      <h2>Tabla de clases</h2>
      <table>
        <thead>
          <tr>
            <th>ID Sección</th>
            <th>Código</th>
            <th>Nombre Clase</th>
            <th>Días</th>
            <th>Hi</th>
            <th>Hf</th>
          </tr>
        </thead>
        <tbody>
          {clases.map((clase, index) => (
            <tr key={index}>
              <td>{clase.id_seccion}</td>
              <td>{clase.codigo}</td>
              <td>{clase.nombre}</td>
              <td>{clase.dias}</td>
              <td>{clase.horainicio}</td>
              <td>{clase.horafin}</td>

              <td><button onClick={() => handleCancelarClase(id, clase.id_seccion)}>Cancelar Clase</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
