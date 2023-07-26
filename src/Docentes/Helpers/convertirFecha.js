export const convertirFechaAño = (fechaISO) => {
    const fecha = new Date(fechaISO);
    
    const anio = fecha.getFullYear();
    
    return `${anio}`;
  }