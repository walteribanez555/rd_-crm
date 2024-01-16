import { Servicio } from 'src/app/Modules/core/models/Servicio.model';
import { CountryRegion } from './countries-region';
import { Console } from 'console';

export function filterServicesByDestinies(
  listDestinies: string,
  servicios: Servicio[]
) {
  const filterServices: Servicio[] = servicios.filter((serv) => {});
}

export function hasValidDestinies(
  listDestinies: CountryRegion[],
  listServDestinies: string
) {
  const listDestinyServiceArr = listServDestinies
    .split(',')
    .map((dest) => dest.toLocaleUpperCase());
  const negativeListDestinies = listDestinyServiceArr
    .filter((dest) => dest.startsWith('!'))
    .map((dest) => dest.substring(1));
  const regionsService = listDestinyServiceArr
    .filter((dest) => dest.startsWith('REG_'))
    .map((dest) => dest.substring(4));
  const negativeListRegion = negativeListDestinies
    .filter((dest) => dest.startsWith('REG'))
    .map((dest) => dest.substring(4));
  const countriesService = listDestinyServiceArr.filter(
    (dest) => !dest.startsWith('REG') && !dest.startsWith('!')
  );
  const negativeCountriesService = negativeListDestinies.filter(
    (dest) => !dest.startsWith('REG')
  );

  listDestinies.forEach((listDestiny) => {
    listDestiny.continent = listDestiny.continent.toLocaleUpperCase();
    listDestiny.country = listDestiny.country.toLocaleUpperCase();
  });

  console.log({
    listDestinies,
    regionsService,
    negativeListRegion,
    countriesService,
    negativeCountriesService,
  });

  return listDestinies.every((dest) => {
    if(countriesService.includes('MUNDIAL')){

      if(listDestinyServiceArr.length <=1){
        return true;
      }


      if(negativeCountriesService.length === 0 && negativeListRegion.length === 0 ){
        return true;
      }

      if(negativeCountriesService.includes(dest.country)){
        return false;
      }

      if(negativeListRegion.includes(dest.continent)){
        return false;
      }

      return true;

    };


    return (
      (regionsService.includes(dest.continent) ||
        countriesService.includes(dest.country)) &&
      (!negativeListRegion.includes(dest.continent) ||
        !negativeCountriesService.includes(dest.country))
    );
  });

  // listOfDestinies = negativeListDestinies.filter( dest => );
}

// export function hasDestiny(   listDestinies : CountryRegion[], destiny : string ){

//   const listDestiniesFiltered = listDestinies.filter( dest => dest.  );

// }
