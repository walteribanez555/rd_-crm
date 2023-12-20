import { Beneficio, Plan } from '../../Core/models';
import { PlanUi } from './Plan.ui';

export interface BeneficioUi extends Beneficio {
  plan: Plan[] | null;
}
