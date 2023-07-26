import React, { useEffect, useState } from "react";
import { convertirFecha } from "../helpers/convertirFecha";

export const CancelarClase = () => {
  const id = localStorage.getItem("id");

  const [data, setData] = useState([]);
  const [clases, setClases] = useState([]);

  useEffect(() => {
    // Función para obtener los datos del endpoint
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/proceso-anio-periodo"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
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
            throw new Error("Error al obtener las clases");
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
    const confirmation = window.confirm(
      "¿Estás seguro de que quieres cancelar esta clase?"
    );

    if (confirmation) {
      try {
        const response = await fetch(
          `http://localhost:8081/eliminar-clase/${num_cuenta}/${id_seccion}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Error al eliminar la clase");
        }

        // Actualizamos la lista de clases después de eliminar
        setClases((prevClases) =>
          prevClases.filter((clase) => clase.id_seccion !== id_seccion)
        );

        // Mostramos una alerta de éxito
        window.alert("Clase cancelada correctamente.");
        
      } catch (error) {
        console.log("Error al cancelar la clase:", error);
      }
    } else {
      // El usuario ha cancelado, no hacemos nada
    }
  };

  return (
    <div className="container">
      <div className="row my-3">
        <div className="col">
          <div className="d-flex justify-content-center my-3">
            <h2>Tabla de clases</h2>
          </div>
          <div className="row">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">ID Sección</th>
                  <th scope="col">Código</th>
                  <th scope="col">Nombre Clase</th>
                  <th scope="col">Días</th>
                  <th scope="col">Hi</th>
                  <th scope="col">Hf</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clases.map((clase, index) => (
                  <tr key={index}>
                    <td scope="col">{clase.id_seccion}</td>
                    <td scope="col">{clase.codigo}</td>
                    <td scope="col">{clase.nombre}</td>
                    <td scope="col">{clase.dias}</td>
                    <td scope="col">{clase.horainicio}</td>
                    <td scope="col">{clase.horafin}</td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-success my-2"
                          onClick={() =>
                            handleCancelarClase(id, clase.id_seccion)
                          }
                        >
                          Cancelar Clase
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
