import { Catalogo } from '../../core/models/Catalogo.model';
import { BeneficioUi } from './Beneficio.ui';

export interface CatalogoUi extends Catalogo {
  beneficios: BeneficioUi[] ;
}
