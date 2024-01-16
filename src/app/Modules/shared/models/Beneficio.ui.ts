import { Beneficio } from '../../core/models/Beneficio.model';
import { Plan } from '../../core/models/Plan.model';

export interface BeneficioUi extends Beneficio {
  plan: Plan[];
}
