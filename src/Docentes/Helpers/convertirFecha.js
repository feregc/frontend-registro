export const convertirFechaAño = (fechaISO) => {
    const fecha = new Date(fechaISO);
    
    const anio = fecha.getFullYear();
    
    return `${anio}`;
  }

  export const HorasInicioFin = () => {
    const horas = ['06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21'];
      
    const minutos = [];
    for (let minute = 0; minute < 60; minute++) {
      minutos.push(`${minute.toString().padStart(2, "0")}`);
    }
  
    return {
      horas: horas,
      minutos: minutos,
    };
  }