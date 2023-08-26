import moment from 'moment';
import 'moment/locale/es';  // Importa la localización en español

// Establece la localización en español
moment.locale('es');

export const horaMes = (fecha) => {
    const hoyMes = moment(fecha);
    return hoyMes.format('HH:mm a | MMMM Do');
}
