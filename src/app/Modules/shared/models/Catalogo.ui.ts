import { Catalogo } from '../../Core/models';
import { BeneficioUi } from './Beneficio.ui';

export interface CatalogoUi extends Catalogo {
  beneficios: BeneficioUi[] | null;
}
