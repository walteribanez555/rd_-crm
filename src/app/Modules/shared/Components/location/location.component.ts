import { Component, EventEmitter, Input, Output } from '@angular/core';
import { obtenerNombreTraducido } from '../../utils/filters/country-filter';
import { CountryRegionLng, Translations } from '../../utils/data/countries-region.ts/country-region-lng';

@Component({
  selector: 'location',
  template: `
  <div class="card" [class.selected]="location.isSelected"  (click)="changeLocation()">
    <i class="fa-solid fa-globe" [class.selected]="location.isSelected"></i>
    <span [class.selected]="location.isSelected" >{{getCountry(location.location)}}</span>
    <span class="icon" (click)="changeLocation()" >x</span>

  </div>`,
  styleUrls: ['./location.component.css'],
})
export class LocationComponent {


  @Input() location! : any;

  @Input() position! : number;

  @Output() selectionChanged = new EventEmitter<number>();



  changeLocation() {
    this.selectionChanged.emit(this.position);
  }


  getCountry( countryLng : CountryRegionLng) {

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



    // if (!(lang! in codigosIdioma)) {
    //   // Maneja el caso en el que el código de idioma no es válido
    //   console.error('Código de idioma no válido');
    //   return; // O maneja el error de alguna otra manera
    // }



    // const country = this.countries.filter( country => country.iso2 == codeIso2)[0];


    return obtenerNombreTraducido(countryLng, lang!);
  }


  // location : string = "Destino";



}
