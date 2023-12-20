import { ServicioUi } from '../../models';
import { VentaUi } from '../../models/Venta.ui';

export class VentaMappers {
  mapVenta(
    servicioUi: ServicioUi,
    beneficiarys: number,
    descuentoExtra : number,
  ) : VentaUi {

    const selectedExtras = servicioUi.extras.filter(
      (extra) => extra.isSelected
    );


    //By every Beneficiary is a poliza
    // servicioUi.extras = selectedExtras;

    selectedExtras.forEach((extra) => {
      extra.costo = ((extra.incremento * servicioUi.precioSelected!) / 100);
    });


    const precioToData : number = servicioUi.precioSelected!;
    const total : number[] = Array(beneficiarys).fill(precioToData);
    const plus : number[] =  Array(beneficiarys).fill( selectedExtras.reduce((accum , actualValue)=> accum + actualValue.costo! , 0) );
    const tipo_descuento : number[] = Array(beneficiarys).fill(0);
    const descuentos : number[] = Array(beneficiarys).fill(0);
    const total_polizas : number = total.reduce((accum , actualValue) => accum+ actualValue, 0);
    const total_plus : number =  plus.reduce((accum , actualValue, index)=> accum + actualValue , 0);
    const total_descuento : number = total.reduce((accum , actualValue, index)=> accum + (tipo_descuento[index] == 0 ? descuentos[index] : actualValue * descuentos[index] / 100 ),0);
    const totalPago = total_polizas + total_plus - total_descuento - descuentoExtra;



    return {
      precioToData,
      total,
      plus,
      tipo_descuento,
      descuentos,
      total_plus,
      total_descuento,
      totalPago,
      beneficiarys,
      servicioUi,
      selectedExtras,
      total_polizas,


    };

  }
}
