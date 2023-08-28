import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { verificarFecha } from "../Helpers/api";
import * as XLSX from "xlsx";

export const DetalleClase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alumno, setAlumno] = useState([]);
  const [clases, setClases] = useState([]);
  const [Clase, setClase] = useState(null);
  const [ClaseINFO, setClaseINFO] = useState([]);
  const num_empleado = localStorage.getItem("id");

  useEffect(() => {
    const fetchclase = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/estudiantes-seccion/${id}`
        );
        const jsonData = await response.json();

        setAlumno(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchclase();
  }, []);

  const exportarAExcel = () => {
    const rows = alumno.map((alumno) => ({
      nombre: alumno.primer_nombre,
      apellido: alumno.primer_apellido,
      cuenta: alumno.num_cuenta,
      correo: alumno.correo_institucional,
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Alumnos");
    XLSX.utils.sheet_add_aoa(worksheet, [
      ["Nombre", "Apellido", "Numero de cuenta", "Correo institucional"], //Agrega correo
    ]);
    XLSX.writeFile(workbook, `Lista_de_Estudiantes.xlsx`, {
      compression: true,
    });
  };

  // Obtener datos de la clase, enviando el id del docente
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const url = `http://localhost:8081/clasesdocentes/${num_empleado}/${id}`;
        const result = await fetch(url);
        const data = await result.json();
        setClaseINFO(data);
       // console.log(data)
      } catch (error) {
        console.log("Error:", error);
      }
    };
    obtenerDatos();
  }, []);

  // Validar entrada de notas
  useEffect(() => {
    if (clases.length > 0) {
      const buscar = clases.find((clase) => clase.id_clase === parseInt(id));
      setClase(buscar || null);
    }
  }, [clases, id]);

  // ir a subir notas
  const irAsubirNota = () => {
    navigate("../subir-notas", { state: id });
  };

  // Verificar si esta activo el proceos de subir notas notas
  const [fechaSubirNota, setFechaSubirNota] = useState(false);
  const [datosDeFecha, setDatosDeFecha] = useState([]);

  useEffect(() => {
    const obtenerFecha = async () => {
      try {
        const url = `http://localhost:8081/proceso_subir_notas_disponibilidad`;
        const result = await fetch(url);
        const data = await result.json();
        setDatosDeFecha(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    obtenerFecha();
  }, []);

  useEffect(() => {
    const habilitarSubidaDeNotas = () => {
      if (datosDeFecha && datosDeFecha.length > 0) {
        const fechaInicio = datosDeFecha[0].fechainicioI;
        const fechaFin = datosDeFecha[0].fechainicioII;
        const fechaActual = new Date();
        const dia = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1;
        const anio = fechaActual.getFullYear();
        const fechaEntrada = `${anio}-${mes}-${dia}`;
        // const fechaEntrada = "2023-08-25";
        if (
          verificarFecha(fechaInicio, fechaFin, fechaEntrada) &&
          datosDeFecha[0].disponibilidad === 1
        ) {
          setFechaSubirNota(false);
        } else {
          setFechaSubirNota(true);
        }
      } else {
        setFechaSubirNota(true);
      }
    };

    habilitarSubidaDeNotas();
  }, [datosDeFecha]);

  //console.log(datosDeFecha)
  const regresar = () => {
    navigate("../home");
  };

  return (
    <>
      <div className="container">
        {/* Boton para regresar a la paguina anterior */}
        <button className="btn btn-success my-4" onClick={regresar}>
          Atrás
        </button>
        <div className="col">
          <div className="row">
            <div className="d-flex justify-content-center my-1">
              <div>
              <div className="col">
                      <div className="d-flex justify-content-center my-3">
                        <h4>Clase: {ClaseINFO[0]?.nombre_clase}</h4>
                      </div>
                      <div className="d-flex justify-content-center my-3">
                        <h5>Sección: {ClaseINFO[0]?.id_seccion}</h5>
                      </div>
                    </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6 my-3 d-flex justify-content-center">
              <button
                className="btn btn-w2 btn-success m-1"
                onClick={exportarAExcel}
              >
                Descargar Lista
              </button>
            </div>
            <div className="col-6 my-3 d-flex justify-content-center">
              {/* disabled={fechaSubirNota} */}
              <button
                disabled={fechaSubirNota}
                onClick={irAsubirNota}
                className="btn btn-w2 btn-success m-1"
              >
                Ingreso de Notas
              </button>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center">Nombre</th>
                  <th scope="col" className="text-center">Apellido</th>
                  <th scope="col" className="text-center">Número de Cuenta</th>
                  <th scope="col" className="text-center">Correo Institucional</th>
                </tr>
              </thead>
              <tbody>
                {alumno &&
                  alumno.length > 0 &&
                  alumno.map((dato, index) => (
                    <tr key={index}>
                      <th scope="row">
                        {dato.primer_nombre} {dato.segundo_nombre}
                      </th>
                      <th scope="row">
                        {dato.primer_apellido} {dato.segundo_apellido}
                      </th>
                      <th scope="row">{dato.num_cuenta}</th>
                      <th scope="row">{dato.correo_institucional}</th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
