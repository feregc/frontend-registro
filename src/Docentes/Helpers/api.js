const fetchClase = async (num) => {
  try {
    const url = `http://localhost:8081/clasesdocentes/${num_empleado}`;
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch {
    console.log("Error:", error);
  }
};

function verificarFecha(fechaInicio, fechaFin, fechaEntrada) {
  const fechaInicioObj = parsearFecha(fechaInicio);
  const fechaFinObj = parsearFecha(fechaFin);
  const fechaEntradaObj = parsearFecha(fechaEntrada);

  return fechaEntradaObj >= fechaInicioObj && fechaEntradaObj <= fechaFinObj;
}


function parsearFecha(fecha) {
  const fechaFormateada = fecha.split('T')[0];
  const partes = fechaFormateada.split('-');
  const año = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1; 
  const dia = parseInt(partes[2], 10);

  return new Date(año, mes, dia);
}

export { fetchClase, verificarFecha};

