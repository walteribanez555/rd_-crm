import { Beneficio } from '../../core/models/Beneficio.model';
import { Plan } from '../../core/models/Plan.model';
import { PlanUi } from './Plan.ui';

export interface BeneficioUi extends Beneficio {
  plan: Plan[];
}
