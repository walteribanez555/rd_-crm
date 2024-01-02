import { Extra } from "../../core/models/Extra.model";
import { Plan } from "../../core/models/Plan.model";


export interface ExtraUi extends Extra {
  planUi : Plan[];
  isSelected : boolean;

}
