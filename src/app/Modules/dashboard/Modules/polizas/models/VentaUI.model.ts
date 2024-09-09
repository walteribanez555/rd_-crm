import { BeneficiarioUI } from "./BeneficiarioUI.model";
import { PolizaUI } from "./PolizaUI.model";

export interface VentaUI{

  total_pago : number;
  total : number;
  descuento : number;
  polizaUi : PolizaUI | null;
  beneficiarioUi : BeneficiarioUI | null;
  comision : number;
}
