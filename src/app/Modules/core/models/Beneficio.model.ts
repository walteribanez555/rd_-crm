

export interface Beneficio {
  beneficio_id:   number;
  tipo_beneficio: number;
  descripcion:    string;
  color:          Color;
  icono:          Icono;
  status:         number;
}

export enum Color {
  The131313 = "#131313",
}

export enum Icono {
  ImgURL = "imgUrl",
  URLImg = "urlImg",
  Urlimg = "urlimg",
}
