import { Catalogo } from "src/app/Modules/core/models/Catalogo.model";
import { Plan } from "src/app/Modules/core/models/Plan.model";

export interface TipoSiniestro {

  catalogo : Catalogo;
  planes : Plan[];
  isSelected : boolean;

}
