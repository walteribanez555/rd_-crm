import { CountryRegion } from "../utils/data/countries-region.ts/countries-region";

export interface BeneficiarioUi {
  primer_nombre : string;
  segundo_nombre : string;
  primer_apellido : string;
  segundo_apellido : string;
  nro_identificacion : string;
  fecha_nacimiento : string;
  edad  : string;
  sexo : string;
  origen : CountryRegion;
  email : string;
  telefono: string;
  isTitular : boolean;
}
