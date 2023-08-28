import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, differenceInSeconds } from "date-fns";
import "../../Assets/styles/styles-admin/Admin-aux.css";
import es from 'date-fns/locale/es'
import { validacionProce } from "../helpers/validacionProce";
import { useNavigate } from "react-router-dom";
import { validacionProceCarga } from "../helpers/validacionProcesoCarga";

registerLocale('es', es)

export const FormProcesoCarga = ({ onCrear }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedPeriodo, setSelectedPeriodo] = useState("");
  const [fechaInicio1, setFechaInicio1] = useState(null);
  const [fechaInicio2, setFechaInicio2] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const formState = {
    anio: selectedYear,
    periodo: selectedPeriodo,
    fechainicioI: fechaInicio1,
    fechainicioII: fechaInicio2,
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
  
  const handleFechaInicio1Change = (date) => {
    const currentDate = new Date();
    if (date >= currentDate) {
      setFechaInicio1(date);
    }
  };

  const handleFechaInicio2Change = (date) => {
    if (date > fechaInicio1) {
      setFechaInicio2(date);
    }
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validacionProceCarga(formState);
    console.log(err);
    if (err === null) {
      setErrors({});
      const formData = {
        anio: selectedYear.toISOString().slice(0, 19).replace("T", " "),
        periodo: selectedPeriodo,
        fechainicioI: fechaInicio1.toISOString().slice(0, 19).replace("T", " "),
        fechainicioII: fechaInicio2.toISOString().slice(0, 19).replace("T", " "),
      };
      console.log(formData);
      // Realizar la solicitud HTTP para enviar los datos al endpoint
      fetch("http://localhost:8081/insertarprocesoCarga", {
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
          Atrás
        </button>
          <div className="row my-2">
            <div className="col">
              
              <h3 className="my-2">Formulario para Proceso de Carga Académica</h3>
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
                <label htmlFor="periodo">Seleccione el Período:</label>
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
                  <option value="I-SEMESTRE">I-SEMESTRE</option>
                  <option value=" II-SEMESTRE">II-SEMESTRE</option>
                </select>
                {errors.periodo && (
                  <div className="alert col-6 alert-danger py-1 my-2 px-5" role="alert">
                    {errors.periodo}
                  </div>
                )}
              </div>
            </div>
            
            <div className="row my-2">
              <div className="col-3">
                <label htmlFor="fecha1">Fecha de Inicio:</label>
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
              <div className="col-3">
                <label htmlFor="fecha1">Fecha de Fin:</label>
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