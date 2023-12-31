import React, { useState } from "react";
export const CardProcMatricula = ({ onBorrar, procesos }) => {
  const { anio, periodo, fechainicioI, fechainicioIIIII } = procesos;
  const [disponibilidad, setDisponibilidad] = useState(procesos.disponibilidad);

  const handleActivar = () => {
    const updatedProceso = {
      id: procesos.id,
      disponibilidad: 1, // Activar el proceso
    };

    fetch(`http://localhost:8081/proceso-actualizar/${procesos.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProceso),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Disponibilidad actualizada correctamente');
        setDisponibilidad(1); // Actualizar el estado local de disponibilidad
        // Aquí puedes realizar las acciones adicionales necesarias después de activar el proceso
      })
      .catch((error) => {
        console.error('Error al actualizar la disponibilidad:', error);
        // Manejo del error si la actualización falla
      });
  };

  const handleDesactivar = () => {
    const updatedProceso = {
      id: procesos.id,
      disponibilidad: 0, // Desactivar el proceso
    };

    fetch(`http://localhost:8081/proceso-actualizar/${procesos.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProceso),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Disponibilidad actualizada correctamente');
        setDisponibilidad(0); // Actualizar el estado local de disponibilidad
        // Aquí puedes realizar las acciones adicionales necesarias después de desactivar el proceso
      })
      .catch((error) => {
        console.error('Error al actualizar la disponibilidad:', error);
        // Manejo del error si la actualización falla
      });
  };


  const a = new Date(anio).toISOString().split("T")[0];
  const aa = new Date(a);
  const aaa = aa.getUTCFullYear();
  const fechaInicio = new Date(fechainicioI).toISOString().split("T")[0];
  const fechaFin = new Date(fechainicioIIIII).toISOString().split("T")[0];
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card mb-2">
              <div className="card-body">
                <p>
                  Periodo: {periodo} {aaa}
                </p>
                <p>Fecha inicio: {fechaInicio}</p>
                <p>Fecha fin: {fechaFin}</p>
                {disponibilidad === 0 ? (
                  <>
                    <div className="alert alert-warning" role="alert">
                      Proceso Desactivado
                    </div>
                    <button className="btn btn-primary" onClick={handleActivar}>Activar</button>
                  </>
                ) : (
                  <>
                    <div className="alert alert-success" role="alert">
                      Proceso Activado
                    </div>
                    <button className="btn btn-primary" onClick={handleDesactivar}>Desactivar</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};