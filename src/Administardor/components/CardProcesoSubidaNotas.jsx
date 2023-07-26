import React, { useState } from "react";

export const CardProcesoSubidaNotas = ({ onBorrar, procesos }) => {
  const { anio, periodo, fechainicioI, fechainicioII } = procesos;
  const [disponibilidad, setDisponibilidad] = useState(procesos.disponibilidad);

  const handleActivar = () => {
    const updatedProceso = {
      id: procesos.id,
      disponibilidad: 1, // Activar el proceso
    };

    fetch(
      `http://localhost:8081/proceso-subir-notas-actualizar/${procesos.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProceso),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Disponibilidad actualizada correctamente");
        setDisponibilidad(1); // Actualizar el estado local de disponibilidad
        // Aquí puedes realizar las acciones adicionales necesarias después de activar el proceso
      })
      .catch((error) => {
        console.error("Error al actualizar la disponibilidad:", error);
        // Manejo del error si la actualización falla
      });
  };

  const handleDesactivar = () => {
    const updatedProceso = {
      id: procesos.id,
      disponibilidad: 0, // Desactivar el proceso
    };

    fetch(
      `http://localhost:8081/proceso-subir-notas-actualizar/${procesos.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProceso),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Disponibilidad actualizada correctamente");
        setDisponibilidad(0); // Actualizar el estado local de disponibilidad
        // Aquí puedes realizar las acciones adicionales necesarias después de desactivar el proceso
      })
      .catch((error) => {
        console.error("Error al actualizar la disponibilidad:", error);
        // Manejo del error si la actualización falla
      });
  };

  const a = new Date(anio).toISOString().split("T")[0];
  const aa = new Date(a);
  const aaa = aa.getUTCFullYear();
  const fechaInicioI = new Date(fechainicioI).toISOString().split("T")[0];
  const fechaInicioII = new Date(fechainicioII).toISOString().split("T")[0];

  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <p>
            Periodo: {periodo} {aaa}
          </p>
          <p>Fecha inicio: {fechaInicioI}</p>
          <p>Fecha fin: {fechaInicioII}</p>

          {disponibilidad === 0 ? (
            <>
              <div className="alert alert-warning" role="alert">
                Proceso Desactivado
              </div>
              <button className="btn btn-w btn-primary" onClick={handleActivar}>
                Activar
              </button>
            </>
          ) : (
            <>
              <div className="alert alert-success" role="alert">
                Proceso Activado
              </div>
              <button className="btn btn-w btn-primary" onClick={handleDesactivar}>
                Desactivar
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};