import { Catalogo } from 'src/app/Modules/core/models/Catalogo.model';
import { ServicioUi } from '../../models/Servicio.ui';
import { VentaUi } from '../../models/Venta.ui';
import { Beneficio } from 'src/app/Modules/core/models/Beneficio.model';
import { Extra } from 'src/app/Modules/core/models/Extra.model';
import { Plan } from 'src/app/Modules/core/models/Plan.model';
import { Precio } from 'src/app/Modules/core/models/Precio.model';
import { Cupon } from '../../models/data/Cupon';

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
    const plus : number[] =  Array(beneficiarys).fill( selectedExtras.reduce((accum , actualValue)=> (actualValue.extra_.tipo_valor === 1  ? (accum  + precioToData  * (actualValue.extra_.incremento / 100 )) : ( accum + actualValue.extra_.incremento ))  , 0) );
    const tipo_descuento : number[] = Array(beneficiarys).fill(1);
    const descuentos : number[] = Array(beneficiarys).fill(0);
    const total_polizas : number = total.reduce((accum , actualValue) => accum+ actualValue, 0);
    const total_plus : number =  plus.reduce((accum , actualValue, index)=> accum + actualValue , 0);
    const total_descuento : number = total.reduce((accum , actualValue, index)=> accum + (tipo_descuento[index] == 0 ? descuentos[index] : actualValue * descuentos[index] / 100 ),0);

    let totalPago = total_polizas + total_plus - total_descuento - descuentoExtra;
    const total_cupones  = servicioUi.listcupones.reduce((accum, actualItem) => accum + (actualItem.tipo_valor === 1 ?  (actualItem.valor * (totalPago /100)) : (actualItem.valor)),0);
    const tipo_cupones = 2;
    totalPago = totalPago - total_cupones;



    return {
      precioToData,
      total,
      plus,
      tipo_descuento,
      descuentos,
      total_plus,
      total_descuento,
      total_cupones,
      tipo_cupones,
      totalPago,
      beneficiarys,
      servicioUi,
      selectedExtras,
      total_polizas,

    };

  }
}


