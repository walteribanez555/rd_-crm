import { FormGroup } from '@angular/forms';
import { ServicioUi } from 'src/app/Modules/shared/models/Servicio.ui';

export class ServiciosFilter {
  filterByActions(
    forms: FormGroup[],
    position: number,
    servicios: ServicioUi[]
  ): ServicioUi[] {
    let serviciosFiltered: ServicioUi[] = servicios;

    if (position >= 1) {
      const formDestiny = forms[0];
      const dFinal = (formDestiny.get('toLocation')?.value as string)
        .split(',')
        .map((destiny) => destiny.trimStart());

      serviciosFiltered = this.filterByCountries(serviciosFiltered, dFinal);
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

  filterByCountries(serviciosUi: ServicioUi[], countries: string[]) {
    return serviciosUi.filter((servicioUi) => {
      const servicio_countries = servicioUi.disponibilidad.split(',');
      if (
        countries.every((country) =>
          servicio_countries.some(
            (country_service) =>
              country_service.toUpperCase() === country.toUpperCase()
          )
        )
      ) {
        return true;
      }
      return false;
    });
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
