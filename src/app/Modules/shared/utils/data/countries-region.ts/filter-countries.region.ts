import { Servicio } from 'src/app/Modules/core/models/Servicio.model';
import { CountryRegionLng } from './country-region-lng';

export function filterServicesByDestinies(
  listDestinies: string,
  servicios: Servicio[]
) {
  const filterServices: Servicio[] = servicios.filter((serv) => {});
}

export function hasValidDestinies(
  listDestinies: CountryRegionLng[],
  listServDestinies: string
) {
  const listDestinyServiceArr = listServDestinies
    .split(',')
    .map((dest) => dest.toLocaleUpperCase());

  const originDestiny = listDestinyServiceArr
    .filter((dest) => dest.startsWith('('))
    .map((dest) => extractWordInParentheses(dest));

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
    listDestiny.region = listDestiny.region.toLocaleUpperCase();
    listDestiny.iso2 = listDestiny.iso2.toLocaleUpperCase();
  });

  console.log({
    originDestiny,
    listDestinies,
    regionsService,
    negativeListRegion,
    countriesService,
    negativeCountriesService,
  });

  return listDestinies.every((dest) => {


    if (originDestiny.length > 0) {
      const offices = localStorage.getItem('office_id')?.split(',');

       if ( (offices && isAnyElementInOtherList(offices, originDestiny)) && countriesService.includes('MUNDIAL')) {
      if ((offices && isAnyElementInOtherList(offices, originDestiny)) && listDestinyServiceArr.length <= 1) {
        return true;
      }

      if (
        (offices && isAnyElementInOtherList(offices, originDestiny)) &&
        negativeCountriesService.length === 0 &&
        negativeListRegion.length === 0
      ) {
        return true;
      }

      if (
        (offices && isAnyElementInOtherList(offices, originDestiny)) &&
        negativeCountriesService.includes(dest.iso2)) {
        return false;
      }

      if (
        (offices && isAnyElementInOtherList(offices, originDestiny)) &&
        negativeListRegion.includes(dest.region)) {
        return false;
      }

      return true;
    }

      return (
        (originDestiny.includes(
          window.parent.location.hostname.toLocaleUpperCase()
        ) ||
          (offices && isAnyElementInOtherList(offices, originDestiny))) &&
        (regionsService.includes(dest.region) ||
          countriesService.includes(dest.iso2)) &&
        (!negativeListRegion.includes(dest.region) ||
          !negativeCountriesService.includes(dest.iso2))
      );
    }


    if ( originDestiny.length === 0 && countriesService.includes('MUNDIAL')) {
      if (listDestinyServiceArr.length <= 1) {
        return true;
      }

      if (
        negativeCountriesService.length === 0 &&
        negativeListRegion.length === 0
      ) {
        return true;
      }

      if (originDestiny.length ===0 && negativeCountriesService.includes(dest.iso2)) {
        return false;
      }

      if (negativeListRegion.includes(dest.region)) {
        return false;
      }

      return true;
    }



    return (
      (regionsService.includes(dest.region) ||
        countriesService.includes(dest.iso2)) &&
      (!negativeListRegion.includes(dest.region) ||
        !negativeCountriesService.includes(dest.iso2))
    );
  });

  // listOfDestinies = negativeListDestinies.filter( dest => );
}

// export function hasDestiny(   listDestinies : CountryRegion[], destiny : string ){

//   const listDestiniesFiltered = listDestinies.filter( dest => dest.  );

// }

function extractWordInParentheses(input: string): string | null {
  const match = input.match(/\((.*?)\)/);
  return match ? match[1] : null;
}

function isAnyElementInOtherList(list1: any[], list2: any[]): boolean {
  return list1.some((element) => list2.includes(element));
}
