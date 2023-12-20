import { Beneficio, Plan, Servicio } from 'src/app/Modules/Core/models';
import { BeneficioUi } from '../../models';

export function mapToBeneficio(
  beneficio: Beneficio,
  ...planes: Plan[]
): BeneficioUi {
  return {
    plan: planes.filter(
      (plan) => plan.tipo_beneficio === beneficio.tipo_beneficio
    ),
    ...beneficio,
  };
}
