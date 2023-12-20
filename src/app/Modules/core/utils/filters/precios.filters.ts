import { filter } from "rxjs";
import { ServicioUi } from "src/app/Modules/shared/models";
import { Precio } from "../../models";



export class PreciosFilter{

  filterByDay(servicioSelected : ServicioUi , daysQuantity : number) : number {

    if(daysQuantity<5) {
      const precioSelected = servicioSelected.precios.filter(precio => precio.limite_superior == 5)[0];
      return precioSelected.precio;
    }

    const precioRango  = servicioSelected.precios.filter(precio =>  precio.limite_superior  <= daysQuantity  );

    const precioSigRango = servicioSelected.precios.filter(precio => precio.limite_inferior > precioRango[precioRango.length-1].limite_superior);

    const daysDifference : number = daysQuantity -   precioRango[precioRango.length-1].limite_superior;
    const costoEnRango = daysDifference * precioRango[precioRango.length-1].pendiente  + precioRango[precioRango.length-1].precio;


    if(precioSigRango.length ==0){
      return costoEnRango;
    }

    const costoSigRango = precioSigRango[0].precio;

    return costoEnRango > costoSigRango ? costoSigRango : costoEnRango;


  }

  filterByDays ( servicio_id: number, precios : Precio[] , daysQuantity : number ) {

    const preciosFiltered = precios.filter(precio => precio.servicio_id === servicio_id);


    if(daysQuantity<5) {
      const precioSelected = preciosFiltered.filter(precio => precio.limite_superior == 5)[0];
      return precioSelected.precio;
    }

    const precioRango  = preciosFiltered.filter(precio =>  precio.limite_superior  <= daysQuantity  );

    const precioSigRango = preciosFiltered.filter(precio => precio.limite_inferior > precioRango[precioRango.length-1].limite_superior);

    const daysDifference : number = daysQuantity -   precioRango[precioRango.length-1].limite_superior;
    const costoEnRango = daysDifference * precioRango[precioRango.length-1].pendiente  + precioRango[precioRango.length-1].precio;


    if(precioSigRango.length ==0){
      return costoEnRango;
    }

    const costoSigRango = precioSigRango[0].precio;

    return costoEnRango > costoSigRango ? costoSigRango : costoEnRango;


  }

}
