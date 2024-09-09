import { of } from "rxjs";
import { CountryRegionLng, Translations } from "../data/countries-region.ts/country-region-lng";


// Función para obtener el nombre traducido en base al código de idioma
export function obtenerNombreTraducido(objeto: CountryRegionLng, codigoIdioma: keyof Translations): string {

  if(!(codigoIdioma in objeto.translations)){
    return objeto.name;
  }


  if (objeto.translations.hasOwnProperty(codigoIdioma)) {
    return objeto.translations[codigoIdioma]!;
  } else {
    return objeto.name; // Si no se encuentra la traducción, se devuelve el nombre por defecto
  }
}

// Función para filtrar los países en base al código de idioma y al nombre traducido
export function filtrarPaises(paises: CountryRegionLng[], codigoIdioma: keyof Translations, nombreFiltrado: string): CountryRegionLng[] {




  return paises.filter(function (pais) {
    var nombreTraducido = codigoIdioma in pais.translations ? obtenerNombreTraducido(pais, codigoIdioma) : pais.name;
    return nombreTraducido.toLowerCase().includes(nombreFiltrado.toLowerCase());
  });
}
