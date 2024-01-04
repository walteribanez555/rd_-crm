
export interface Beneficiario {
  beneficiario_id:    number | null;
  id : number |null;
  poliza_id:          number;
  primer_apellido:    string;
  segundo_apellido:   string;
  primer_nombre:      string;
  segundo_nombre:     string;
  nro_identificacion: string;
  fecha_nacimiento:   string;
  edad:               number;
  sexo:               number;
  origen:             string;
  email:              string;
  telefono:           string;
}


export interface BeneficiarioToPost extends Omit<Beneficiario , 'beneficiario_id'| 'id'| 'edad'>{

}

// {
//   "poliza_id": 1,
//   "primer_apellido": "Ibañez Saucedo",
//   "segundo_apellido": "0",
//   "primer_nombre": "Walter Ronny",
//   "segundo_nombre": "0",
//   "nro_identificacion": "8912915",
//   "fecha_nacimiento": "2002-07-01",
//   "sexo": 1,
//   "origen": "BOLIVIA",
//   "email": "walteribanez555@gmail.com",
//   "telefono":"591-78140498"
// }
