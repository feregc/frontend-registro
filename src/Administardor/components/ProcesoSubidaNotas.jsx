import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, differenceInSeconds } from "date-fns";
import es from 'date-fns/locale/es'
import { validacionSubidaNotas } from "../helpers/validacionSubidaNotas";
// import { useNavigate } from "react-router-dom";


export const ProcesoSubidaNotas = ({ onCrear }) => {
    const [selectedYear, setSelectedYear] = useState(null); //si 
    const [selectedPeriodo, setSelectedPeriodo] = useState(""); //si 
    const [fechaInicio1, setFechaInicio1] = useState(null); //si 
    const [fechaInicio2, setFechaInicio2] = useState(null); //SI
    const [errors, setErrors] = useState({});

    //   const navigate = useNavigate();

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

        const err = validacionSubidaNotas(formState);
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
            fetch("http://localhost:8081/proceso-subir-notas-crear", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    console.log("Creado con exito");
                    alert("Registrado con exito");
                    //   navigate("/administrador/home");
                    setSelectedYear('');
                    setSelectedPeriodo('');
                    setFechaInicio1('');
                    setFechaInicio2('');
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


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>Formulario para proceso subida de notas</h3>
                    <hr />
                    <div>
                        <label>Año:</label>
                        <DatePicker
                            selected={selectedYear}
                            dateFormat="yyyy"
                            showYearPicker
                            showMonthDropdown={false}
                            scrollableYearDropdown
                            onChange={handleYearChange}
                        />
                        <div>
                            <label htmlFor="periodo">Seleccione el periodo:</label>
                            <select id="periodo" value={selectedPeriodo} onChange={handlePeriodoChange}>
                                <option value="">Opciones</option>
                                <option value="I-PAC">I-PAC</option>
                                <option value="II-PAC">II-PAC</option>
                                <option value="III-PAC">III-PAC</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    <hr />
                    <div>
                        <label htmlFor="fecha1">Fecha de inicio:</label>
                        <DatePicker
                            id="fecha1"
                            dateFormat="dd/MM/yyyy"
                            showYearDropdown
                            scrollableYearDropdown
                            selected={fechaInicio1}
                            onChange={handleFechaInicio1Change}
                        />
                    </div>
                    <hr />
                    <div>
                        <label htmlFor="fecha2">Fecha de finalización:</label>
                        <DatePicker
                            id="fecha2"
                            dateFormat="dd/MM/yyyy"
                            showYearDropdown
                            scrollableYearDropdown
                            selected={fechaInicio2}
                            onChange={handleFechaInicio2Change}
                        />
                    </div>
                    <hr />
                </div>
                <button type="submit">Crear</button>
            </form>
        </>
    );
};