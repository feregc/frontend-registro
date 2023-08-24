import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFetchs } from "../Helpers/useFetchs";

const FormularioCrearClases = () => {
  const [selectedDias, setSelectedDias] = useState("");
  const [selectedEdificio, setselectedEdificio] = useState("");
  const [selectedDocente, setSelectedDocente] = useState("");
  const [selectedAula, setSelectedAula] = useState("");
  const [selectedClase, setSelectedClase] = useState("");
  const [cuposDisponibles, setCuposDisponibles] = useState("");
  const [docente, setDocente] = useState([]);
  const [centro, setCentro] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedPeriodo, setSelectedPeriodo] = useState("");


  useEffect(() => {
    const id = localStorage.getItem("id");

    const fetchDocente = async () => {
      try {
        const response = await fetch(`http://localhost:8081/docente/${id}`);
        const jsonData = await response.json();

        setDocente(jsonData);
      } catch (error) {
        console.error("Error al obtener los datos del docente:", error);
      }
    };

    fetchDocente();
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("id");

    const fetchDocente = async () => {
      try {
        const response = await fetch(`http://localhost:8081/docente/${id}`);
        const jsonData = await response.json();

        setDocente(jsonData);
      } catch (error) {
        console.error("Error al obtener los datos del docente:", error);
      }
    };

    fetchDocente();
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("id");

    const fetchDocente = async () => {
      try {
        const response = await fetch(`http://localhost:8081/carrerById/${id}`);
        const jsonData = await response.json();
        setCentro(jsonData);
      } catch (error) {
        console.error("Error al obtener la carrera del docente:", error);
      }
    };

    fetchDocente();
  }, []);

  const { edificios, clases, docentes, aulas } = useFetchs(
    docente[0]?.carrera,
    centro[0]?.nombre_centro
  );

  // const memoizedDocente = useMemo(() => docente, [docente]);

  const handleYearChange = (year) => {
    const currentYear = new Date().getFullYear();
    const selectedYear = year.getFullYear();

    if (selectedYear >= currentYear) {
      setSelectedYear(year);
    }
  };

  const handleClaseChange = (event) => {
    setSelectedClase(event.target.value);
  };

  const handleDocenteChange = (event) => {
    setSelectedDocente(event.target.value);
  };

  const handleEdificioChange = (event) => {
    setselectedEdificio(event.target.value);
  };

  const handleAulaChange = (event) => {
    setSelectedAula(event.target.value);
  };

  const handleDiasChange = (event) => {
    setSelectedDias(event.target.value);
  };

  const handleCuposChange = (event) => {
    setCuposDisponibles(event.target.value);
  };

  const handlePeriodoChange = (e) => {
    setSelectedPeriodo(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      id_clase: parseInt(selectedClase),
      num_empleado: parseInt(selectedDocente),
      id_aula: parseInt(selectedAula),
      dias: selectedDias,
      cupos: cuposDisponibles,
      id_edificio: parseInt(selectedEdificio),
      anio: selectedYear.toISOString().slice(0, 19).replace("T", " "),
      periodo: selectedPeriodo,
    };

    console.log(formData);

    fetch("http://localhost:8081/crearproceso", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Sección creada con éxito");
      })
      .catch((error) => {
        console.error("Error al crear la sección:", error);
      });
  };

  const regresar = () => {
    window.history.back();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <button className="btn btn-success mt-4" onClick={regresar}>
            Atras
          </button>
          <div className="row">
            <div className="col">
              <br />
              <br />
              <div className="d-flex justify-content-center">
                <h3>Formulario crear secciones</h3>
              </div>
              <br />
            </div>
          </div>
          <div className="row my-2">
            <div className="col-6">
              <label htmlFor="clase">Seleccione la clase:</label>
              <select
                className="form-control my-2"
                id="clase"
                value={selectedClase}
                onChange={handleClaseChange}
              >
                <option value="">Opciones</option>
                {clases.map((clase) => (
                  <option key={clase.id_clase} value={clase.id_clase}>
                    {clase.nombre_clase}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="docente">Seleccione el docente:</label>
              <select
                className="form-control my-2"
                id="docente"
                value={selectedDocente}
                onChange={handleDocenteChange}
              >
                <option value="">Opciones</option>
                {docentes.map((docente) => (
                  <option
                    key={docente.num_empleado}
                    value={docente.num_empleado}
                  >
                    {docente.nombres} {docente.apellidos}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row my-2">
            <div className="col-6">
              <label htmlFor="edificio">Seleccione el edificio:</label>
              <select
                className="form-control my-2"
                id="edificio"
                value={selectedEdificio}
                onChange={handleEdificioChange}
              >
                <option value="">Opciones</option>
                {edificios.map((edificio) => (
                  <option
                    key={edificio.id_edificio}
                    value={edificio.id_edificio}
                  >
                    {edificio.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="aulas">Aulas disponibles:</label>
              <select
                className="form-control my-2"
                id="aulas"
                value={selectedAula}
                onChange={handleAulaChange}
              >
                <option value="">Opciones</option>
                {aulas.map((aula) => (
                  <option key={aula.id_aula} value={aula.id_aula}>
                    {/* {aula.nombre} - {aula.num_aula} - Hi:{aula.horainicio} - Hf:{aula.horafin} */}
                    {aula.num_aula} - Hi:{aula.horainicio} - Hf:
                    {aula.horafin}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row my-2">
            <div className="col-6">
              <label htmlFor="dias">Seleccione los dias:</label>
              <select
                className="form-control my-2"
                id="dias"
                value={selectedDias}
                onChange={handleDiasChange}
              >
                <option value="">Opciones</option>
                <option value="LuMaMiJuVi">LuMaMiJuVi</option>
                <option value="LuMaMiJu">LuMaMiJu</option>
                <option value="LuMaMi">LuMaMi</option>
                {/* <option value="4">Sa</option> */}
              </select>
            </div>
            <div className="col-6">
              <label>Cupos disponibles</label>
              <input
                className="form-control my-2"
                type="number"
                value={cuposDisponibles}
                onChange={handleCuposChange}
                placeholder="Ingrese el número de cupos disponibles"
              />
            </div>
          </div>
          {/* Desde aqui */}
          <div className="row my-2">
            <div className="col-3">
              <label>Año:</label>
            </div>
            <div className="col-9">
              <DatePicker
                className="f-w form-control"
                selected={selectedYear}
                dateFormat="yyyy"
                showYearPicker
                showMonthDropdown={false}
                scrollableYearDropdown
                onChange={handleYearChange}
                locale="es"
              />
            </div>

          </div>
          {/* fila2 */}
          <div className="row my-2">
            <div className="col-3">
              <label htmlFor="periodo">Seleccione el periodo:</label>
            </div>
            <div className="col-9">
              <select
                className="f-w form-control"
                id="periodo"
                value={selectedPeriodo}
                onChange={handlePeriodoChange}
              >
                <option value="">Opciones</option>
                <option value="I-PAC">I-PAC</option>
                <option value="II-PAC">II-PAC</option>
                <option value="III-PAC">III-PAC</option>
              </select>
            </div>
          </div>
          {/* Hasta aqui */}

          <div className="my-4 d-flex justify-content-center">
            <button className="btn btn-w btn-primary" type="submit">
              Agregar seccion
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormularioCrearClases;
