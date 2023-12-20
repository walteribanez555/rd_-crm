export interface Cupon {
  cupon_id:    number;
  servicio_id: number;
  oficina_id:  string;
  tipo_valor:  number;
  nombre:      string;
  valor:       number;
  fecha_desde: string;
  fecha_hasta: string;
  status:      number;
}



export interface CuponToPost extends Omit<Cupon, 'cupon_id'>{

}
