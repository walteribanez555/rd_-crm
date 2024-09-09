import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CountryRegion, countriesRegion } from '../../utils/data/countries-region.ts/countries-region';
import { CountryRegionLng, Translations } from '../../utils/data/countries-region.ts/country-region-lng';
import { countrys } from '../../utils/data/countries-lng';
import { filtrarPaises, obtenerNombreTraducido } from '../../utils/filters/country-filter';

@Component({
  selector: 'select-custom',
  templateUrl: './selectCustom.component.html',
  styleUrls: ['./selectCustom.component.css'],
})
export class SelectCustomComponent implements OnInit {
  ngOnInit(): void {
    this.filteredCountries = this.countries;
  }

  isToggle: boolean = false;
  searchInput: string = 'Select Country';

  searchText: string = '';

  updateToggle() {
    this.isToggle = !this.isToggle;
  }

  filteredCountries: CountryRegionLng[] = [];

  updateActualName(selectedCountry: CountryRegionLng) {
    this.searchInput = this.getCountryByIso2(selectedCountry.iso2)!;
    this.isToggle = false;
    this.onselectDestiny.emit(selectedCountry);
  }

  filterBySearch() {
    const lang: keyof Translations | null = localStorage.getItem('lang') as keyof Translations | null;

    const codigosIdioma: Record<keyof Translations, boolean> = {
      kr: true,
      'pt-BR': true,
      pt: true,
      nl: true,
      hr: true,
      fa: true,
      de: true,
      es: true,
      fr: true,
      ja: true,
      it: true,
      cn: true,
      tr: true,
    };




    const paisesFiltrados = filtrarPaises(this.countries, lang!, this.searchText.toLowerCase());
    this.filteredCountries = paisesFiltrados;
  }

  getCountryByIso2( codeIso2 : string) {

    const lang: keyof Translations | null = localStorage.getItem('lang') as keyof Translations | null;

    const codigosIdioma: Record<keyof Translations, boolean> = {
      kr: true,
      'pt-BR': true,
      pt: true,
      nl: true,
      hr: true,
      fa: true,
      de: true,
      es: true,
      fr: true,
      ja: true,
      it: true,
      cn: true,
      tr: true,
    };




    const country = this.countries.filter( country => country.iso2 == codeIso2)[0];


    return obtenerNombreTraducido(country, lang!);
  }



  @Output() onselectDestiny = new EventEmitter<CountryRegionLng>();


  countries : CountryRegionLng[] = countrys;

}
