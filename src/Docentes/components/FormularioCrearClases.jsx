import React, { useEffect, useMemo, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useFetchs } from "../Helpers/useFetchs";
import "../../Assets/styles/styles-docentes/Docente-home.css";
import { useNavigate } from "react-router-dom";
import { HorasInicioFin } from "../Helpers/convertirFecha";

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
  const [aulas, setAulas] = useState([]);
  const [docenteLibre, setDocenteLibre] = useState(false);
  const [anioPeriodo, setAnioPeriodo] = useState([]);

  const { edificios, clases, docentes } = useFetchs(
    docente[0]?.carrera,
    centro[0]?.nombre_centro
  );


  useEffect(() => {
    const fetchProcesoCarga = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/procesoCarga_disponibilidad"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const jsonData = await response.json();
        setAnioPeriodo(jsonData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchProcesoCarga();
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

  const traerAulas = async () => {
    const diasC = checkboxValues.join("");
    try {
      const response = await fetch(
        `http://localhost:8081/consulta-aula?id_edificio=${parseInt(
          selectedEdificio
        )}&horainicio=${horaInicial}:${minutosInicial}&horafin=${horaFinal}:${minutosFinal}&dias=${diasC}`
      );
      const jsonData = await response.json();

      setAulas(jsonData);
    } catch (error) {
      console.error("Error al obtener los datos del docente:", error);
    }
  };
  const verificarDocente = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/verificarHorarioDocente?num_empleado=${parseInt(
          selectedDocente
        )}&horaInicial=${horaInicial}&minutoInicial=${minutosInicial}&horaFinal=${horaFinal}&minutoFinal=${minutosFinal}`
      );
      const jsonData = await response.json();

      setDocenteLibre(jsonData);
      // console.log(jsonData)
    } catch (error) {
      console.error("Error al obtener los datos del docente:", error);
    }
  };

  useEffect(() => {
    traerAulas();
  }, [
    selectedEdificio,
    ,
    horaInicial,
    minutosInicial,
    horaFinal,
    minutosFinal,
    checkboxValues,
  ]);

  useEffect(() => {
    verificarDocente();
  }, [horaInicial, minutosInicial, horaFinal, minutosFinal, selectedDocente]);

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
      return false;
    }
    if (duracionTotal === unidadesValorativas * 60) {
      return true;
    }
  };
  // valida que las UV cocidan con los dias
  const validarUV = () => {
    const temp = buscarClasePorId(clases, selectedClase);
    const unidadesValorativas = temp?.unidades_valo;
    const diasSeleccionados = checkboxValues.length;
    if (unidadesValorativas == diasSeleccionados) {
      return true;
    }
    if (unidadesValorativas !== diasSeleccionados) {
      return false;
    }
  };

  const validarDiasUV = () => {
    const diasSeleccionados = checkboxValues.length;
    const temp = buscarClasePorId(clases, selectedClase);
    const unidadesValorativas = temp?.unidades_valo;
    if (diasSeleccionados === 1) {
      if (!validarHorario()) {
        alert(
          `La clase seleccionada debe ser impartida ${temp?.unidades_valo} horas a la semana `
        );
      }
    } else {
      if (diasSeleccionados > 1) {
        if (!validarUV()) {
          alert(
            `La clase seleccionada debe ser impartida ${temp?.unidades_valo} horas a la semana`
          );
        }
      }
    }
  };

  function validarHorasUnidades(horaInicio, horaFin, unidadesValorativas) {
    const horaInicioParts = horaInicio.split(":");
    const horaFinParts = horaFin.split(":");
    const horaInicioNum = parseInt(horaInicioParts[0]);
    const minutoInicioNum = parseInt(horaInicioParts[1]);
    const horaFinNum = parseInt(horaFinParts[0]);
    const minutoFinNum = parseInt(horaFinParts[1]);
    const horasDiferencia = horaFinNum - horaInicioNum;
    const minutosDiferencia = minutoFinNum - minutoInicioNum;
    const duracionTotal = horasDiferencia + minutosDiferencia / 60;
    return duracionTotal === unidadesValorativas;
  }
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);

    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");

    const hora = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");
    const segundos = String(fecha.getSeconds()).padStart(2, "0");

    return `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
  };

  const buscarDocentePorId = (docentesArray, idDocente) => {
    return docentesArray.find((docente_) => docente_.num_empleado === parseInt(idDocente));
  };



  const Guardar = () => {
    const horaInicio = parseInt(horaInicial, 10);
    const minutosInicio = parseInt(minutosInicial, 10);
    const horaFin = parseInt(horaFinal, 10);
    const minutosFin = parseInt(minutosFinal, 10);

    if (
      horaInicio > horaFin ||
      (horaInicio === horaFin && minutosInicio >= minutosFin)
    ) {
      alert("La hora de inicio debe ser menor que la hora final.");
    }
    validarDiasUV();
    verificarDocente();
    traerAulas();

    const fechaFormateada = formatearFecha(anioPeriodo[0]?.anio);

    const diasC = checkboxValues.join("");
    const temp = buscarClasePorId(clases, selectedClase);
    const unidadesValorativas = temp?.unidades_valo;
    const unidadesDocente = buscarDocentePorId(docentes,selectedDocente)
    console.log(unidadesDocente)
    const formData = {
      id_clase: parseInt(selectedClase),
      num_empleado: parseInt(selectedDocente),
      id_aula: parseInt(selectedAula),
      dias: diasC, //[dias]
      cupos: parseInt(cuposDisponibles),
      id_edificio: parseInt(selectedEdificio),
      horainicio: `${horaInicial}:${minutosInicial}`,
      horafin: `${horaFinal}:${minutosFinal}`,
      anio: fechaFormateada,
      periodo: anioPeriodo[0]?.periodo,
      unidades_valo: unidadesValorativas,
    };

    console.log(formData);

    if (validarDatos(formData)) {
      if (checkboxValues.length == 1) {
        if (!docenteLibre.hasData) {
          if(unidadesValorativas <= unidadesDocente.unidades_valo){
            const UV = clases.find((clase) => clase.id_clase === selectedClase);
            if (validarHorasUnidades(formData.horainicio, formData.horafin, 3)) {
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
                    navigate('/docente/home');
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
              } catch (e) {
                console.log(e);
              }
            } else {
              alert(
                "La unidades valorativas deben coincidir con las horas de la clase"
              );
            }
          }else{
            alert('El docente no tiene unidades valorativas disponibles')
          }
        } else {
          alert("El docente tiene una sección a esta hora");
        }
      }

      if (checkboxValues.length > 1) {
        if (!docenteLibre.hasData) {
          if(unidadesValorativas <= unidadesDocente.unidades_valo){
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
                  navigate('/docente/home');
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
            } catch (e) {
              console.log(e);
            }
          }else{
            alert('El docente no tiene unidades valorativas disponibles')
          }
        } else {
          alert("El docente tiene una sección a esta hora");
        }
      }
    } else {
      console.log("No enviar");
    }
  };
  const regresar = () => {
    window.history.back();
  };

  function validarDatos(formData) {
    if (
      isNaN(formData.id_clase) ||
      isNaN(formData.num_empleado) ||
      isNaN(formData.id_edificio) ||
      isNaN(formData.id_aula) ||
      isNaN(formData.cupos) ||
      typeof formData.dias !== "string" ||
      typeof formData.horainicio !== "string" ||
      typeof formData.horafin !== "string" ||
      typeof formData.anio !== "string" ||
      typeof formData.periodo !== "string"
    ) {
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
      console.log("Solo se permite un máximo de 50 cupos");
    }
  };

  // const anio =
  function obtenerAnioDesdeFecha(fecha) {
    const fechaObjeto = new Date(fecha);
    const anio = fechaObjeto.getFullYear();
    return anio;
  }

  return (
    <>
      <div className="container">
        <button className="btn btn-success mt-4" onClick={regresar}>
          Atrás
        </button>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-center my-3">
              <h3 className="mx-2">Período {anioPeriodo[0]?.periodo}</h3>{" "}
              <h3 className="mx-2">
                Año {obtenerAnioDesdeFecha(anioPeriodo[0]?.anio)}
              </h3>
            </div>
            <div className="row">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      Asignatura
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="row">
                        <div className="col-6 d-flex justify-content-center py-2">
                          Asignatura
                        </div>
                        <div className="col-6">
                          <select
                            value={selectedClase}
                            onChange={handleSelectClase}
                            className="w-75 form-control"
                          >
                            <option value="">Seleccione una clase</option>
                            {clases?.map((data, index) => (
                              <option key={index} value={data.id_clase}>
                                {data.codigo +
                                  " - " +
                                  "UV= " +
                                  data.unidades_valo +
                                  " " +
                                  data.nombre_clase}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="row">
                        <div className="col-6 d-flex justify-content-center py-2">
                          Docente
                        </div>
                        <div className="col-6">
                          <select
                            value={selectedDocente}
                            onChange={handleSelectDocente}
                            className=" form-control w-75"
                          >
                            <option value="">Seleccione un docente</option>
                            {docentes.map((data, index) => (
                              <option key={index} value={data.num_empleado}>
                                {"No. emp: " +
                                  data.num_empleado +
                                  " - " +
                                  data.nombres +
                                  " " +
                                  data.apellidos +
                                  " - UV= " +
                                  data.unidades_valo}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      Horario
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="row">
                        <div className="col d-flex justify-content-center py-2">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="Lunes"
                              checked={checkboxValues.includes("Lunes")}
                              onChange={handleCheckboxChange}
                              value="Lunes"
                            />
                            <label className="form-check-label mx-2">
                              Lunes
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="Martes"
                              value="Martes"
                              checked={checkboxValues.includes("Martes")}
                              onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label mx-2">
                              Martes
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="Miercoles"
                              value="Miercoles"
                              checked={checkboxValues.includes("Miercoles")}
                              onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label mx-2">
                              Miércoles
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="Jueves"
                              value="Jueves"
                              checked={
                                checkboxValues.includes("Jueves") || false
                              }
                              onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label mx-2">
                              Jueves
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="Viernes"
                              value="Viernes"
                              checked={checkboxValues.includes("Viernes")}
                              onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label mx-2">
                              Viernes
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="Sabado"
                              value="Sabado"
                              checked={checkboxValues.includes("Sabado")}
                              onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label mx-2">
                              Sábado
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="Domingo"
                              value="Domingo"
                              checked={checkboxValues.includes("Domingo")}
                              onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label mx-2">
                              Domingo
                            </label>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="row">
                        <div className="col-3 d-flex justify-content-center py-2">
                          Hora Inicio:
                        </div>
                        <div className="col-3">
                          <select
                            value={horaInicial}
                            onChange={(e) => setHoraInicial(e.target.value)}
                            className="form-control"
                          >
                            <option value="">00</option>
                            {horas.map((hora) => (
                              <option key={hora} value={hora}>
                                {hora}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-3 d-flex justify-content-center py-2">
                          Minutos Inicio:
                        </div>

                        <div className="col-3">
                          <select
                            value={minutosInicial}
                            onChange={(e) => setMinutosInicial(e.target.value)}
                            className="form-control"
                          >
                            {minutos.map((minuto) => (
                              <option key={minuto} value={minuto}>
                                {minuto}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="row">
                        <div className="col-3 d-flex justify-content-center py-2">
                          Hora Final:
                        </div>
                        <div className="col-3">
                          <select
                            value={horaFinal}
                            onChange={(e) => setHoraFinal(e.target.value)}
                            className="form-control"
                          >
                            <option value="">00</option>
                            {horas.map((hora) => (
                              <option key={hora} value={hora}>
                                {hora}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-3 d-flex justify-content-center py-2">
                          Minutos Final:
                        </div>
                        <div className="col-3">
                          <select
                            value={minutosFinal}
                            onChange={(e) => setMinutosFinal(e.target.value)}
                            className="form-control"
                          >
                            {minutos.map((minuto) => (
                              <option key={minuto} value={minuto}>
                                {minuto}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      Edificio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="row">
                        <div className="col-6 d-flex justify-content-center py-2">
                          Edificio
                        </div>
                        <div className="col-6">
                          <select
                            value={selectedEdificio}
                            onChange={handleSelectEdificio}
                            className=" form-control w-75"
                          >
                            <option value="">Seleccione un edificio</option>
                            {edificios.map((dato, index) => (
                              <option key={index} value={dato.id_edificio}>
                                {dato.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="row">
                        <div className="col-6 d-flex justify-content-center py-2">
                          Aula
                        </div>
                        <div className="col-6">
                          <select
                            value={selectedAula}
                            onChange={handleSelectAula}
                            className=" form-control w-75"
                          >
                            <option value="">Seleccione un aula</option>
                            {aulas.results?.map((dato, index) => (
                              <option key={index} value={dato.id_aula}>
                                {dato.num_aula}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="row">
                        <div className="col-6 d-flex justify-content-center py-2">
                          Cupos
                        </div>
                        <div className="col-6">
                          <input
                            type="number"
                            className=" form-control w-75"
                            value={cuposDisponibles}
                            min={0}
                            max={50}
                            onChange={handleSelectCupos}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-success my-3" onClick={Guardar}>
                Guardar Planificación
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormularioCrearClases;
