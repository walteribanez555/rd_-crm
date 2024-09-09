import { ServicioUi } from "src/app/Modules/shared/models/Servicio.ui";
import { VentaUi } from "src/app/Modules/shared/models/Venta.ui";

export interface CotizacionUI{


  total_pago_grupal : number;
  descuento_grupal : number;
  office_id : number;
  username : string;
  cliente_id : string;
  tipo_venta : number;
  forma_pago : number;
  extras_id : number;
  fecha_salida : string;
  fecha_retorno : string;
  plus : number;
  multiviajes : number;
  servicioCotizacion : ServicioUi;
  ventasUI : VentaUi[];

}
