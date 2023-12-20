import {  Cupon, Precio, Servicio } from '../../Core/models';
import { CatalogoUi } from './Catalogo.ui';
import { PlanUi } from './Plan.ui';

export interface ServicioUi extends Servicio {
  catalogos: CatalogoUi[] | null;
  extras : PlanUi[] ;
  isSelected: boolean;
  costo : number | null;
  precios : Precio[];
  precioSelected : number | null;
  listcupones : Cupon[];
}
