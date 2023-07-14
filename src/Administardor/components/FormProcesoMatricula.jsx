import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "../../Assets/styles/styles-admin/Admin-aux.css";

export const FormProcesoMatricula = ({ onCrear }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedPeriodo, setSelectedPeriodo] = useState("");
  const [selectedHoraInicio, setSelectedHoraInicio] = useState(null);
  const [selectedHoraFin, setSelectedHoraFin] = useState(null);
  const [restriccion1, setRestriccion1] = useState("");
  const [fechaInicio1, setFechaInicio1] = useState(null);
  const [restriccion2, setRestriccion2] = useState("");
  const [fechaInicio2, setFechaInicio2] = useState(null);
  const [restriccion3, setRestriccion3] = useState("");
  const [fechaInicio3, setFechaInicio3] = useState(null);
  const [restriccion4, setRestriccion4] = useState("");
  const [fechaInicio4, setFechaInicio4] = useState(null);
  const [restriccion5, setRestriccion5] = useState("");
  const [fechaInicio5, setFechaInicio5] = useState(null);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handlePeriodoChange = (e) => {
    setSelectedPeriodo(e.target.value);
  };

  const handleHoraInicioChange = (horaInicio) => {
    setSelectedHoraInicio(horaInicio);
  };

  const handleHoraFinChange = (horaFin) => {
    setSelectedHoraFin(horaFin);
  };

  const handleRestriccion1Change = (e) => {
    setRestriccion1(e.target.value);
  };

  const handleFechaInicio1Change = (date) => {
    setFechaInicio1(date);
  };

  const handleRestriccion2Change = (e) => {
    setRestriccion2(e.target.value);
  };

  const handleFechaInicio2Change = (date) => {
    setFechaInicio2(date);
  };

  const handleRestriccion3Change = (e) => {
    setRestriccion3(e.target.value);
  };

  const handleFechaInicio3Change = (date) => {
    setFechaInicio3(date);
  };

  const handleRestriccion4Change = (e) => {
    setRestriccion4(e.target.value);
  };

  const handleFechaInicio4Change = (date) => {
    setFechaInicio4(date);
  };

  const handleRestriccion5Change = (e) => {
    setRestriccion5(e.target.value);
  };

  const handleFechaInicio5Change = (date) => {
    setFechaInicio5(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      anio: selectedYear.toISOString().slice(0, 19).replace("T", " "),
      periodo: selectedPeriodo,
      horainicio: selectedHoraInicio
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      horafin: selectedHoraFin.toISOString().slice(0, 19).replace("T", " "),
      indiceI: parseInt(restriccion1),
      fechainicioI: fechaInicio1.toISOString().slice(0, 19).replace("T", " "),
      indiceII: parseInt(restriccion2),
      fechainicioII: fechaInicio2.toISOString().slice(0, 19).replace("T", " "),
      indiceIII: parseInt(restriccion3),
      fechainicioIII: fechaInicio3.toISOString().slice(0, 19).replace("T", " "),
      indiceIIII: parseInt(restriccion4),
      fechainicioIIII: fechaInicio4
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      indiceIIIII: parseInt(restriccion5),
      fechainicioIIIII: fechaInicio5
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
    };

    console.log(formData);

    // Realizar la solicitud HTTP para enviar los datos al endpoint
    fetch("http://localhost:8081/insertarproceso", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log("Creado con exito");
        console.log(response);
        onCrear("Creado con exito");
      })
      .catch((error) => {
        console.log(error);
        console.log("Error al crear");
        onCrear("Error al crear");
      });
  };

  return (
    <>
      {/* <div className="container">
        <div className="row my-2">
          <div className="col"> */}
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row my-2">
            <div className="col">
              <br />
              <h3 className="my-2">Formulario para proceso de Matricula</h3>
            </div>
            {/* fila1 */}
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
            {/* fila3 */}
            <div className="row my-2">
              <div className="col-3">
                <label>Hora inicio:</label>
              </div>
              <div className="col-9">
                <DatePicker
                  className="f-w form-control"
                  selected={selectedHoraInicio}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Hora"
                  dateFormat="HH:mm"
                  onChange={handleHoraInicioChange}
                />
              </div>
            </div>
            {/* fila3 */}
            <div className="row my-2">
              <div className="col-3">
                <label className="col-3">Hora fin:</label>
              </div>
              <div className="col-9">
                <DatePicker
                  className="col-9 f-w form-control"
                  selected={selectedHoraFin}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Hora"
                  dateFormat="HH:mm"
                  onChange={handleHoraFinChange}
                />
              </div>
            </div>
            {/* fila3 */}
            <div className="row">
              <br />
              <br />
              <h3 className="mt-5">Restricciones de indices</h3>
              <br />
              <h4 className="my-3">Restricción de inidices #1</h4>
              <div className="col-3">
                <label htmlFor="restricion1">Restrición 1:</label>
              </div>
              <div className="col-9">
                <input
                  className="f-w form-control"
                  type="number"
                  id="restricion1"
                  placeholder="Ingrese el indice de la restricción 1"
                  value={restriccion1}
                  onChange={handleRestriccion1Change}
                />
              </div>
            </div>
            {/* fila3 */}
            <div className="row my-2">
              <div className="col-3">
                <label htmlFor="fecha1">Fecha de inicio:</label>
              </div>
              <div className="col-9">
                <DatePicker
                  className="col-8 f-w form-control"
                  id="fecha1"
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  selected={fechaInicio1}
                  onChange={handleFechaInicio1Change}
                />
              </div>
            </div>
            {/* fila3 */}
            <div className="row my-2">
              <br />
              <h4 className="my-3">Restricción de inidices #2</h4>
              <div className="col-3">
                <label htmlFor="restricion1">Restrición 2:</label>
              </div>
              <div className="col-9">
                <input
                  className="f-w form-control"
                  type="number"
                  id="restricion2"
                  placeholder="Ingrese el indice de la restricción 1"
                  value={restriccion2}
                  onChange={handleRestriccion2Change}
                />
              </div>
            </div>
            {/* fila3 */}
            <div className="row my-2">
              <div className="col-3">
                <label htmlFor="fecha1">Fecha de inicio:</label>
              </div>
              <div className="col-9">
                <DatePicker
                  className="col-8 f-w form-control"
                  id="fecha1"
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  selected={fechaInicio2}
                  onChange={handleFechaInicio2Change}
                />
              </div>
            </div>
            {/* fila3 */}
            <div className="row my-2">
              <br />
              <h4 className="my-3">Restricción de inidices #3</h4>
              <div className="col-3">
                <label htmlFor="restricion1">Restrición 3:</label>
              </div>
              <div className="col-9">
                <input
                  className="f-w form-control"
                  type="number"
                  id="restricion3"
                  placeholder="Ingrese el indice de la restricción 1"
                  value={restriccion3}
                  onChange={handleRestriccion3Change}
                />
              </div>
            </div>
            {/* fila3 */}
            <div className="row my-2">
              <div className="col-3">
                <label htmlFor="fecha1">Fecha de inicio:</label>
              </div>
              <div className="col-9">
                <DatePicker
                  className="col-8 f-w form-control"
                  id="fecha1"
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  selected={fechaInicio3}
                  onChange={handleFechaInicio3Change}
                />
              </div>
            </div>
            {/* fila3 */}
            <div className="row my-2">
              <br />
              <h4 className="my-3">Restricción de inidices #4</h4>
              <div className="col-3">
                <label htmlFor="restricion1">Restrición 4:</label>
              </div>
              <div className="col-9">
                <input
                  className="f-w form-control"
                  type="number"
                  id="restricion4"
                  placeholder="Ingrese el indice de la restricción 1"
                  value={restriccion4}
                  onChange={handleRestriccion4Change}
                />
              </div>
            </div>
            {/* fila3 */}
            <div className="row my-2">
              <div className="col-3">
                <label htmlFor="fecha1">Fecha de inicio:</label>
              </div>
              <div className="col-9">
                <DatePicker
                  className="col-8 f-w form-control"
                  id="fecha1"
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  selected={fechaInicio4}
                  onChange={handleFechaInicio4Change}
                />
              </div>
            </div>
            {/* fila3 */}
            <div className="row my-2">
              <br />
              <h4 className="my-3">Restricción de inidices #5</h4>
              <div className="col-3">
                <label htmlFor="restricion1">Restrición 5:</label>
              </div>
              <div className="col-9">
                <input
                  className="f-w form-control"
                  type="number"
                  id="restricion4"
                  placeholder="Ingrese el indice de la restricción 1"
                  value={restriccion5}
                  onChange={handleRestriccion5Change}
                />
              </div>
            </div>
            {/* fila3 */}
            <div className="row my-2">
              <div className="col-3">
                <label htmlFor="fecha1">Fecha de inicio:</label>
              </div>
              <div className="col-9">
                <DatePicker
                  className="col-8 f-w form-control"
                  id="fecha1"
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  selected={fechaInicio5}
                  onChange={handleFechaInicio5Change}
                />
              </div>
            </div>
            <div className="row my-2">
              <div className="col">
                <button className="btn btn-w btn-success form-control" type="submit">
                  Crear
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
