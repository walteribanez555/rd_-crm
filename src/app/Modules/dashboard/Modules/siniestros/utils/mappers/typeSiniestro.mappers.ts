import { Catalogo } from 'src/app/Modules/core/models/Catalogo.model';
import { TipoSiniestro } from '../../models/TipoSiniestro.ui.model';
import { Plan } from 'src/app/Modules/core/models/Plan.model';

export function mapTyeSiniestro(catalogos: Catalogo[], planes: Plan[]) {
  const tipoSiniestros: TipoSiniestro[] = catalogos.map((catalogo) => {
    return mapCatPlan(catalogo, planes);
  });

  return tipoSiniestros;
}

export function mapCatPlan(catalogo: Catalogo, planes: Plan[]) {
  const planesToTipe: Plan[] = planes.filter(
    (plan) => plan.tipo_beneficio === catalogo.catalogo_id
  );

  const nuevoTipoSiniestro: TipoSiniestro = {
    catalogo,
    planes: planesToTipe,
    isSelected: false,
  };

  return nuevoTipoSiniestro;
}
