import { CountryRegionLng } from "../utils/data/countries-region.ts/country-region-lng";

export interface BeneficiarioUi {
  primer_nombre : string;
  segundo_nombre : string;
  primer_apellido : string;
  segundo_apellido : string;
  nro_identificacion : string;
  fecha_nacimiento : string;
  edad  : string;
  sexo : string;
  origen : CountryRegionLng;
  email : string;
  telefono: string;
  isTitular : boolean;
}
