import { Servicio } from "src/app/Modules/core/models/Servicio.model";

export interface ServicioUi extends Servicio{
  isSelected : boolean;
}
