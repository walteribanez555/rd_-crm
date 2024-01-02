import { Extra } from "src/app/Modules/core/models/Extra.model";
import { ExtraUi } from "../../models/Extra.ui";
import { Plan } from "src/app/Modules/core/models/Plan.model";


export function mapExtraToServicio( extra : Extra, ...planes: Plan[]  ) :ExtraUi {

  return {
    planUi: planes,
    ...extra,
    isSelected : false,
  };

}
