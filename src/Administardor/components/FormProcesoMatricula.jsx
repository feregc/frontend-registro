import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, differenceInSeconds } from "date-fns";
import "../../Assets/styles/styles-admin/Admin-aux.css";
import es from 'date-fns/locale/es'
import { validacionProce } from "../helpers/validacionProce";
import { useNavigate } from "react-router-dom";

registerLocale('es', es)

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
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const formState = {
    anio: selectedYear,
    periodo: selectedPeriodo,
    horainicio: selectedHoraInicio,
    horafin: selectedHoraFin,
    indiceI: restriccion1,
    fechainicioI: fechaInicio1,
    indiceII: restriccion2,
    fechainicioII: fechaInicio2,
    indiceIII: restriccion3,
    fechainicioIII: fechaInicio3,
    indiceIIII: restriccion4,
    fechainicioIIII: fechaInicio4,
    indiceIIIII: restriccion5,
    fechainicioIIIII: fechaInicio5,
  };
  const handleYearChange = (year) => {
    const currentYear = new Date().getFullYear();
    const selectedYear = year.getFullYear();

    if (selectedYear >= currentYear) {
      setSelectedYear(year);
    }
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
    const currentDate = new Date();
    if (date >= currentDate) {
      setFechaInicio1(date);
    }
  };

  const handleRestriccion2Change = (e) => {
    setRestriccion2(e.target.value);
  };

  const handleFechaInicio2Change = (date) => {
    if (date > fechaInicio1) {
      setFechaInicio2(date);
    }
  };

  const handleRestriccion3Change = (e) => {
    setRestriccion3(e.target.value);
  };

  const handleFechaInicio3Change = (date) => {
    if (date > fechaInicio2) {
      setFechaInicio3(date);
    }
  };

  const handleRestriccion4Change = (e) => {
    setRestriccion4(e.target.value);
  };

  const handleFechaInicio4Change = (date) => {
    if (date > fechaInicio3) {
      setFechaInicio4(date);
    }
  };

  const handleRestriccion5Change = (e) => {
    setRestriccion5(e.target.value);
  };

  const handleFechaInicio5Change = (date) => {
    if (date > fechaInicio4) {
      setFechaInicio5(date);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validacionProce(formState);
    console.log(err);
    if (err === null) {
      setErrors({});
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
          alert("Registrado con exito");
          navigate("/administrador/home");
          console.log(response);
          onCrear("Creado con exito");
        })
        .catch((error) => {
          console.log(error);
          console.log("Error al crear");
          onCrear("Error al crear");
        });
    } else {
      setErrors(err)
    }


  };

  const regresar = () => {
    window.history.back();
  };

  return (
    <>
      {/* <div className="container">
        <div className="row my-2">
          <div className="col"> */}
      <form onSubmit={handleSubmit}>
        <div className="container">
        <button className="btn btn-success my-4" onClick={regresar}>
          Atras
        </button>
          <div className="row my-2">
            <div className="col">
              
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
                  locale="es"
                />
                {errors.anio && (
                <div className="alert col-6 alert-danger py-1 my-2 px-5" role="alert">
                  {errors.anio}
                </div>
              )}
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
                {errors.periodo && (
                  <div className="alert col-6 alert-danger py-1 my-2 px-5" role="alert">
                    {errors.periodo}
                  </div>
                )}
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
                  locale="es"
                />
                {errors.horainicio && (
                  <div className="alert col-6 alert-danger py-1 my-2 px-5" role="alert">
                    {errors.horainicio}
                  </div>
                )}
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
                  locale="es"
                />
                {errors.horafin && (
                  <div className="alert col-6 alert-danger py-1 my-2 px-5" role="alert">
                    {errors.horafin}
                  </div>
                )}
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
                {errors.indiceI && (
                  <div className="alert col-6 alert-danger py-1 my-2 px-5" role="alert">
                    {errors.indiceI}
                  </div>
                )}
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
                  locale="es"
                />
                {errors.fechainicioI && (
                  <div className="alert col-6 alert-danger py-1 my-2 px-5" role="alert">
                    {errors.fechainicioI}
                  </div>
                )}
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
                  placeholder="Ingrese el indice de la restricción 2"
                  value={restriccion2}
                  onChange={handleRestriccion2Change}
                />
                {errors.indiceII && (
                  <div className="alert col-6 alert-danger py-1 my-2 px-5" role="alert">
                    {errors.indiceII}
                  </div>
                )}
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
                  locale="es"
                />
                {errors.fechainicioII && (
                  <div className="alert col-6 alert-danger py-1 my-2 px-5" role="alert">
                    {errors.fechainicioII}
                  </div>
                )}
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
                  placeholder="Ingrese el indice de la restricción 3"
                  value={restriccion3}
                  onChange={handleRestriccion3Change}
                />
                {errors.indiceIII && (
                  <div className="alert col-6 alert-danger py-1 my-2 px-5" role="alert">
                    {errors.indiceIII}
                  </div>
                )}
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
                  locale="es"
                />
                {errors.fechainicioIII && (
                  <div className="alert col-6 alert-danger py-1 my-2 px-5" role="alert">
                    {errors.fechainicioIII}
                  </div>
                )}
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
                  placeholder="Ingrese el indice de la restricción 4"
                  value={restriccion4}
                  onChange={handleRestriccion4Change}
                />
                {errors.indiceIIII && (
                  <div className="alert col-6 alert-danger py-1 my-2 px-5" role="alert">
                    {errors.indiceIIII}
                  </div>
                )}
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
                  locale="es"
                />
                {errors.fechainicioIIII && (
                  <div className="alert col-6 alert-danger py-1 my-2 px-5" role="alert">
                    {errors.fechainicioIIII}
                  </div>
                )}
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
                  placeholder="Ingrese el indice de la restricción 5"
                  value={restriccion5}
                  onChange={handleRestriccion5Change}

                />
                {errors.indiceIIIII && (
                  <div className="alert col-6 alert-danger py-1 my-2 px-5" role="alert">
                    {errors.indiceIIIII}
                  </div>
                )}
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
                  locale="es"
                />
                {errors.fechainicioIIIII && (
                  <div className="alert col-6 alert-danger py-1 my-2 px-5" role="alert">
                    {errors.fechainicioIIIII}
                  </div>
                )}
              </div>
            </div>
            <div className="row d-flex justify-content-center my-2">
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