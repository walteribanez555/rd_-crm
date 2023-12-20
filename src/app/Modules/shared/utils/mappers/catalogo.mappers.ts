import { Beneficio, Catalogo, Servicio } from 'src/app/Modules/Core/models';
import { BeneficioUi, CatalogoUi } from '../../models';

export function mapBeneficiosToCatalogo(
  catalogo: Catalogo,
  beneficios: BeneficioUi[]
): CatalogoUi {
  return {
    ...catalogo,
    beneficios: beneficios.filter(
      (beneficio) => beneficio.tipo_beneficio === catalogo.catalogo_id
    ),
  };
}
