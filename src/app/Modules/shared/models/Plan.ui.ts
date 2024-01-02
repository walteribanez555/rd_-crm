import { Extra } from "../../core/models/Extra.model";
import { Plan } from "../../core/models/Plan.model";

export interface PlanUi extends Plan {
  isSelected : boolean;
  costo : number  | null;
  extra_ : Extra;
}
