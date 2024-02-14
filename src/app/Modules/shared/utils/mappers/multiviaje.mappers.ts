import { MultiviajeUI } from "../../models/Multiviaje.ui";
import { ServicioUi } from "../../models/Servicio.ui";



export function mapMultiviaje ( servicioUi : ServicioUi, fecha_retorno : string){

  const multiviajes : MultiviajeUI[] = servicioUi.multiviajes.filter( multiviaje => multiviaje.isSelected);

  if(multiviajes.length=== 0) {
    return `null`;
  }

  const dateExpiration = getExpirationDate(fecha_retorno);

  const data = {
    duracion : +multiviajes[0].catalogo.etiqueta,
    fechas_caducidad : dateExpiration
  }

  return `${JSON.stringify(data).replace(",",";")}`;

}


export function getExpirationDate(fecha_retorno : string){
  const inputDate = new Date(fecha_retorno);

  // Add one year to the date
  const oneYearLater = new Date(inputDate);
  oneYearLater.setFullYear(inputDate.getFullYear() + 1);
  return oneYearLater.toISOString().split('T')[0];
}
