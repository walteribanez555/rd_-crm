import { Beneficio } from "src/app/Modules/core/models/Beneficio.model";
import { Plan } from "src/app/Modules/core/models/Plan.model";
import { BeneficioUi } from "../../models/Beneficio.ui";

export function mapToBeneficio(
  beneficio: Beneficio,
  ...planes: Plan[]
): BeneficioUi {
  return {
    plan: planes.filter(
      (plan) => plan.beneficio_id === beneficio.beneficio_id
    ),
    ...beneficio,
  };
}
