import { Cupon } from "../../models/data/Cupon";


export class CuponValidator{

  static validDate(cupon : Cupon){
    const actualDate = new Date();
    const initialDate = cupon.fecha_desde.split('T')[0];
    const finalDate = cupon.fecha_hasta.split('T')[0];

    return (actualDate >= new Date(initialDate) && actualDate <= new Date(finalDate)) ;
  }


  static isCodeCupon( cupon :Cupon) {
    const cuponDetails = cupon.nombre?.split('_');
    if(cuponDetails!.length > 1){
      return true;
    }
    return false;
  }

}
