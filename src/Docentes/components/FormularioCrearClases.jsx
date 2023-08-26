import React, { useEffect, useMemo, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useFetchs } from "../Helpers/useFetchs";
import "../../Assets/styles/styles-docentes/Docente-home.css";
import { json, useNavigate } from "react-router-dom";
import { HorasInicioFin } from '../Helpers/convertirFecha'

const FormularioCrearClases = () => {

  const [centro, setCentro] = useState([]);
  const navigate = useNavigate();
  // ------------------------
  const { horas, minutos } = HorasInicioFin();
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [horaInicial, setHoraInicial] = useState("00");
  const [minutosInicial, setMinutosInicial] = useState("00");
  const [horaFinal, setHoraFinal] = useState("00");
  const [minutosFinal, setMinutosFinal] = useState("00");
  const [docente, setDocente] = useState([]);
  const [selectedClase, setSelectedClase] = useState("");
  const [selectedEdificio, setselectedEdificio] = useState("");
  const [selectedAula, setSelectedAula] = useState("");
  const [cuposDisponibles, setCuposDisponibles] = useState("");
  const [selectedDocente, setSelectedDocente] = useState("");
  const [aulas, setAulas] = useState([])
  const [docenteLibre, setDocenteLibre] = useState(false);

  const { edificios, clases, docentes } = useFetchs(
    docente[0]?.carrera,
    centro[0]?.nombre_centro
  );

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

  const traerAulas = async () => {
    const diasC = checkboxValues.join('');
    try {
      const response = await fetch(`http://localhost:8081/consulta-aula?id_edificio=${parseInt(selectedEdificio)}&horainicio=${horaInicial}:${minutosInicial}&horafin=${horaFinal}:${minutosFinal}&dias=${diasC}`);
      const jsonData = await response.json();

      setAulas(jsonData);

    } catch (error) {
      console.error("Error al obtener los datos del docente:", error);
    }
  }
  const verificarDocente = async () => {
    try {
      const response = await fetch(`http://localhost:8081/verificarHorarioDocente?num_empleado=${parseInt(selectedDocente)}&horaInicial=${horaInicial}&minutoInicial=${minutosInicial}&horaFinal=${horaFinal}&minutoFinal=${minutosFinal}`);
      const jsonData = await response.json();

      setDocenteLibre(jsonData);
      // console.log(jsonData)
    } catch (error) {
      console.error("Error al obtener los datos del docente:", error);
    }
  }

  useEffect(() => {
    traerAulas()
  }, [selectedEdificio, , horaInicial, minutosInicial, horaFinal, minutosFinal, checkboxValues]);

  useEffect(() => {
    verificarDocente()
  }, [horaInicial, minutosInicial, horaFinal, minutosFinal, selectedDocente])


  const buscarClasePorId = (clasesArray, idClase) => {
    return clasesArray.find((clase) => clase.id_clase === parseInt(idClase));
  };

  // Valida que las horas coincidan con las UV
  const validarHorario = () => {
    const temp = buscarClasePorId(clases, selectedClase);
    const unidadesValorativas = temp?.unidades_valo;

    const horasInicio = parseInt(horaInicial, 10);
    const minutosInicio = parseInt(minutosInicial, 10);
    const horasFin = parseInt(horaFinal, 10);
    const minutosFin = parseInt(minutosFinal, 10);

    const duracionHoras = horasFin - horasInicio;
    const duracionMinutos = minutosFin - minutosInicio;
    const duracionTotal = duracionHoras * 60 + duracionMinutos;

    if (duracionTotal !== unidadesValorativas * 60) {
      return false
    };
    if (duracionTotal === unidadesValorativas * 60) {
      return true
    };
  };
  // valida que las UV cocidan con los dias
  const validarUV = () => {
    const temp = buscarClasePorId(clases, selectedClase)
    const unidadesValorativas = temp?.unidades_valo;
    const diasSeleccionados = checkboxValues.length;
    if (unidadesValorativas == diasSeleccionados) { return true }
    if (unidadesValorativas !== diasSeleccionados) { return false }
  }

  const validarDiasUV = () => {
    const diasSeleccionados = checkboxValues.length;
    const temp = buscarClasePorId(clases, selectedClase)
    const unidadesValorativas = temp?.unidades_valo;
    if (diasSeleccionados === 1) {
      if (!validarHorario()) {
        alert(`La clase seleccionada debe ser impartida ${temp?.unidades_valo} horas a la semana `)
      }
    } else {
      if (diasSeleccionados > 1) {
        if (!validarUV()) {
          alert(`La clase seleccionada debe ser impartida ${temp?.unidades_valo} horas a la semana`)
        }
      }
    }
  }

  // console.log(validarUV())
  const Guardar = () => {
    const horaInicio = parseInt(horaInicial, 10);
    const minutosInicio = parseInt(minutosInicial, 10);
    const horaFin = parseInt(horaFinal, 10);
    const minutosFin = parseInt(minutosFinal, 10);

    if (horaInicio > horaFin || (horaInicio === horaFin && minutosInicio >= minutosFin)) {
      alert("La hora de inicio debe ser menor que la hora final.");
    }
    validarDiasUV()
    verificarDocente()
    traerAulas()

    const diasC = checkboxValues.join('');
    const formData = {
      id_clase: parseInt(selectedClase),
      num_empleado: parseInt(selectedDocente),
      id_aula: parseInt(selectedAula),
      dias: diasC,//[dias]
      cupos: parseInt(cuposDisponibles),
      id_edificio: parseInt(selectedEdificio),
      horainicio: `${horaInicial}:${minutosInicial}`,
      horafin: `${horaFinal}:${minutosFinal}`,
    };

    // console.log(formData);
    if (validarDatos(formData)) {

      if (!docenteLibre.hasData) {
        console.log('Enviar')
        try {
          fetch("http://localhost:8081/seccion-insertar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((response) => response.json())
            .then((data) => {
              alert("Sección creada con éxito");
              // navigate('/docente/home');
              setHoraInicial("00");
              setMinutosInicial("00");
              setHoraFinal("00");
              setMinutosFinal("00");
              setSelectedClase("");
              setselectedEdificio("");
              setSelectedAula("");
              setCuposDisponibles("");
              setSelectedDocente("");
              setCheckboxValues([]);
            })
            .catch((error) => {
              console.error("Error al crear la sección:", error);
            });
        } catch (e) { console.log(e) }
      } else {
        alert('El docente tiene una sección a esta hora')
      }
    } else {
      console.log('No enviar')
    }
  };



  const regresar = () => {
    window.history.back();
  };

  function validarDatos(formData) {
    if (isNaN(formData.id_clase) ||
      isNaN(formData.num_empleado) ||
      isNaN(formData.id_edificio) ||
      isNaN(formData.id_aula) ||
      isNaN(formData.cupos) ||
      typeof formData.dias !== 'string' ||
      typeof formData.horainicio !== 'string' ||
      typeof formData.horafin !== 'string') {
      return false;
    } else {
      return true;
    }
  }

  // Funciones nuevas
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckboxValues((prevSelectedDays) => [...prevSelectedDays, value]);
    } else {
      setCheckboxValues((prevSelectedDays) =>
        prevSelectedDays.filter((day) => day !== value)
      );
    }
  };

  const handleSelectClase = (event) => {
    setSelectedClase(event.target.value);

  };
  const handleSelectDocente = (event) => {
    setSelectedDocente(event.target.value);
  };

  const handleSelectEdificio = (event) => {
    setselectedEdificio(event.target.value);
  };

  const handleSelectAula = (event) => {
    setSelectedAula(event.target.value);
  };

  const handleSelectCupos = (event) => {
    const nuevoCupo = parseInt(event.target.value, 10);
    if (nuevoCupo >= 0 && nuevoCupo <= 50) {
      setCuposDisponibles(nuevoCupo);
    } else {
      console.log('Solo se permite un máximo de 50 cupos')
    }
  };

  return (
    <>
      <button className="btn btn-success mt-4" onClick={regresar}>
        Atras
      </button>
      {/* Asignatura */}
      <div>
        <h3>Período II</h3>
        <h3>Año 2023</h3>
      </div>
      <div className="container" style={{ width: '700px', height: '300px', backgroundColor: '#9a8686', margin: '10px' }}>
        <p style={{ backgroundColor: '#006494' }}>Asignatura</p>
        <div className="row" >
          {/* Elegir una clase */}
          <div>
            <p>Asignatuta</p>
            <select value={selectedClase} onChange={handleSelectClase}>
              <option value="">Seleccione una clase</option>
              {clases?.map((data, index) => (
                <option key={index} value={data.id_clase}>
                  {data.codigo + ' - ' + 'UV= ' + data.unidades_valo + ' ' + data.nombre_clase}
                </option>
              ))}
            </select>
          </div>

          {/* Elegir un docente */}
          <div>
            <label htmlFor="">Docente</label>
            <select value={selectedDocente} onChange={handleSelectDocente}>
              <option value="">Seleccione un docente</option>
              {docentes.map((data, index) => (
                <option key={index} value={data.num_empleado}>
                  {'No. emp: ' + data.num_empleado + ' - ' + data.nombres + ' ' + data.apellidos}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Horario */}
      <div className="container" style={{ width: '700px', height: '300px', backgroundColor: '#9a8686', margin: '10px' }}>
        <p style={{ backgroundColor: '#006494' }}>Horario</p>
        <div className="row">
          {/* Dias */}
          <div>
            <label>
              <input type="checkbox"
                name="Lunes"
                checked={checkboxValues.includes("Lunes")}
                onChange={handleCheckboxChange}
                value="Lunes" /> Lunes
            </label>
            <label>
              <input type="checkbox"
                name="Martes"
                value="Martes"
                checked={checkboxValues.includes("Martes")}
                onChange={handleCheckboxChange} /> Martes
            </label>
            <label>
              <input type="checkbox"
                name="Miercoles"
                value="Miercoles"
                checked={checkboxValues.includes("Miercoles")}
                onChange={handleCheckboxChange} /> Miércoles
            </label>
            <label>
              <input type="checkbox"
                name="Jueves"
                value="Jueves"
                checked={checkboxValues.includes("Jueves") || false}
                onChange={handleCheckboxChange} /> Jueves
            </label>
            <label>
              <input type="checkbox"
                name="Viernes"
                value="Viernes"
                checked={checkboxValues.includes("Viernes")}
                onChange={handleCheckboxChange} /> Viernes
            </label>
            <label>
              <input type="checkbox"
                name="Sabado"
                value="Sabado"
                checked={checkboxValues.includes("Sabado")}
                onChange={handleCheckboxChange} /> Sábado
            </label>
            <label>
              <input type="checkbox"
                name="Domingo"
                value="Domingo"
                checked={checkboxValues.includes("Domingo")}
                onChange={handleCheckboxChange} /> Domingo
            </label>
          </div>
          {/* Hora de inicio y fin */}
          <div>
            <label htmlFor="">Hora Inicial</label>
            <select value={horaInicial} onChange={(e) => setHoraInicial(e.target.value)}>
              <option value="">00</option>
              {horas.map((hora) => (
                <option key={hora} value={hora}>
                  {hora}
                </option>
              ))}
            </select>

            <label htmlFor="">Minutos Inicial</label>
            <select value={minutosInicial} onChange={(e) => setMinutosInicial(e.target.value)}>
              {minutos.map((minuto) => (
                <option key={minuto} value={minuto}>
                  {minuto}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="">Hora Final</label>
            <select value={horaFinal} onChange={(e) => setHoraFinal(e.target.value)}>
              <option value="">00</option>
              {horas.map((hora) => (
                <option key={hora} value={hora}>
                  {hora}
                </option>
              ))}
            </select>

            <label htmlFor="">Minutos Final</label>
            <select value={minutosFinal} onChange={(e) => setMinutosFinal(e.target.value)}>
              {minutos.map((minuto) => (
                <option key={minuto} value={minuto}>
                  {minuto}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Edificio */}
      < div className="container" style={{ width: '700px', height: '300px', backgroundColor: '#9a8686', margin: '10px' }
      }>
        <p style={{ backgroundColor: '#006494' }}>Edificio</p>
        <div className="row">
          <div>
            <label htmlFor="">Edificio</label>
            <select value={selectedEdificio} onChange={handleSelectEdificio}>
              <option value="">Seleccione un edificio</option>
              {edificios.map((dato, index) => (
                <option key={index} value={dato.id_edificio}>
                  {dato.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="">Aula</label>
            <select value={selectedAula} onChange={handleSelectAula}>
              <option value="">Seleccione un aula</option>
              {aulas.results?.map((dato, index) => (
                <option key={index} value={dato.id_aula}>
                  {dato.num_aula}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="">Cupos</label>
            <input type="number"
              value={cuposDisponibles}
              min={0}
              max={50}
              onChange={handleSelectCupos} />
          </div>
        </div>
      </div >
      <div>
        <div>
          <button className="btn btn-success my-3" onClick={Guardar}>
            Guardar Planificación
          </button>
        </div>
      </div>
    </>
  );
};

export default FormularioCrearClases;
