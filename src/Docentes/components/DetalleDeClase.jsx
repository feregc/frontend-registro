import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

export const DetalleClase = () => {
  const { id } = useParams();
  const [alumno, setAlumno] = useState([]);
  const [clases, setClases] = useState([]);
  const [Clase, setClase] = useState(null);

  //Lista de alumnos
  const [valorInput, setValorInput] = useState(0);
  const [editar, setEditar] = useState(false);
  const [numCuenta, setNumCuenta] = useState(null);
  const num_empleado = localStorage.getItem("id");

  useEffect(() => {
    const fetchclase = async () => {
      try {
        const response = await fetch(`http://localhost:8081/clasealumno/${id}`);
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
      //Agrega correo
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Alumnos");
    XLSX.utils.sheet_add_aoa(worksheet, [
      ["Nombre", "Apellido", "Numero de cuenta"], //Agrega correo
    ]);
    XLSX.writeFile(workbook, `Lista_de_Estudiantes.xlsx`, {
      compression: true,
    });
  };
  // Obtener datos de la clase, enviando el id del docente
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const url = `http://localhost:8081/clasesdocentes/${num_empleado}`;
        const result = await fetch(url);
        const data = await result.json();
        setClases(data);
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

  return (
    <>
      <div className="container">
        <div className="col">
          <div className="row">
            <div className="d-flex justify-content-center my-3">
              <div>
                {Clase && (
                  <>
                  <br />
                    <h4>Clase: {Clase.nombre_clase}</h4>
                    <p>Seccion: {Clase.id_seccion}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6 my-3 d-flex justify-content-center">
              <button
                className="btn btn-w2 btn-success m-1"
                onClick={exportarAExcel}
              >
                Descargar lista de estudiantes
              </button>
            </div>
            <div className="col-6 my-3 d-flex justify-content-center">
              <Link to={`../subir-notas/${id}`}>
                <button className="btn btn-w2 btn-success m-1">Ingreso de Notas</button>
              </Link>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Número de Cuenta</th>
                  <th scope="col">Correo Institucional</th>
                </tr>
              </thead>
              <tbody>
                {alumno &&
                  alumno.length > 0 &&
                  alumno.map((dato, index) => (
                    <tr key={index}>
                      <th scope="row">{dato.primer_nombre} {" "} {dato.segundo_nombre}</th>
                      <th scope="row">{dato.primer_apellido} {" "} {dato.segundo_apellido}</th>
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
