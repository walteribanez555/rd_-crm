import { Extra, Plan } from "src/app/Modules/Core/models";
import { ExtraUi } from "../../models/Extra.ui";


export function mapExtraToServicio( extra : Extra, ...planes: Plan[]  ) :ExtraUi {

  return {
    planUi: planes,
    ...extra,
    isSelected : false,
  };

}
