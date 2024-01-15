import { FormGroup } from '@angular/forms';
import { country } from 'aws-sdk/clients/importexport';
import { ServicioUi } from 'src/app/Modules/shared/models/Servicio.ui';
import { CountryRegion } from 'src/app/Modules/shared/utils/data/countries-region.ts/countries-region';
import { hasValidDestinies } from 'src/app/Modules/shared/utils/data/countries-region.ts/filter-countries.region';

export class ServiciosFilter {
  filterByActions(
    forms: FormGroup[],
    position: number,
    servicios: ServicioUi[]
  ): ServicioUi[] {
    let serviciosFiltered: ServicioUi[] = servicios;

    if (position >= 1) {
      const formDestiny = forms[0];
      const dFinal = (formDestiny.get('toLocation')?.value as CountryRegion[])


      serviciosFiltered = this.filterByCountries(serviciosFiltered, dFinal);
      console.log({serviciosFiltered});
    }

    if (position >= 2) {
      const formDates = forms[1];
      const quantityDays: number = formDates.get('quantityDays')?.value;

      serviciosFiltered = this.filterByQuantityDays(
        serviciosFiltered,
        quantityDays
      );
    }

    if (position >= 3) {
      const agesForm = forms[2];
      const quantityAdults = agesForm.get('adultQuantity')?.value;
      const quantitySeniors = agesForm.get('seniorQuantity')?.value;
      console.log(quantityAdults);
      console.log(quantitySeniors);
      serviciosFiltered = this.filterByAges(
        serviciosFiltered,
        quantityAdults,
        quantitySeniors
      );
    }

    return serviciosFiltered;
  }

  filterByCountries(serviciosUi: ServicioUi[], countries: CountryRegion[]) {
    return serviciosUi.filter((servicioUi) => hasValidDestinies(countries, servicioUi.disponibilidad));
  }

  filterByQuantityDays(serviciosUi: ServicioUi[], quantityDays: number) {
    return serviciosUi.filter(
      (servicioUi) => servicioUi.tiempo_limite >= quantityDays
    );
  }

  filterByAges(
    serviciosUi: ServicioUi[],
    adultQuantity: number,
    seniorQuantity: number
  ) {
    const adultServicios: ServicioUi[] = [];
    const seniorServicios: ServicioUi[] = [];

    serviciosUi.forEach((servicioUi) => {
      if (servicioUi.edad_limite * 1 <= 71 * 1) {
        adultServicios.push(servicioUi);
      } else {
        seniorServicios.push(servicioUi);
      }
    });

    console.log({ adultServicios, seniorServicios });

    if (adultQuantity > 0) {
      return adultServicios;
    }

    return seniorServicios;
  }
}
