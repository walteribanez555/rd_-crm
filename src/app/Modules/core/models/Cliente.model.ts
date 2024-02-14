// Generated by https://quicktype.io

export interface Cliente {
  id : number | null,
  cliente_id:         number | null;
  tipo_cliente:       number;
  apellido:           string;
  nombre:             string;
  nro_identificacion: string;
  fecha_registro:     string;
  origen:             string;
  email:              string;
  nro_contacto:       string;
  status:             number;
}


export interface ClienteToPost extends Omit<Cliente,'fecha_registro' | 'cliente_id' | 'id' > {
  office_id : number;
  contacto: number;
  persona_contacto : string | number;
}


