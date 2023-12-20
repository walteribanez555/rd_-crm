import { Extra, Plan } from "../../Core/models";
import { PlanUi } from "./Plan.ui";


export interface ExtraUi extends Extra {
  planUi : Plan[];
  isSelected : boolean;

}
