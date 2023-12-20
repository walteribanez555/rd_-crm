export interface Descuento {
  descuento_id: number;
  tipo_valor:   number;
  cantidad:     number;
  valor:        number;
  fecha_desde:  string;
  fecha_hasta:  string;
  status:       number;
}


export interface DescuentoToPost extends Omit<Descuento, 'descuento_id'>{

}
