import { ExtraUi } from "./Extra.ui";
import { PlanUi } from "./Plan.ui";
import { ServicioUi } from "./Servicio.ui";
import { Cupon } from "./data/Cupon";

export interface VentaUi {
  total : number[];
  descuentos : number[];
  plus : number[];
  tipo_descuento : number[];
  beneficiarys : number;
  precioToData : number;
  servicioUi : ServicioUi;
  totalPago : number;
  total_descuento : number;
  total_plus : number;
  selectedExtras : PlanUi[];
  total_polizas :number;
  total_cupones : number;
  tipo_cupones : number;
  codigoDescuento : number | null,

}
