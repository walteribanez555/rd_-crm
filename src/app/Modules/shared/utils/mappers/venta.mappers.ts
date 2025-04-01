import { ServicioUi } from '../../models/Servicio.ui';
import { VentaUi } from '../../models/Venta.ui';
import { Cupon } from '../../models/data/Cupon';
import { CuponValidator } from '../validators/Cupon.validator';

export class VentaMappers {
  mapVenta(
    servicioUi: ServicioUi,
    ageBeneficiary: any,
    descuentoExtra: number,
    days: number,
    origen : string,
    destiny : string,
  ): VentaUi {
    const selectedExtras = servicioUi.extras.filter(
      (extra) => extra.isSelected
    );

    const selectedMultiviaje = servicioUi.multiviajes.filter(
      (multiviaje) => multiviaje.isSelected
    );

    //Modificar el flujo para hacer el calculo por venta individual

    //By every Beneficiary is a poliza
    // servicioUi.extras = selectedExtras;

    selectedExtras.forEach((extra) => {
      extra.costo = (extra.incremento * servicioUi.precioSelected!) / 100;
    });

    let precioToData: number;
    if (selectedMultiviaje.length > 0) {
      precioToData = +selectedMultiviaje[0].catalogo.codigo;
    } else {
      precioToData = servicioUi.precioSelected!;
    }

    let listBeneficiariesLimitGroup: number[] = [];

    listBeneficiariesLimitGroup = [
      ...(Array(ageBeneficiary.adultQuantity).fill(70) as number[]),
      ...(Array(ageBeneficiary.seniorQuantity).fill(85) as number[]),
      ...(Array(ageBeneficiary.youngQuantity).fill(13) as number[]),
    ];

    console.log({ listBeneficiariesLimitGroup });
    const discountOnGroup = listBeneficiariesLimitGroup.reduce(
      (accum, actualValue) => 0,
      0
    );
    // const quantityBeneficiaries : number = ageBeneficiary.adultQuantity + ageBeneficiary.youngQuantity + ageBeneficiary.seniorDate

    const total: number[] = Array(listBeneficiariesLimitGroup.length).fill(
      precioToData
    );
    const plus: number[] = Array(listBeneficiariesLimitGroup.length).fill(
      selectedExtras.reduce(
        (accum, actualValue) =>
          actualValue.extra_.tipo_valor === 1
            ? accum + precioToData * (actualValue.extra_.incremento / 100)
            : accum + actualValue.extra_.incremento,
        0
      )
    );

    const totalPlusItems: number[] = total.map((item) => {
      return item + (plus.length > 0 ? plus[0] : 0);
    });

    const cuponesAplicados: number[] = totalPlusItems.map((item, index) =>
      selectedMultiviaje.length > 0
        ? 0
        : this.getDiscountByPersonDetails(
            servicioUi.listcupones,
            listBeneficiariesLimitGroup[index],
            item,
            days,
            origen,
          ) +
          this.getDiscountByGroupDetails(
            servicioUi.listcupones,
            listBeneficiariesLimitGroup.length,
            item,
            days,
            origen,
          )
    );
    const tipo_descuento: number[] = Array(
      listBeneficiariesLimitGroup.length
    ).fill(1);
    const descuentos: number[] = Array(listBeneficiariesLimitGroup.length).fill(
      0
    );
    const total_plus: number = plus.reduce(
      (accum, actualValue, index) => accum + actualValue,
      0
    );

    const totalconDescuento: number[] = totalPlusItems.map((item, index) =>
      selectedMultiviaje.length > 0 ? item : item - cuponesAplicados[index]
    );
    const total_polizas: number = total.reduce(
      (accum, actualValue) => accum + actualValue,
      0
    );
    const total_descuento: number =
      selectedMultiviaje.length > 0
        ? 0
        : total.reduce(
            (accum, actualValue, index) =>
              accum +
              (tipo_descuento[index] == 0
                ? descuentos[index]
                : (actualValue * descuentos[index]) / 100),
            0
          );

    console.log({
      total,
      plus,
      tipo_descuento,
      descuentos,
      total_polizas,
      total_plus,
      total_descuento,
      cuponesAplicados,
      totalconDescuento,
    });

    // let totalPago = total_polizas + total_plus - total_descuento - descuentoExtra;
    // const total_cupones  = selectedMultiviaje.length>0 ? 0 :  servicioUi.listcupones.reduce((accum, actualItem) => accum + (actualItem.tipo_valor === 1 ?  (actualItem.valor * (totalPago /100)) : (actualItem.valor)),0);
    const tipo_cupones = 2;
    // totalPago = totalPago - total_cupones;

    return {
      precioToData,
      total,
      plus,
      tipo_descuento,
      descuentos,
      total_plus: plus,
      total_descuento: descuentos,
      total_cupones: cuponesAplicados,
      tipo_cupones,
      totalPago: totalconDescuento,
      beneficiarys: listBeneficiariesLimitGroup.length,
      servicioUi,
      selectedExtras,
      total_polizas,
      codigoDescuento: null,
      comision: 0,
      totalPagoGrupal: totalconDescuento.reduce(
        (accum, item) => accum + item,
        0
      ),
      totalCuponesGrupal:
        selectedMultiviaje.length > 0
          ? 0
          : cuponesAplicados.reduce((accum, item) => accum + item, 0),
      totalDescuentoGrupal:
        selectedMultiviaje.length > 0
          ? 0
          : descuentos.reduce((accum, item) => accum + item, 0),
    };
  }

  getDiscountByPersonDetails(
    cupones: Cupon[],
    age: number,
    totalPago: number,
    quantityDays: number,
    origin: string,
  ) {

    console.log(origin);
    console.log(cupones)

    const total = cupones.reduce((accum, actualItem) => {

      if (
        CuponValidator.isWithPolicie(actualItem, {
          beneficiarAgeLimit: age,
          days: quantityDays,
          origin,
        }) > 0
      ) {
        console.log('Aqui es verdadero por persona');
        console.log({
          totalPago,
          monto:
            accum +
            (actualItem.tipo_valor === 1
              ? actualItem.valor * (totalPago / 100)
              : actualItem.valor),
        });
        return (
          accum +
          (actualItem.tipo_valor === 1
            ? actualItem.valor * (totalPago / 100)
            : actualItem.valor)
        );
      } else {
        console.log('Aqui es falso por persona');
        console.log({ accum });

        return accum;
      }
    }, 0);
    console.log('Total por persona', total);
    return total;
  }

  getDiscountByGroupDetails(
    cupones: Cupon[],
    quantityPersons: number,
    totalPago: number,
    quantityDays: number,
    origin : string,
  ) {
    // const total = cupones.reduce( (accum, actualItem) => CuponValidator.isWithPolicie(actualItem, { quantity : quantityPersons , days : quantityDays} ) ?
    //                                                                                                                                       accum + (actualItem.tipo_valor === 1 ?  (actualItem.valor * (totalPago /100)) : (actualItem.valor))
    //                                                                                                                                   : accum,0 );
    const total = cupones.reduce((accum, actualItem) => {
      if (
        CuponValidator.isWithPolicie(actualItem, {
          quantity: quantityPersons,
          days: quantityDays,
          origin,
        }) === 3
      ) {
        console.log('Aqui es verdadero por grupo');
        console.log({ accum });

        return (
          accum +
          (actualItem.tipo_valor === 1
            ? actualItem.valor * (totalPago / 100)
            : actualItem.valor)
        );
      } else {
        console.log('Aqui es falso por grupo');
        console.log({ accum });

        return accum;
      }
    }, 0);

    console.log('Total por grupo', total);

    return total;
  }
}
