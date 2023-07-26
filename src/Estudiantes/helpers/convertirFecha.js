export const convertirFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    
    const hora = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');
    
    return `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
  }