import {
  Beneficio,
  Catalogo,
  Extra,
  Plan,
  Precio,
  Servicio,
} from 'src/app/Modules/Core/models';
import { ServByPlan } from 'src/app/Modules/Landing-page/Components/multi-step/multi-step.component';
import { mapToBeneficio } from './plan.mappers';
import { mapBeneficiosToCatalogo } from './catalogo.mappers';
import { PlanUi, ServicioUi } from '../../models';
import { mapExtraToServicio } from './extra.mappers';

export function MapToServicioUi(
  catalogos: Catalogo[],
  beneficios: Beneficio[],
  extras : Extra[],
  servPlan: ServByPlan,
  precios : Precio[]
): ServicioUi {


  console.log({servPlan});

  // const beneficiosFiltered = beneficios.map((beneficio) =>
  //  {
  //     if(!servPlan.planes[0].extra){
  //       return mapToBeneficio(beneficio, ...servPlan.planes)
  //     }
  //     return null;

  //   }
  // ).filter( beneficio => beneficio);
  const beneficiosFiltered = beneficios.filter((beneficio) => servPlan.planes[0].extra===0 ).map( beneficio => mapToBeneficio(beneficio,...servPlan.planes));
  // const beneficiosExtraFiltered = beneficios.map((beneficio) => {
  //   if(servPlan.planes[0].extra){
  //     return mapExtraToServicio(extras, ...servPlan.planes);
  //   }
  // })
  // const beneficiosExtraFiltered = beneficios.filter((extra) => servPlan.planes[0].extra === 1 ).map(beneficio => mapToBeneficio(beneficio,...servPlan.planes));

  const planes_Extra : PlanUi[] = servPlan.planes.filter( plan => plan.extra===1).map(plan => {
    return {
      ...plan,
      isSelected: false,
      costo : null,
    }
  });

  const catalogosFiltered = catalogos.map((catalogo) =>
    mapBeneficiosToCatalogo(catalogo, beneficiosFiltered)
  );

  const preciosFiltered = precios.filter(precio => precio.servicio_id === servPlan.servicio.servicio_id);

  return {
    catalogos: catalogosFiltered,
    ...servPlan.servicio,
    isSelected: false,
    extras : planes_Extra,
    costo : null,
    precios : preciosFiltered,
    precioSelected : null,
    listcupones : [],
    // extras : beneficiosExtraFiltered,
  };
}
